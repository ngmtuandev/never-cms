import React from "react";

interface CustomButtonProps {
  onClick?: (e: any) => void;
  className?: string;
  text?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  className = "",
  text = "+ Thao tác", // Mặc định là "+ Thao tác" nếu không truyền text
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        bg-[#fc0054]
        text-white
        text-lg
        px-6
        py-2
        rounded-full
        outline-none
        shadow-lg
        border-b-4
        border-[#c40545]
        hover:bg-[#c40545]
        hover:shadow-xl
        transition-all
        duration-200
        flex items-center justify-center
      `}
    >
      <span>{text}</span>
    </button>
  );
};

export default CustomButton;
