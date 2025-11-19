/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/900.css"
import "@fontsource/noto-serif/400.css"

import "./src/styles/global.css"
import { UserProvider } from "./src/context/UserContext"
import React from "react"

const Modal = require("react-modal");

Modal.setAppElement("#___gatsby");

export const wrapRootElement = ({ element }) => {
    return <UserProvider>{element}</UserProvider>
}
