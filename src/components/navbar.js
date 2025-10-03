import React, { useState } from "react"
import { Link } from "gatsby"
import Button from "./Atoms/button"
import TitleImage from "../../static/img/migrantinsidertitle.png"
import { useUser, UserContext } from "../context/UserContext"
import logout  from "../utils/logout"
import SubscribeButton from "./subscriptions/subscribeButton"
import SignInButton from "./subscriptions/signInButton"
import AccountButton from "./Account/accountButton"

const Navbar = () => {
  const {user, isPaidUser, isLoggedIn} = useUser()

  const [openMenu, setOpenMenu] = useState(false)

  console.log("[Navbar] IsLoggedin? ", isLoggedIn)

  return (
    <nav className="bg-transparent border-b">
      <div className="max-w-7xl mx-auto px-3 py-5 rounded-md">
        <div className="flex items-center justify-between h-16">
          <div className="w-full justify-between flex items-center">
            <div className="w-1/4 min-w-72">
            <a
              className=" flex-shrink-0"
              href="/"
              >
              <img src={TitleImage}></img>
            </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  className="relative after:rounded after:bg-darkorange after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300  opacity-70 hover:opacity-100 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
                  to="/"
                >
                  Home
                </Link>

                {/* <Link
                  className="relative after:rounded after:bg-darkorange after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300  opacity-70 hover:opacity-100 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
                  to="/podcast"
                >
                  Podcast
                </Link> */}
                <Link
                  className="relative after:rounded after:bg-darkorange after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300  opacity-70 hover:opacity-100 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
                  to="/blog"
                >
                  Archive
                </Link>
                <Link
                  className="relative after:rounded after:bg-darkorange after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300  opacity-70 hover:opacity-100 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
                  to="/about"
                >
                  About
                </Link>

                {isLoggedIn ? (
                <div className="flex flex-row">
                  <AccountButton></AccountButton>
                  <Button onClick={logout} title="Log Out" className="bg-darkorange"></Button>
                </div>
                ) : (
                <div className="flex flex-row">
                  <SubscribeButton></SubscribeButton>
                  <SignInButton></SignInButton>
                </div>
                )}
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              id="al"
              aria-label="Menu"
              onClick={() => setOpenMenu(!openMenu)}
              className="dark:text-white hover:-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <svg
                width="20"
                height="20"
                fill="black"
                className="h-8 w-8"
                viewBox="0 0 1792 1792"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {openMenu && (
        <div className="transition duration-1000 ease-in-out md:hidden">
          <div className="md-px-2 pt-2 pb-3 space-y-1 sm:px-3 transition duration-1000 ease-in-out">
            <a
              className="px-3 py-3 rounded-md text-m font-medium font-montserrat"
              href="/"
            >
              Home
            </a>

            {/* <a
              className="px-3 py-3 rounded-md text-m font-medium font-montserrat"
              href="/podcast"
            >
              Podcast
            </a> */}
            <a
              className="px-3 py-3 rounded-md text-m font-medium font-montserrat"
              href="/blog"
            >
              Archive
            </a>
            <a
              className="px-3 py-3 rounded-md text-m font-medium font-montserrat"
              href="/about"
            >
              About
            </a>
            {isLoggedIn ? (
                <div className="flex flex-col space-y-1 items-center">
                  <AccountButton></AccountButton>
                  <Button onClick={logout} title="Log Out" className="bg-darkorange"></Button>
                </div>
                ) : (
                <div className="flex flex-col space-y-5 items-center">
                  <SubscribeButton></SubscribeButton>
                  <SignInButton></SignInButton>
                </div>
                )}

          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar