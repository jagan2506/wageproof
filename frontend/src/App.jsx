import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import WorkerDashboard from "./pages/WorkerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import MyLogs from "./pages/MyLogs";
import EmployerLogs from "./pages/EmployerLogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/worker"
        element={<WorkerDashboard />}
      />

      <Route
        path="/employer"
        element={<EmployerDashboard />}
      />

      <Route
        path="/mylogs"
        element={<MyLogs />}
      />

      <Route
        path="/employerlogs"
        element={<EmployerLogs />}
      />
    </Routes>
  );
}

export default App;