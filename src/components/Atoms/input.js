import React from "react"

const Input = ({ placeholder, onChange }) => {
  return (
    <div className="inputSection">
    <label></label>
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="min-w-64 px-2 py-2 rounded-lg bg-white bg-opacity-20 flex-1 ring-darkorange appearance-none  focus:outline-none focus:ring-2 focus:ring-darkorange focus:border-transparent sm:width-full md:width-full xxs:text-sm"
      ></input>
    </div>
  )
}

export default Input
