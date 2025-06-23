import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Overview from "./page/Overview";
import path from "./utils/path";
import WarehouseProduct from "./page/WarehouseProduct";
import Login from "./page/Login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function AppContent() {
  const location = useLocation();

  const noHeaderRoutes = [path.LOGIN]; // các route không cần Header

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      <div className="flex-1 flex flex-col overflow-hidden">
        {!noHeaderRoutes.includes(location.pathname) && <Header />}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            {/* Route công khai (chỉ dành cho người chưa đăng nhập) */}
            <Route element={<PublicRoute />}>
              <Route path={path.LOGIN} element={<Login />} />
            </Route>
            {/* Route được bảo vệ (chỉ dành cho người đã đăng nhập) */}
            <Route element={<ProtectedRoute />}>
              <Route path={path.HOME} element={<Overview />} />
              <Route path={path.DASHBOARD} element={<Overview />} />
              <Route
                path={path.WAREHOUSE_PRODUCT}
                element={<WarehouseProduct />}
              />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
