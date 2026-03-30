import { useState, useEffect } from "react";
import axios from "axios";

function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function fetchApplications() {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");
                let response = await axios.get(`https://hirehub-cpmr.onrender.com/api/applications/seeker/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setApplications(response.data);
                setLoading(false);
            }
            catch (error) {
                setError("Failed to fetch applications.");
                setLoading(false);
                console.log(error);
            }
        }
        fetchApplications();
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 md:p-10">

            {/* Heading */}
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                📄 My Applications
            </h1>

            {/* Loading / Error */}
            {loading && <p className="text-green-400 text-center">Loading...</p>}
            {error && <p className="text-red-400 text-center">{error}</p>}

            {/* Empty State */}
            {!loading && applications.length === 0 && (
                <p className="text-center text-gray-400">
                    No applications yet 🚀
                </p>
            )}

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
                                {app.job.title}
                            </h3>
                            <p className="text-gray-300">
                                📍 {app.job.location}
                            </p>
                        </div>

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
                ))}
            </div>
        </div>
    )

}
export default Applications;