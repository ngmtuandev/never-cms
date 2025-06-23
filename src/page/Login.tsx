import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import logo from "../assets/logo-black.png";
import CustomButton from "../components/CustomButton";
import { convertResponse } from "../utils/helper";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import path from "../utils/path";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "123123",
  });

  const { setToken }: any = useAuthStore();

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);
      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      const data = convertResponse(response.data);
      setToken(data?.access_token);
      navigate(path.DASHBOARD);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="w-full flex justify-center items-center my-8">
          <img className="w-1/2" src={logo}></img>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nhập email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <CustomButton
              text="Đăng nhập"
              // disabled={loading}
            ></CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
