import { NavLink, useNavigate } from "react-router-dom";
import { IoStatsChart } from "react-icons/io5";
import logoWhite from "../assets/logo-white.png";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { IoMdImages } from "react-icons/io";
import path from "../utils/path";
import useAuthStore from "../store/authStore";

const Header: React.FC = () => {
  const { clearToken } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    clearToken();
    navigate(path.LOGIN);
  };

  return (
    <header className="bg-primary shadow flex items-center gap-8 px-[24px]">
      <img className="w-1/6" src={logoWhite} alt="Logo" />
      <div className="h-full w-[2px] bg-white text-transparent">1</div>
      <div className="flex flex-col justify-between">
        <span className="text-xl text-white font-semibold">
          never.storevn@gmail.com
        </span>
        <div className="flex items-end gap-1">
          <span className="text-white">Quản trị viên</span>
          <small
            onClick={handleLogout}
            className="underline text-white cursor-pointer"
          >
            Đăng xuất
          </small>
        </div>
      </div>
      <div className="h-full w-[2px] bg-white text-transparent">1</div>
      <div className="flex h-full items-center justify-between">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center w-fit h-full justify-center gap-2 cursor-pointer px-[16px] ${
              isActive
                ? "bg-white text-primary"
                : "text-white hover:bg-gray-200 hover:text-white"
            } transition-colors`
          }
        >
          <IoStatsChart className="text-2xl" />
          <span className="text-base font-medium">Tổng quan</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center w-fit h-full justify-center gap-2 cursor-pointer px-[16px] ${
              isActive
                ? "bg-white text-primary"
                : "text-white hover:bg-gray-200 hover:text-white"
            } transition-colors`
          }
        >
          <FaShoppingCart className="text-2xl" />
          <span className="text-base font-medium">Đơn hàng</span>
        </NavLink>
        <NavLink
          to={path.WAREHOUSE_PRODUCT}
          className={({ isActive }) =>
            `flex items-center w-fit h-full justify-center gap-2 cursor-pointer px-[16px] ${
              isActive
                ? "bg-white text-primary"
                : "text-white hover:bg-gray-200 hover:text-white"
            } transition-colors`
          }
        >
          <AiFillProduct className="text-2xl" />
          <span className="text-base font-medium">Kho & Sản phẩm</span>
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center w-fit h-full justify-center gap-2 cursor-pointer px-[16px] ${
              isActive
                ? "bg-white text-primary"
                : "text-white hover:bg-gray-200 hover:text-white"
            } transition-colors`
          }
        >
          <FaUserAlt className="text-2xl" />
          <span className="text-base font-medium">Người dùng</span>
        </NavLink>
        <NavLink
          to="/ads"
          className={({ isActive }) =>
            `flex items-center w-fit h-full justify-center gap-2 cursor-pointer px-[16px] ${
              isActive
                ? "bg-white text-primary"
                : "text-white hover:bg-gray-200 hover:text-white"
            } transition-colors`
          }
        >
          <IoMdImages className="text-2xl" />
          <span className="text-base font-medium">Quảng cáo</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
