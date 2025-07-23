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

const Modal = require("react-modal");

Modal.setAppElement("#___gatsby");

export const onClientEntry = async () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");

    console.log("Token: ", token)

    const response = await window
    .fetch(`../../api/validate`, {
        method: `POST`,
        headers: {
            "content-type": "application/json",
        },
        body: token,
    })
    
    .then(response => console.log("Response received by browser", response))
}