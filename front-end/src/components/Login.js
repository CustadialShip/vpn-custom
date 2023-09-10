import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setToken} from "../store/authSlice";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [usernameIn, setUsername] = useState('');
    const [passwordIn, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);

        fetch('/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: usernameIn,
                password: passwordIn
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error("Wrong username or password. Please try again");
                }
                return response.json();
            })
            .then(data => {
                dispatch(setToken(data.token));
                history.push("/home");
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
            });
    };

    return (
        <div className="login">
            <h2>Welcome!</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Username:</label>
                <input
                    type="text"
                    required
                    value={usernameIn}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter username'/>
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={passwordIn}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter password'/>
                {error && <div className="error"><h4>{error}</h4></div>}
                {!isPending && <button>Log in</button>}
                {isPending && <button disabled>Log in...</button>}
            </form>
            <div className="signup-link">
                <h5>
                    Need an account? <Link to="/signup">Sign up</Link>
                </h5>
            </div>
        </div>
    );
}

export default Login;