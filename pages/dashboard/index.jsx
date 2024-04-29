"use client";
import Navbar from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { BubbleChat } from 'flowise-embed-react'
import { useStateContext } from "../context/contextProvider";

export default function Dashboard() {
    const { user, token } = useStateContext();

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <h2>Welcome to SAU, An AI powered Source of Information for SAU</h2>
                <h3 className="mt-10 font-bold text-center mb-3">what we offer</h3>
                <div className="card-grid">
                    <div className="card">
                        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow nodark:bg-gray-800 nodark:border-gray-700">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 nodark:text-white">Easy to use Navigation Maps</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 nodark:text-gray-400">SAU offers easy to use Maps that help you navigate the school with ease. The map can also be found on the school website</p>
                            <a href="/map" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 nodark:bg-blue-600 nodark:hover:bg-blue-700 nodark:focus:ring-blue-800">
                                Read more
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="card">
                        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow nodark:bg-gray-800 nodark:border-gray-700">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 nodark:text-white">Well Trained AI that you could chat with</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 nodark:text-gray-400">SAU offers you a well trained AI aasitance. You could use this to get more information about the school and other areas</p>
                            <a href="/chatui" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 nodark:bg-blue-600 nodark:hover:bg-blue-700 nodark:focus:ring-blue-800">
                                Get AI assitance
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="card">
                        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow nodark:bg-gray-800 nodark:border-gray-700">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 nodark:text-white">Resources</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 nodark:text-gray-400">Easily access Resources from the school right here within your application. You could click on here to see the resources. All resources listed on the site are from verified sources</p>
                            <a href="https://web.saumag.edu/students/" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 nodark:bg-blue-600 nodark:hover:bg-blue-700 nodark:focus:ring-blue-800">
                                Go to main website
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                 <BubbleChat chatflowid="a7fa0c5f-9d6d-4cda-930e-65de395fb74d" apiHost="http://localhost:3000" />
                </div>
            </div>
        </>
    );
}
