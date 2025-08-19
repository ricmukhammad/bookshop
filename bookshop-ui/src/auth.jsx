import { useEffect } from "react";

export default function GoogleLoginButton() {
    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "309458224110-giv0rkhl3db0bjh8g1dt7fo2vt9faqfo.apps.googleusercontent.com",
            callback: handleResponse
        });

        window.google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            { theme: "outline", size: "large" }
        );
    }, []);

    const handleResponse = async (response) => {
        const idToken = response.credential; // this is the Google ID token
        console.log("Google ID Token:", idToken);

        // Send token to backend
        const res = await fetch("http://localhost:8082/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken })
        });

        const data = await res.json();
        console.log("Backend response:", data);

        // Store JWT in localStorage/sessionStorage
        localStorage.setItem("accessToken", data.accessToken);
    };

    return <div id="googleSignInDiv"></div>;
}