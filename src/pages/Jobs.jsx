import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterLocation, setFilterLocation] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchingJobs = async () => {
            try {
                let response = await axios.get("https://hirehub-cpmr.onrender.com/api/jobs", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setJobs(response.data);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setError("Error Fetching!..");
                setLoading(false);
            }
        }
        fetchingJobs();
    }, []);

    //adding filter function //

    const filteredJobs = jobs.filter(
        job => {
            return (
                job.title.toLowerCase().includes(search.toLowerCase()) &&
                (filterType == "" || job.jobType == filterType) &&
                (filterLocation == "" || job.location.toLowerCase().includes(filterLocation.toLowerCase()))
            )
        }
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 md:p-10 text-white">

            {/* Heading */}
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                🚀 Available Jobs
            </h1>

            {/* Filter Section (Glass) */}
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-4 rounded-xl mb-8 flex flex-col md:flex-row gap-4">

                <input
                    type="text"
                    value={search}
                    placeholder="Search by title..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-black/30 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-black/30 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <option value="">All Job Types</option>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="INTERNSHIP">Internship</option>
                </select>

                <input
                    type="text"
                    value={filterLocation}
                    placeholder="Location..."
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="flex-1 bg-black/30 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>

            {/* Loading / Error */}
            {loading && <p className="text-green-400 text-center">Loading...</p>}
            {error && <p className="text-red-400 text-center">{error}</p>}

            {/* Job Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(job => (
                    <div
                        key={job.id}
                        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-green-500/20 hover:scale-[1.02] transition duration-300"
                    >
                        <h2 className="text-xl font-bold text-green-400 mb-2">
                            {job.title}
                        </h2>

                        <p className="text-gray-300">{job.location}</p>
                        <p className="text-gray-400">{job.jobType}</p>
                        <p className="text-gray-400 mb-4">
                            Salary: ₹{job.salary}
                        </p>

                        <button
                            onClick={() => navigate(`/apply/${job.id}`)}
                            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-green-500/40 transition duration-300"
                        >
                            Apply Now
                        </button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Jobs;