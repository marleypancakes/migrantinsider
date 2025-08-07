import React, { useState, useEffect } from "react"
import { useUser } from '../context/UserContext'
import styled from "styled-components"

const StyledDiv = styled.div`
  & h1 {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.5;
  }
  & h2 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2.2;
  }
  & h3 {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 2;
  }
  & h4 {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 2;
  }
  & a {
    color: #6b46c1;
  }
  & p {
  margin-bottom: 2rem;
  }
`
  
const PremiumContent = ({ post }) => {
    const { user, isPaidUser, loading, isLoggedIn } = useUser;
    const [showFullContent, setShowFullContent] = useState(false);

    useEffect(() => {
        const canViewFull = isPaidUser || post.visibility === 'public' || 
                        !post.tiers?.some(tier => tier.type === 'paid');
        setShowFullContent(canViewFull);
    }, [isPaidUser, post, loading]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    // Public Post - everyone can see
    if(post.visibility === "public" || !post.tiers?.some(tier => tier.type === "paid")) {
        return (
                <StyledDiv
                className="post-content-body text-[#000000]"
                dangerouslySetInnerHTML={{ __html: post.html }}
                />    
            );
    }

    // Not logged in
    if (!isLoggedIn) {
        return (
            <div className="post-content">
                <StyledDiv
                    className="post-content-body text-[#000000]"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />    
                <div className="login-wall">
                    <div className="login-prompt">
                        <h3>Want to read more?</h3>
                        <p>Sign in to your account to continue reading this article.</p>
                        <div className="auth-buttons">
                            <a href="/login" className="btn btn-primary">
                                Sign In
                            </a>
                            <a href="/register" className="btn btn-secondary">
                                Create Account
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if(!isPaidUser) {
        return (
            <div className="post-content">
                <StyledDiv
                    className="post-content-body text-[#000000]"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />    
                <div className="login-wall">
                    <div className="login-prompt">
                        <h3>Premium Content</h3>
                        <p>Hello {user.email}! This is premium content available to paid subscribers.</p>

                        <div className="subscription-benefits">
                            <h4>With a premium subscription, you get:</h4>
                            <ul>
                                <li>Access to all premium articles</li>
                                <li>Exclusive subscriber-only content</li>
                            </ul>
                        </div>
                            
                        <div className="upgrade-buttons">
                            <a href="/subscribe" className="btn btn-primary">
                                Upgrade to Premium
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Paid User - show full content
    return (
        <StyledDiv
        className="post-content-body text-[#000000]"
        dangerouslySetInnerHTML={{ __html: post.excerpt }}
    />   
    )
}
export default PremiumContent;