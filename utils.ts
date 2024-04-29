import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAI } from 'langchain/llms/openai'
import { loadQAStuffChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { indexName, timeOut } from './config'

//create pinecone index
export const createPineConeIndex = async (
    client: any,
    indexName: any,
    vectorDimension: any
) => {

    console.log(`Index name ${indexName}`);
    const existingindex = await client.listindexes();
    if (!existingindex.includes(indexName)) {
        console.log(`Ceating ${indexName}`);
        await client.createIndex({
            createRequest: {
                name: indexName,
                dimension: vectorDimension,
                metric: 'cosine'
            },
        });
        console.log('Creating Index.............Please wait for initialization');
        await new Promise((resolve) => setTimeout(resolve, timeOut));
    } else {
        console.log(`${indexName} Already exists`);
    }
}
//Upload data
export const updatePinecone = async (client: any, indexName: any, docs: any) => {
    const index = client.Index(indexName);
    console.log(`Pinecone index retrieved ${indexName}`);
    for (const doc of docs) {
        console.log(`Processig document ${doc.metadata.source}`);
        const txtPath = doc.metadata.source;
        const text = doc.pageContent;

        const textSplitter = new RecursiveCharacterTextSplitter(
            {
                chunkSize: 1000,
            }
        );
        console.log('splitting text into chunks.....');
        const chunks = await textSplitter.createDocuments([text]);
        console.log(`Text split into ${chunks.length} chunks`);
        console.log(`Calling OpenAI's Embedding endpoint documents with ${chunks.length} text chunks`);
        //create open ai embedings
        const model = new OpenAIEmbeddings();
        const embeddingsArray = await model.embedDocuments(
            chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
        )
        //
        const batchSize = 100;
        let batch: any = [];
        for (let idx = 0; idx < chunks.length; idx++) {
            const chunk = chunks[idx];
            const vector = {
                id: `${txtPath}_${idx}}`,
                values: embeddingsArray[idx],
                metadata: {
                    ...chunk.metadata,
                    loc: JSON.stringify(chunk.metadata.loc),
                    pageContent: chunk.pageContent,
                    txtPath: txtPath,
                },
            };
            batch = [...batch, vector]
            if (batch.length === batchSize || idx === chunks.length - 1) {
                await index.upsert(
                    {
                        upsertRequest: {
                            vectors: batch,
                        },
                    }
                );
                batch = [];
            }
        }
    }

}

//Query data
export const queryPineConeVectorStoreAndQueryLLM = async (client:any,
    indexName:any,
    question:any
)=>{
   console.log ("Querying the vectore store");
   const index = client.Index(indexName);
   const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);
   let queryResponse = await index.query(
    {
        queryRequest:{
            topK:10,
            vector:queryEmbedding,
            includeMetadata:true,
            includevalues:true,
        }
    });
    console.log(`Found ${queryResponse.matches.length} matches...`);
    console.log(`Asking question ${question}..........`);
    if(queryResponse.matches.length)
        {
            const llm = new OpenAI({});
            const chain = loadQAStuffChain(llm);
            const concatenatedPageContent = queryResponse.matches
            .map((match:any)=>match.metadata.pageContent)
            .join(" ");

            const result = await chain.call({
                input_documents:[new Document({pageContent:concatenatedPageContent})],
                question:question,
            });
            console.log(`Answer: ${result.text}`);
            return result.text
        }else{
            console.log('Since they are no matches.\, GPT-3 will not be queried');
        }
}