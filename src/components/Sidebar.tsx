import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-md h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Admin CMS</h1>
      </div>
      <nav className="mt-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-4 text-gray-700 hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-bold" : ""
            }`
          }
        >
          Tổng quan
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `block py-2 px-4 text-gray-700 hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-bold" : ""
            }`
          }
        >
          Đơn hàng
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `block py-2 px-4 text-gray-700 hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-bold" : ""
            }`
          }
        >
          Kho & Sản phẩm
        </NavLink>
        <NavLink
          to="/payment"
          className={({ isActive }) =>
            `block py-2 px-4 text-gray-700 hover:bg-gray-200 ${
              isActive ? "bg-gray-200 font-bold" : ""
            }`
          }
        >
          Đóng tiền
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
