import React from 'react'


const CustomSelected = ({onChange,value,option1,option2,option3,label1,label2,label3}) => {
  return (
    <div>
        <select className= 'bg-white border text-black  text-center py-3 outline-none  px-10 ' value={value || ""}
        onChange={onChange}>
        <option  value={option1}>{label1}</option>
        <option value={option2}>{label2}</option>
        <option value={option3}>{label3}</option>
        <option value="other">other</option>
      </select>
    </div>
  )
}

export default CustomSelected