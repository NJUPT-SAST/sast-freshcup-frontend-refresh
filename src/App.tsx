import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.sass";
import Login from "./pages/Login/Login";
import Student from "./pages/Student/Student";
import Admin from "./pages/Admin/Admin";
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import IssuesList from "./pages/Admin/CompetitionList/IssuesList/IssuesList";
import AdminCompetitionList from "./pages/Admin/CompetitionList/CompetitionList";
import Correcting from "./pages/Admin/Correcting/Correcting";
import SuperAdminCompetitionList from "./pages/SuperAdmin/CompetitionList/CompetitionList";
import SuperAdminCompetitionManage from "./pages/SuperAdmin/CompetitionManage/CompetitionManage";
import SuperAdminCompetitionSetting from "./pages/SuperAdmin/CompetitionManage/CompetitionSetting/CompetitionSetting";
import SuperAdminQuestionSetting from "./pages/SuperAdmin/CompetitionManage/QuestionSetting/QuestionSetting";
import SuperAdminStudentAccount from "./pages/SuperAdmin/CompetitionManage/StudentAccount/StudentAccount";
import SuperAdminAuthorizeAdmin from "./pages/SuperAdmin/CompetitionManage/AuthorizeAdmin/AuthorizeAdmin";
import CompetitionList from "./pages/Student/CompetitionList/CompetitionList";
import Task from "./pages/Student/Task";
import Error from "./pages/Error/Error";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Login />}></Route>
      {localStorage.getItem("role") === "" ? (
        <Route path="/student" element={<Student />}>
          <Route index element={<CompetitionList />}></Route>
          <Route path="/student/Task" element={<Task />}></Route>
        </Route>
      ) : null}
      {localStorage.getItem("role") === "1" ? (
        <Route path="/admin" element={<Admin />}>
          <Route path="correct" element={<Admin />}>
            <Route index element={<Correcting />}></Route>
            <Route path=":id" element={<Correcting />}></Route>
          </Route>
          <Route index element={<AdminCompetitionList />}></Route>
          <Route path=":id" element={<IssuesList />}></Route>
        </Route>
      ) : null}
      {localStorage.getItem("role") === "2" ? (
        <Route path="/superadmin" element={<SuperAdmin />}>
          <Route index element={<SuperAdminCompetitionList />}></Route>
          <Route path=":id" element={<SuperAdminCompetitionManage />}>
            <Route index element={<SuperAdminCompetitionSetting />}></Route>
            <Route
              path="question"
              element={<SuperAdminQuestionSetting />}
            ></Route>
            <Route
              path="account"
              element={<SuperAdminStudentAccount />}
            ></Route>
            <Route
              path="authorize"
              element={<SuperAdminAuthorizeAdmin />}
            ></Route>
          </Route>
        </Route>
      ) : null}
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}

export default App;
