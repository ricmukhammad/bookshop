import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import ShoppingCartContext from "./hooks/ShoppingCartContext.jsx";
import App from "./App.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {AuthProvider} from "./hooks/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <GoogleOAuthProvider clientId="309458224110-giv0rkhl3db0bjh8g1dt7fo2vt9faqfo.apps.googleusercontent.com">
            <AuthProvider>
                <ShoppingCartContext>
                    <App/>
                </ShoppingCartContext>
            </AuthProvider>
        </GoogleOAuthProvider>
    </StrictMode>
);
