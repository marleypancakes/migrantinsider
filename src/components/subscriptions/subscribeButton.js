import React, { useState } from "react"
import MyModal from "../modal"
import SubscribeForm from "./subscribeForm";
import Button from "../Atoms/button";

const SubscribeButton = ({className}) => {
    const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

    const handleOpenSubscribeModal = () => setIsSubscribeModalOpen(true);
  
    const handleCloseSubscribeModal = () => setIsSubscribeModalOpen(false);
  
    return(
        <div className="flex shrink-0">
            <Button onClick={handleOpenSubscribeModal} title="Subscribe" className="bg-darkorange"
            >
            </Button>

            <MyModal isOpen={isSubscribeModalOpen} onRequestClose={handleCloseSubscribeModal}>
            <SubscribeForm></SubscribeForm>
            </MyModal>
        </div>
    )
}

export default SubscribeButton