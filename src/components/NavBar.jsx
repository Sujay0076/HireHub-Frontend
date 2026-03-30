import { NavLink, useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token")

    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-8 py-4 flex justify-between items-center shadow-lg border-b border-gray-800">

            {/* Logo */}
            <NavLink
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent hover:scale-105 transition duration-300"
            >
                🏢 HireHub
            </NavLink>

            {/* Links */}
            <div className="flex gap-6 items-center text-sm md:text-base">

                {token ? (
                    <>
                        <NavLink
                            to="/jobs"
                            className={({ isActive }) =>
                                `relative hover:text-green-400 transition duration-300 ${isActive ? "text-green-400 font-semibold" : ""
                                }`
                            }
                        >
                            Jobs
                        </NavLink>

                        {role === "JOB_SEEKER" && (
                            <NavLink
                                to="/applications"
                                className={({ isActive }) =>
                                    isActive ? "text-green-400 font-semibold" : "hover:text-green-400"
                                }
                            >
                                My Applications
                            </NavLink>
                        )}

                        {role === "EMPLOYER" && (
                            <NavLink
                                to="/post-job"
                                className={({ isActive }) =>
                                    `hover:text-green-400 transition duration-300 ${isActive ? "text-green-400 font-semibold" : ""
                                    }`
                                }
                            >
                                Post Job
                            </NavLink>
                        )}

                        {role === "EMPLOYER" && (
                            <NavLink
                                to="/employer/applications"
                                className="hover:text-green-400 transition duration-300"
                            >
                                Manage Applications
                            </NavLink>
                        )}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-green-500/50 hover:scale-105 transition duration-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `hover:text-green-400 transition duration-300 ${isActive ? "text-green-400 font-semibold" : ""
                                }`
                            }
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                `hover:text-green-400 transition duration-300 ${isActive ? "text-green-400 font-semibold" : ""
                                }`
                            }
                        >
                            Register
                        </NavLink>
                    </>
                )}

            </div>
        </nav>
    )
}
export default Navbar;