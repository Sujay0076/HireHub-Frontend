import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Apply() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    // const[company,setCompany] =useState("");
    const [location, setLoaction] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("PENDING");
    const [success, setSuccess] = useState("");
    const [applied, setApplied] = useState(false);
    const { jobId } = useParams();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");


    useEffect(() => {
        const fetchJobById = async () => {
            try {
                let response = await axios.get(`https://hirehub-cpmr.onrender.com/api/jobs/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTitle(response.data.title);
                // setCompany(response.data.company);
                setLoaction(response.data.location);
                setSalary(response.data.salary);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
                setError("Fetching Job By JobId was failed" + error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchJobById();
    }, []);


    const handleApply = async () => {
        try {
            let response = await axios.post(`https://hirehub-cpmr.onrender.com/api/applications`, {
                status: status,
                job: { id: jobId },
                jobSeeker: { id: userId }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccess("Applied successfully! 🎉");
            setApplied(true);

        }
        catch (error) {
            setError("Already applied or job was expired" + error);
        }
    }

    //
    // fetch job by jobId
    // GET /api/jobs/{jobId}
    // show title, company, location, salary
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden p-6">

            {/* Glow */}
            <div className="absolute w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-emerald-400 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

            {/* Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">

                <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    📄 Job Application
                </h1>

                {loading && <p className="text-green-400 text-center">Loading...</p>}
                {error && <p className="text-red-400 text-center">{error}</p>}

                {!loading && (
                    <>
                        <h2 className="text-xl font-semibold text-green-400 mb-3">
                            {title}
                        </h2>

                        <p className="text-gray-300 mb-2">
                            📍 {location}
                        </p>

                        <p className="text-gray-300 mb-6">
                            💰 ₹{salary}
                        </p>

                        {role === "JOB_SEEKER" && (
                            <button
                                onClick={handleApply}
                                disabled={applied}
                                className={`w-full py-3 rounded-lg font-semibold transition duration-300
                                    ${applied
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:scale-105 hover:shadow-green-500/40"
                                    }`}
                            >
                                {applied ? "Applied ✅" : "Apply Now 🚀"}
                            </button>
                        )}

                        {success && (
                            <p className="text-green-400 text-center mt-4">
                                {success}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Apply;