import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JobPost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [experienceRequired, setExperienceRequired] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const employerId = Number(localStorage.getItem("userId"));

    // title, description, location, salary, jobType, experienceRequired


    const handleJobPost = async () => {
        try {
            let response = await axios.post("https://hirehub-cpmr.onrender.com/api/jobs",
                {
                    title: title,
                    description: description,
                    location: location,
                    salary: Number(salary),
                    jobType: jobType,
                    experienceRequired: Number(experienceRequired),
                    employer: { id: employerId }
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            navigate("/jobs");

        }
        catch (error) {
            console.log(error);
            setError("Job Posting Failed");
        }
    }


    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden p-6">

            {/* Background Glow */}
            <div className="absolute w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-emerald-400 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

            {/* Form Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-3xl text-white">

                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    🏢 Post a Job
                </h2>

                {/* Grid Layout */}
                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        placeholder="Job Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-black/30 border border-gray-600 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-black/30 border border-gray-600 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <input
                        type="number"
                        placeholder="Salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="bg-black/30 border border-gray-600 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <input
                        type="number"
                        placeholder="Experience (Years)"
                        value={experienceRequired}
                        onChange={(e) => setExperienceRequired(e.target.value)}
                        className="bg-black/30 border border-gray-600 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 md:col-span-2"
                    >
                        <option value="">Select Job Type</option>
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="INTERNSHIP">Internship</option>
                    </select>

                    <textarea
                        placeholder="Job Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="bg-black/30 border border-gray-600 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 md:col-span-2"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={handleJobPost}
                    className="w-full mt-6 bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-green-500/40 transition duration-300"
                >
                    🚀 Post Job
                </button>

                {/* Error */}
                {error && (
                    <p className="text-red-400 text-center mt-4">{error}</p>
                )}
            </div>
        </div>

    );
}

export default JobPost