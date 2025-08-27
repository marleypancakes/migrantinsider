import React, { useState } from "react"
import MyModal from "../modal"
import Button from "../Atoms/button";
import AccountPage from "./accountPage";

const AccountButton = () => {
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

    const handleOpenAccountModal = () => setIsAccountModalOpen(true);
  
    const handleCloseAccountModal = () => setIsAccountModalOpen(false);
  
    return(
        <div>
            <Button onClick={handleOpenAccountModal} title="Account" className="bg-darkorange"
            >
            </Button>

            <MyModal isOpen={isAccountModalOpen} onRequestClose={handleCloseAccountModal}>
            <AccountPage></AccountPage>
            </MyModal>
        </div>
    )
}

export default AccountButton