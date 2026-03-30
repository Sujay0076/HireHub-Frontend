import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            let response = await axios.post("https://hirehub-cpmr.onrender.com/api/users/register",
                {
                    name: name,
                    email: email,
                    password: password,
                    role: role
                }
            )
            // alert("Registration Successful!..");
            navigate("/login");

        }
        catch (err) {
            console.log(err);
            setError("Registration failed! Try again!");
        }

    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-emerald-400 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

            {/* Glass Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-2xl shadow-2xl w-[90%] max-w-md text-white">

                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    🏢 HireHub Register
                </h2>

                {/* Name */}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />

                {/* Role Dropdown */}
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 mb-6 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                >
                    <option value="">Select Role</option>
                    <option value="JOB_SEEKER">Job Seeker</option>
                    <option value="EMPLOYER">Employer</option>
                </select>

                {/* Button */}
                <button
                    onClick={handleRegister}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-lg font-semibold shadow-lg hover:shadow-green-500/40 hover:scale-105 transition duration-300"
                >
                    Register
                </button>

                {/* Login Redirect */}
                <p className="text-center mt-6 text-gray-300">
                    Already have an account?
                    <button
                        onClick={() => navigate("/login")}
                        className="text-green-400 font-semibold ml-1 hover:underline"
                    >
                        Login
                    </button>
                </p>

                {/* Error */}
                {error && (
                    <p className="text-red-400 text-center mt-4">{error}</p>
                )}
            </div>
        </div>
    );
}
export default Register;