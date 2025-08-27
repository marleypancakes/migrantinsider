import React from "react";
import { useUser } from "../../context/UserContext";
import SignInButton from "../subscriptions/signInButton";
import TitleImage from "../../../static/img/migrantinsidertitle.png"
import Button from "../Atoms/button";

const AccountPage = () => {
    const { user, isPaidUser, loading, isLoggedIn } = useUser();
    
    if (user) {
        return(
            <div className="flex flex-col justify-center items-center w-96 gap-3">
                <img src={TitleImage} alt="Migrant Insider Logo"></img>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Subscription: {user.subscriptionStatus}</p>
                <a href= "https://billing.stripe.com/p/login/8x214ocNR6RQ8rtfsX9EI00" title="Unsubscribe" className="w-40 p-2 bg-darkorange text-white rounded">Unsubscribe</a>
            </div>
        )
    } else {
        return(
            <div className="flex flex-col justify-center items-center h-80"> 
              <img src={TitleImage} alt="Migrant Insider Logo"></img>
                <p>Please log in to view this page.</p>
                <SignInButton></SignInButton>
            </div>
        )
    }
}

export default AccountPage