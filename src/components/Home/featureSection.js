import React from "react"
import Fade from "react-reveal/Fade"
import {Link} from "gatsby"

// Assets
import HeroImage from "../../images/holographic-background-1.webp"
import Image1 from "../../images/3D-liquid-abstract-1.webp"
import Image2 from "../../images/3D-liquid-abstract.webp"
import Image3 from "../../images/3D-liquid-abstract-3.webp"
import button from "../Atoms/button.js"
import SubscribeForm from "../subscriptions/subscribeForm.js"

const FeatureSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Fade bottom cascade>
        <div className="mt-10 flex flex-row justify-space xxs:flex-col xs:flex-col sm:flex-row content-center justify-center align-middle text-center items-center">
          <div className="w-1/3 bg-[#CB5B3B] drop-shadow-lg hover:brightness-90 p-8 rounded-xl m-5 xxs:w-1/2 xs:w-1/2 sm:w-1/2">
            <Link
              to={'../tag/whitehouse'}
              style={{
                textDecoration: "none",
              }}
            >
            <h2 className="text-white text-2xl">White House</h2>
            </Link>
          </div>

          <div className="w-1/3 bg-[#CB5B3B] drop-shadow-lg hover:brightness-90 p-8 rounded-xl m-5 xxs:w-1/2 xs:w-1/2 sm:w-1/2">
            <Link
              to={'../tag/congress'}
              style={{
                textDecoration: "none",
              }}
              >
          <h2 className="text-white text-2xl">Congress</h2>
              </Link>
          </div>
          <div className="w-1/3 bg-[#CB5B3B] drop-shadow-lg hover:brightness-90 p-8 rounded-xl m-5 xxs:w-1/2 xs:w-1/2 sm:w-1/2">
            <Link
              to={'../tag/courts'}
              style={{
                textDecoration: "none",
              }}
              >
            <h2 className="text-white text-2xl">Courts</h2>
              </Link>
          </div>
          <div className="w-1/3 bg-[#CB5B3B] drop-shadow-lg hover:brightness-90 p-8 rounded-xl m-5 xxs:w-1/2 xs:w-1/2 sm:w-1/2">
            <Link
              to={'../tag/ice'}
              style={{
                textDecoration: "none",
              }}
              >
            <h2 className="text-white text-2xl">ICE</h2>
              </Link>
          </div>
        </div>
      </Fade>

      {/* 
      <div className="mt-10 px-8">
        <h2 className=" text-4xl font-semibold text-gradient bg-gradient-to-r from-pink to-purple">
          {" "}
          Integrations
        </h2>
        <h3 className=" mt-5 font-bold text-6xl xxs:text-lg xs:text-xl sm:text-xl lg:text-6xl">
          Discover, connect, and configure
        </h3>
        <p className=" opacity-70 font-normal mt-3 text-xs xxs:text-xs xs:text-xs sm:text-xs md:text-sm lg:text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md">
            <a
              href="/contact/"
              className="transition-all duration-500ms ease-in-out hover:ease-in-out w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-center bg-purple text-white hover:text-purple border border-purple hover:bg-transparent md:text-lg md:px-10"
            >
              Send Enquiry
            </a>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default FeatureSection
