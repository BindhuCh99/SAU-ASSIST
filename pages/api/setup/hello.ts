import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import {TextLoader} from 'langchain/document_loaders/fs/text';
import {PDFLoader} from 'langchain/document_loaders/fs/pdf';
import {DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import {createPineConeIndex,updatePinecone} from '../../../utils';
import {indexName} from '../../../config';
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
    data: string
  }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) 
  {
    const loader = new DirectoryLoader('D://Assistu/FrontEnd/Frontend/pages/documents',{
          ".txt":(path) => new TextLoader(path),
          ".md":(path) =>new TextLoader(path),
          ".pdf":(path) => new PDFLoader(path)
      })
      const docs = await loader.load()
      const vectorDimensions = 1536
      const pc = new Pinecone({ apiKey: 'd4484e20-8a0c-4e2b-971b-ebcc054df577' });
      try{
          await createPineConeIndex(pc,indexName,vectorDimensions)
          await updatePinecone(pc,indexName,docs)
      }catch(error)
      {
          console.log(`Error ${error}`)
      }
      return NextResponse.json({
        data:"Successfully created nd indexed data into pinecone"
    })
    res.status(200).json({ data:"Successfully created nd indexed data into pinecone" })
  }
  

