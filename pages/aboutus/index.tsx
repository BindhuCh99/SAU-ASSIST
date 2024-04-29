"use client";
import Navbar from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../context/contextProvider";

export default function Dashboard() {
    const { user, token } = useStateContext();

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="px-20 bg-white py-5 shadow-lg mt-5">
                    <h2>
                    SAU AssistU is designed as an innovative web platform aimed at
                     enhancing the experience for new students at SAU through AI-powered assistance.
                      This platform seeks to streamline the onboarding process, providing real-time information,
                       transfer credit assistance, and a personalized chatbot for student inquiries. By centralizing essential resources, SAU AssistU will simplify campus life for students, making information more accessible and the transition smoother.
                    </h2>
                    <p></p>
                </div>
            </div>
        </>
    );
}