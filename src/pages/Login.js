import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/auth/slice";
import { selectIsAuthenticated, selectLoginErrors } from "../store/auth/selectors";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import './../css/login.css';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginErrors = useSelector(selectLoginErrors);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(userData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/products");
        }
    }, [isAuthenticated, navigate]);



    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Prijavi se</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Korisničko ime"
                            value={userData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Lozinka"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="error-msg">
                        <p>{loginErrors}</p>
                    </div>

                    <button type="submit" className="login-btn">Uloguj Se</button>
                </form>


            </div>
        </div>
    );
}

export default Login;