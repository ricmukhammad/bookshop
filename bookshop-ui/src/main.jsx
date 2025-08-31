import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import ShoppingCartContext from "./hooks/ShoppingCartContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ShoppingCartContext>
            <App/>
        </ShoppingCartContext>
    </StrictMode>
);
