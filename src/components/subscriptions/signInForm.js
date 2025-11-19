import React from "react"
import TitleImage from "../../../static/img/migrantinsidertitle.png"

const SignInForm = () => {
    const [portalReady, setPortalReady] = React.useState(false)

    React.useEffect(() => {
      // Remove any existing Portal scripts/iframes
      const existingScript = document.querySelector('script[data-ghost]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const existingIframe = document.querySelector('iframe[data-frame]');
      if (existingIframe) {
        existingIframe.remove();
      }

      console.log("[Portal] Initializing...");

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@tryghost/portal@~2.36/umd/portal.min.js';
      script.setAttribute('data-ghost', 'https://notes-on-the-crises.ghost.io');
      script.setAttribute('data-key', 'YOUR_CONTENT_API_KEY');
      script.async = true;
      
      script.onload = () => {
        console.log("[Portal] Script loaded");
        setTimeout(() => {
          setPortalReady(true);
          console.log("[Portal] Ready");
        }, 1500);
      };
      
      script.onerror = (error) => {
        console.error("[Portal] Load error:", error);
      };
      
      document.body.appendChild(script);

      return () => {
        // Cleanup
        script.remove();
      };
    }, []);

    const handleSignIn = (e) => {
      e.preventDefault();
      console.log("[Portal] Triggering sign in...");
      
      // Method 1: Use hash navigation
      window.location.hash = '#/portal/signin';
      
      // Method 2: Dispatch custom event (Portal might listen to this)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('portal-action', { 
          detail: { action: 'openPopup', page: 'signin' }
        }));
      }, 100);
    };

    return (
      <div className="grid grid-cols-1 p-1">
        <img src={TitleImage} alt="Migrant Insider Logo"></img>
        <h1 className="w-100 h-auto text-center text-3xl font-extrabold leading-tight text-[#000000] lg:mb-6 lg:text-4xl dark:">
          Sign In
        </h1>
        
        <form onSubmit={handleSignIn}>
          <button 
            type="submit"
            disabled={!portalReady}
            className="bg-darkorange rounded mt-3 p-2 text-white w-full"
          >
            {portalReady ? 'Continue' : 'Loading...'}
          </button>
        </form>
        
        {/* Debug info */}
        <div className="text-xs text-gray-500 mt-2">
          Portal status: {portalReady ? 'Ready' : 'Loading...'}
        </div>
      </div>
    )
}

export default SignInForm