"use client"
import { useState } from "react"
import { BubbleChat } from 'flowise-embed-react'
import Sidebar from "../components/Sidebar"

export default function Dashboard() {
    const [query, setQuery] = useState('')
    const [result, setResult] = useState('');
    const [loading, setloading] = useState(false);
    async function createIndexandEmbeddings() {
        try {
            const result = await fetch('api/setup/hello', {
                method: "POST"
            })
            const json = await result.json()
            console.log("Result", json)
        } catch (err) {
            console.log('err', err)
        }
    }
    async function sendQuery() {
        if (!query) return
        setResult('')
        setloading(true);
        try {
            const result = await fetch('api/read/hello', {
                method: 'POST',
                body: JSON.stringify(query)
            })
            const json = await result.json();
            setloading(false);
        } catch (err) {
            console.log('error2', err)
            setloading(false);
        }
    }

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64 px-10">
                <h2 className="text-center mb-5">GET INSTANT HELP FROM OUR AI</h2>
                <div className="grid grid-cols-2 md:grid-cols-1">
                    <div>
                        <img src="image1.png" alt="" />
                    </div>
                </div>
                <div>
                    <BubbleChat chatflowid="a7fa0c5f-9d6d-4cda-930e-65de395fb74d" apiHost="http://localhost:3000" />
                </div>
            </div>


        </>
    )
}
