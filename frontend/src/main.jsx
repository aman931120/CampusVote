import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Student from "./components/Student/Student.jsx";
import Admin from "./components/Admin/Admin.jsx";
import AddCandidate from "./components/Candidate/AddCandidate.jsx";
import StudentElection from "./components/Election/StudentElection.jsx";
import ResultPage from "./components/Result/ResultPage.jsx";
import ManageCandidates from "./components/Candidate/ManageCandidates.jsx";
import Manifesto from "./components/Manifesto/Manifesto.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/student" element={<Student />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/manifesto" element={<Manifesto />} />
      <Route path="/admin/addCandidate" element={<AddCandidate />} />
      <Route path="/admin/manageCandidates" element={<ManageCandidates />} />
      <Route path="/student/StudentElection" element={<StudentElection />} />
      <Route path="/admin/result" element={<ResultPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
