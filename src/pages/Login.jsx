import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://hirehub-cpmr.onrender.com/api/auth/login', {
                email: email,
                password: password
            })

            console.log("Full response:", response)
            console.log("response.data:", response.data)
            console.log("token:", response.data.token)
            console.log("userId:", response.data.userId)

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("role", response.data.role);
            navigate("/jobs");
            // alert("Login Sucessful!..");
        }
        catch (error) {
            console.log(error);
            setError("Invalid credentials!")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">

            {/* Background Glow Effects */}
            <div className="absolute w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-emerald-400 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

            {/* Glass Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-2xl shadow-2xl w-[90%] max-w-md text-white">

                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    🏢 HireHub Login
                </h2>

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
                    className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 mb-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />

                {/* Button */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-3 rounded-lg font-semibold shadow-lg hover:shadow-green-500/40 hover:scale-105 transition duration-300"
                >
                    Login
                </button>

                {/* Register */}
                <p className="text-center mt-6 text-gray-300">
                    Don't have account?
                    <button
                        onClick={() => navigate("/register")}
                        className="text-green-400 font-semibold ml-1 hover:underline"
                    >
                        Register
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
export default Login;