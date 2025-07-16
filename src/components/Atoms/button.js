import React from "react"

const Button = ({ title, colorClass, textColor, onClick, marginClass }) => {
  return (
    <button
      onClick={onClick}
      className={`relative after:rounded after:bg-darkorange after:text-white after:absolute after:h-full after:w-0 after:bottom-0 after:left-0 hover:after:w-full transition after:duration-300 after:opacity-70 px-3 py-2 rounded-md text-sm after:content-[attr(title)] font-medium font-montserrat`}
    >
      {title}
    </button>
  )
}

export default Button
