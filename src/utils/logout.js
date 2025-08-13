export default async function logout() {
  try {
    // Call server-side logout endpoint to clear HttpOnly cookie
    const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // Important for HttpOnly cookies
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {        
        // Redirect to login or home page
        window.location.href = '/';
    } else {
        console.error('Logout failed');
    }
} catch (error) {
    console.error('Logout error:', error);
    window.location.href = '/';
}
}