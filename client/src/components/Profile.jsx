import { useState, useEffect } from "react";
import Picture1 from '../assets/img/Picture1.png';


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
        <div style={{
            backgroundImage: `url(${Picture1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <h1>Profile</h1>
            {data && (
                <div className="text-center p-4">
        </div>
        )}
        </div>
    );
}