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
                <h2 className="font-bold text-center">SAU assist You with a map to make your life easier</h2>   
                <img src="map.jpg" alt="SAU school map"/>
            </div>
        </>
    );
}