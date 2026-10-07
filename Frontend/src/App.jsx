import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Home from "./components/Home.jsx";
import { RouterProvider } from "react-router-dom";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import Companies from "./components/Admin/Companies.jsx";
import CompanyCreate from "./components/Admin/CompanyCreate.jsx";
import CompanySetup from "./components/Admin/CompanySetup.jsx";
import AdminJobs from "./components/Admin/AdminJobs.jsx"
import PostJob from "./components/Admin/PostJob.jsx";
import Applicants from "./components/Admin/Applicants.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },

  // Admin's paths

  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/companies/create",
    element: <CompanyCreate />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/jobs/create",
    element: <PostJob />,
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />,
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={ appRouter } />
      </div>
    </>
  );
}

export default App;
