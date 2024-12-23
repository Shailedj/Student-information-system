import React from "react";
import axios from 'axios';
import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import Welcomescreen from "./screens/welcomescreen";
import AdminLogin from "./screens/adminlogin";
import AdminDashboard from "./screens/admindashboard";
import StudentLogin from "./screens/studentlogin";
import StudentRegisterForm from "./screens/studentregister";
import StudentDashboard from "./screens/studentdashboard";
import AdminRegistration from "./screens/adminregister";
import Studentdetails from "./components/studentdetails";
import MyDetails from "./components/mydetails";
import AdminMark from "./components/adminmark";
import StudentMark from "./components/studentmark";
import StudentLeaveForm from "./components/studentLeave";
import AdminLeaveForm from "./components/adminLeave";
import AdminTicket from "./components/adminticket";
import StudentTicket from "./components/studentticket";

axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" exact element={<Welcomescreen />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminregister" element={<AdminRegistration />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/studentlogin" element={<StudentLogin />} />
            <Route path="/studentregister" element={<StudentRegisterForm/>} />
            <Route path="/studentdashboard" element={<StudentDashboard />} />
            <Route path="/studentdetails" element={<Studentdetails />} />
            <Route path="/mydetails" element={<MyDetails />} />
            <Route path="/adminmark" element={<AdminMark />} />
            <Route path="/studentmark" element={<StudentMark />} />
            <Route path="/studentLeave" element={<StudentLeaveForm />} />
            <Route path="/adminLeave" element={<AdminLeaveForm />} />
            <Route path="/adminticket" element={<AdminTicket />} />
            <Route path="/studentticket" element={<StudentTicket />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
