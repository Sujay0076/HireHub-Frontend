import axios from "axios";
import { useEffect, useState } from "react";

function EmployerApplications(){
    const[applications,setApplication] = useState([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState("");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect( () => {
        const fetchAppliactions = async()=> {
            try{
                let response = await axios.get(`https://hirehub-cpmr.onrender.com/api/jobs/employer/${userId}`,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                const allApplications = [];
                console.log("userId:"+userId);
                console.log("Employer Jobs:"+response.data);
                for(let job of response.data){
                    const appRes = await axios.get(`https://hirehub-cpmr.onrender.com/api/applications/job/${job.id}`,{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    console.log("Applications for job:", appRes.data);
                    allApplications.push(...appRes.data);
                }
                console.log("All Applications:", allApplications);
                setApplication(allApplications);
                setLoading(false);
            }
            catch(error){
                console.log(error);
                setError(error);
            }
        }
        fetchAppliactions();
    },[]);

    const updateStatus = async(appId,status) => {
        try{
            let response = await axios.put(`https://hirehub-cpmr.onrender.com/api/applications/${appId}/status?status=${status}`,{},{ headers:{Authorization:`Bearer ${token}`}});
            setApplication(applications.map(app => (app.id === appId ? {...app,status:status}:app)));
            console.log(response.data);
        }
        catch(error){
            setError("updating application failed"+error);
        }
    }
    return(
       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 md:p-10">

            {/* Heading */}
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                📋 Manage Applications
            </h1>

            {/* Loading / Error */}
            {loading && <p className="text-green-400">Loading...</p>}
            {error && <p className="text-red-400">{error}</p>}

            {/* Cards */}
            <div className="grid gap-6">
                {applications.map(app => (
                    <div
                        key={app.id}
                        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow-lg hover:shadow-green-500/20 hover:scale-[1.01] transition duration-300"
                    >

                        {/* Left */}
                        <div>
                            <h3 className="text-xl font-bold text-green-400">
                                {app.job?.title}
                            </h3>
                            <p className="text-gray-300">
                                👤 {app.jobSeeker?.name}
                            </p>
                        </div>

                        {/* Right */}
                        <div className="flex flex-wrap items-center gap-3">

                            <button
                                onClick={() => updateStatus(app.id, "ACCEPTED")}
                                className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-green-400/40 transition"
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => updateStatus(app.id, "REJECTED")}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-red-400/40 transition"
                            >
                                Reject
                            </button>

                            {/* Status Badge */}
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold
                                ${app.status === 'ACCEPTED'
                                    ? 'bg-green-500/20 text-green-400'
                                    : app.status === 'REJECTED'
                                        ? 'bg-red-500/20 text-red-400'
                                        : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {app.status}
                            </span>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EmployerApplications;