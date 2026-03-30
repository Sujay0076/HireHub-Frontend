import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()
    return (
       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">

            {/* Background Glow */}
            <div className="absolute w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-emerald-400 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 md:px-10 py-5 relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    🏢 HireHub
                </h1>

                <div className="flex gap-3 md:gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="border border-green-400 text-green-400 px-5 py-2 rounded-full font-semibold hover:bg-green-400 hover:text-black transition"
                    >
                        Register
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 relative z-10">

                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Find Your{" "}
                    <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        Dream Job
                    </span>
                </h2>

                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl">
                    Connect with top startups and companies. Your next opportunity is just one click away.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-8 py-3 rounded-full text-lg font-bold hover:scale-105 hover:shadow-green-500/40 transition duration-300"
                    >
                        Get Started 🚀
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="border border-gray-500 text-gray-300 px-8 py-3 rounded-full text-lg font-bold hover:bg-white hover:text-black transition"
                    >
                        Login
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 py-10 relative z-10">

                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-bold mb-2 text-green-400">Search Jobs</h3>
                    <p className="text-gray-300">Find jobs by location, title and type</p>
                </div>

                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-lg font-bold mb-2 text-green-400">Easy Apply</h3>
                    <p className="text-gray-300">Apply to jobs with a single click</p>
                </div>

                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-lg font-bold mb-2 text-green-400">Track Applications</h3>
                    <p className="text-gray-300">Monitor your application status</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-400 py-8 relative z-10">
                <p>© 2026 HireHub — Built by Yatham Sujay</p>
            </footer>
        </div>
    )
}
export default Home;