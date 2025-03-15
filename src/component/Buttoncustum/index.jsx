import React from 'react'

const Buttoncustom = ({ label, onClick }) => {
  return (
    <div>
         <button
      className="bg-[#191337] rounded-lg flex justify-center items-center text-white font-semibold text-md h-8 min-w-16 mt-4 px-5 py-6
      hover:bg-gray-800
      "
      onClick={onClick}
    >
      {label}
    </button>
    </div>
  )
}

export default Buttoncustom