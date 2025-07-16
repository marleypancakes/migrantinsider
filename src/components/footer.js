import { Link } from "gatsby"
import React from "react"

import logo from "../images/migrantinsiderlogo.png"

const Footer = () => {
  return (
    <div className="m-4">
      <div className="max-w-7xl mx-auto mt-10 h-auto lg:mb-8 sm:mb-4 xs:mb-4 xxs:mb-4">
        <div className="footer bg-dg p-10 mt-10 rounded-xl">
          <div className="grid grid-cols-2 xxs:grid-cols-1 lg:grid-cols-2">
            <div>
              <p className="text-white text-lg font-bold mt-2">
                <span className=" font-montserrat font-semibold mt-20">
                  &copy; {new Date().getFullYear()}. All Rights Reserved.
                </span>
              </p>
              <div className=" font-bold block-inline">
                <p>
                  <a className=" font-bold block-inline" href="/">
                    Migrant Insider
                  </a>
                </p>
              </div>
            </div>

            <div className=" place-self-end self-center xxs:hidden lg:block">
              <ul className=" text-xl font-montserrat font-medium">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/podcast">Podcast</Link>
                </li>{" "}
                <li>
                  <Link to="/blog">Archive</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
