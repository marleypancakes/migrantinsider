import React from "react"

const Button = ({ title, colorClass, textColor, onClick, marginClass }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-darkorange text-bg FFF7ED relative px-3 py-2 mr-6 rounded-md text-sm font-medium font-montserrat`}
    >
      {title}
    </button>
  )
}

export default Button
