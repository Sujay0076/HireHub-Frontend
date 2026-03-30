import { Route,Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Jobs from "./pages/Jobs";
import Register from "./pages/Register";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import JobPost from "./pages/JobPost"; 
import ProtectedRoute from "./components/ProtectedRoute";
import EmployerApplications from "./pages/EmployerApplications";

function App(){
  const location = useLocation();
  return(
     <>
     
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<ProtectedRoute><Jobs/></ProtectedRoute>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/apply/:jobId" element={<ProtectedRoute><Apply/></ProtectedRoute>}/>
        <Route path="/applications" element={<ProtectedRoute><Applications/></ProtectedRoute>}/>
        <Route path="/post-job" element={<ProtectedRoute><JobPost/></ProtectedRoute>}/>
        <Route path="/employer/applications" element={<ProtectedRoute><EmployerApplications/></ProtectedRoute>}/>
      </Routes>
     </>
      
  );

}
export default App;