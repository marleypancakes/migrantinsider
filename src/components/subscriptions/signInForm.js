import React from "react"
import TitleImage from "../../../static/img/migrantinsidertitle.png"

const SignInForm = () => {
    const [scriptLoaded, setScriptLoaded] = React.useState(false)

React.useEffect(() => {
  if (document.querySelector('script[data-ghost]')) {
    setScriptLoaded(true);
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@tryghost/portal@latest/umd/portal.min.js';
  script.setAttribute('data-ghost', 'https://notes-on-the-crises.ghost.io');
  script.setAttribute('data-key', 'YOUR_CONTENT_API_KEY_HERE'); // Just the key, no URL
  script.async = true;
  
  script.onload = () => {
    console.log("[Portal] Script loaded");
    setScriptLoaded(true);
  };
  
  script.onerror = (error) => {
    console.error("[Portal] Script error:", error);
  };
  
  document.head.appendChild(script);
}, []);

    const handleSignIn = () => {
      // Trigger Ghost Portal's signin modal
      const portalTrigger = document.querySelector('[data-portal="signin"]');
      if (portalTrigger) {
        portalTrigger.click();
      } else {
        // Fallback: create and click trigger
        const link = document.createElement('a');
        link.setAttribute('data-portal', 'signin');
        link.href = '#/portal/signin';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    return (
      <div className="grid grid-cols-1 p-1">
        <img src={TitleImage} alt="Migrant Insider Logo"></img>
        <h1 className="w-100 h-auto text-center text-3xl font-extrabold leading-tight text-[#000000] lg:mb-6 lg:text-4xl dark:">
          Sign In
        </h1>
        <button 
          onClick={handleSignIn}
          disabled={!scriptLoaded}
          className="bg-darkorange rounded mt-3 p-2 text-white w-full"
        >
          Continue
        </button>
        
        {/* This hidden link triggers Ghost Portal */}
        <a 
          href="#/portal/signin" 
          data-portal="signin"
          style={{ display: 'none' }}
        >
          Sign in
        </a>
      </div>
    )
}

export default SignInForm