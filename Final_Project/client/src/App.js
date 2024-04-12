import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './Components/Create.jsx';
import Login from './Components/UserLogin.jsx';
import AddProject from "./Components/AddProject.jsx";
import ResourceAllocation from "./Components/ResourceAllocation.jsx";
import AdminDashboard from "./Components/AdminPage.jsx";
import UserDashboard from "./Components/UserPage.jsx";
import GeneralFeedbackForm from "./Components/GeneralFeedback.jsx";
import InternFeedbackForm from "./Components/InternFeedback.jsx";
import ConsultantFeedbackForm from "./Components/ConsultantFeedback.jsx";
import TribeMasterFeedback from "./Components/TribeMasterFeedback.jsx";
import Feedback from "./Components/Feedback.jsx";
import Timesheet from "./Components/NewTimeSheet.jsx";
import FeedbackHistory from "./Components/FeedbackHistory.jsx";
import ProjectHistory from "./Components/ProjectHistory.jsx";
function App() {
  return (
    <>
  <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/addproject' element={<AddProject />} />
          <Route path='/resourceallocation' element={<ResourceAllocation />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/userdashboard' element={<UserDashboard />} />
          <Route path='/generalfeedbackform' element={<GeneralFeedbackForm />} />
          <Route path='/internfeedbackform' element={<InternFeedbackForm />} />
          <Route path='/consultantfeedbackform' element={<ConsultantFeedbackForm />} />
          <Route path='/tribemasterfeedbackform' element={<TribeMasterFeedback />} />
          <Route path='/feedbackform' element={<Feedback />} />
          <Route path='/timesheet' element={<Timesheet/>}/>
          <Route path='/feedbackhistory' element={<FeedbackHistory/>}/>
          <Route path='/projecthistory' element={<ProjectHistory/>}/>
        </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
