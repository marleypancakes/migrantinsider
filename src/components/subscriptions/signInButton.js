import React, { useState } from "react"
import MyModal from "../modal"
import SignInForm from "./signInForm";
import Button from "../Atoms/button";

const SignInButton = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

    const handleOpenSignInModal = () => setIsSignInModalOpen(true);
  
    const handleCloseSignInModal = () => setIsSignInModalOpen(false);
  
    return(
        <div>
            <Button onClick={handleOpenSignInModal} title="Sign In" className="bg-darkorange"
            >
            </Button>

            <MyModal isOpen={isSignInModalOpen} onRequestClose={handleCloseSignInModal}>
            <SignInForm></SignInForm>
            </MyModal>
        </div>
    )
}

export default SignInButton