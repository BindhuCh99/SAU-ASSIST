import { NextRequest,NextResponse } from "next/server";
import { Pinecone } from '@pinecone-database/pinecone';
import {queryPineConeVectorStoreAndQueryLLM} from '../../../utils'
import {indexName} from '../../../config';

export default async function POST(req:NextRequest)
{
    const body = await req.body;
    const pc = new Pinecone({ apiKey: 'd4484e20-8a0c-4e2b-971b-ebcc054df577' });
    const text = await queryPineConeVectorStoreAndQueryLLM(pc,indexName,body);
    return NextResponse.json(
        {
            data:text
        }
    )
}