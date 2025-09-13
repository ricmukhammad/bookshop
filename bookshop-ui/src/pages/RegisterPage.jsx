import {useState} from "react";
import {googleAuth, register} from "../api/AuthClient.js";
import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/AuthContext.jsx";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        register(name, email, password)
            .then((response) => {
                login({
                    name: response.user.name,
                    email: response.user.email,
                    picture: response.user.picture,
                });
                localStorage.setItem("token", response.accessToken);
                navigate("/");
            })
            .catch(() => {
                setError("Registration failed. Try again.");
            })
    };

    const handleGoogleLogin = (credentialResponse) => {
        googleAuth(credentialResponse.credential)
            .then((response) => {
                login({
                    name: response.user.name,
                    email: response.user.email,
                    picture: response.user.picture,
                });
                localStorage.setItem("token", response.accessToken);
                console.log("Google login success:", response);
                navigate("/");
            }).catch(() => setError("Google login failed"))
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                {error && <div className="text-red-600 mb-4">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-yellow-700 text-white py-2 rounded hover:bg-yellow-800"
                    >
                        Register
                    </button>
                </form>
                <div className="my-4 text-center">or</div>

                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => setError("Google login failed")}
                />
            </div>
        </div>
    );
}