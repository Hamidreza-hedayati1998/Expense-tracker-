import React from "react";

const CustomInput = ({ label, value, onChange, type,placeholder }) => {
  return (
    <div className="flex flex-col my-3">
      <label className="text-white text-lg">{label}</label>
      <input
        value={value || ""}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="bg-transparent  w-[200px] h-8 outline-none border  border-[#fff] py-3 px-4 "
      />
    </div>
  );
};

export default CustomInput;
