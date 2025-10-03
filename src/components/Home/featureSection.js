import React from "react"
import Fade from "react-reveal/Fade"
import {Link} from "gatsby"

const FeatureSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Fade bottom cascade>
        <div className="mt-10 flex flex-row justify-space xxs:flex-col xs:flex-col sm:flex-row content-center justify-center align-middle text-center items-center">
          <div className="w-1/3 bg-[#CB5B3B] drop-shadow-lg hover:brightness-90 p-8 rounded-xl m-5 xxs:w-1/2 xs:w-1/2 sm:w-1/2">
            <Link
              to={'/tag/white-house'}
              style={{
                textDecoration: "none",
              }}
            >
            <h2 className="text-white text-2xl">White House</h2>
            </Link>
          </div>

          <div className="w-1/3 bg-[#CB5B3B] drop-shadow-lg hover:brightness-90 p-8 rounded-xl m-5 xxs:w-1/2 xs:w-1/2 sm:w-1/2">
            <Link
              to={'/tag/congress'}
              style={{
                textDecoration: "none",
              }}
              >
          <h2 className="text-white text-2xl">Congress</h2>
              </Link>
          </div>
          <div className="w-1/3 bg-[#CB5B3B] drop-shadow-lg hover:brightness-90 p-8 rounded-xl m-5 xxs:w-1/2 xs:w-1/2 sm:w-1/2">
            <Link
              to={'/tag/courts'}
              style={{
                textDecoration: "none",
              }}
              >
            <h2 className="text-white text-2xl">Courts</h2>
              </Link>
          </div>
          <div className="w-1/3 bg-[#CB5B3B] drop-shadow-lg hover:brightness-90 p-8 rounded-xl m-5 xxs:w-1/2 xs:w-1/2 sm:w-1/2">
            <Link
              to={'/tag/ice'}
              style={{
                textDecoration: "none",
              }}
              >
            <h2 className="text-white text-2xl">ICE</h2>
              </Link>
          </div>
        </div>
      </Fade>
    </div>
  )
}

export default FeatureSection
