import { useState, useEffect } from "react";
import Favorites from "./Favorites";

export default function Profile() {
    const [data, setData] = useState(null);

    const getProfile = async () => {
        const token = localStorage.getItem("token");
        try{
            const response = await fetch ("/api/profile", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,

                }
            });
            if(response.ok) {
                const json = await response.json();
                setData(json);
                console.log(json);
            } else {
                throw new Error("Failed to fetch profile");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            setData(null);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <Favorites/>
            {data && (
                <div className="text-center p-4">
        </div>
        )}
        </div>
    );
}