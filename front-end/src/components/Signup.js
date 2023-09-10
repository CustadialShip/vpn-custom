import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {setToken} from "../store/authSlice";
import {useDispatch} from "react-redux";

const Signup = () => {
    const dispatch = useDispatch();
    const [usernameIn, setUsername] = useState('');
    const [passwordIn, setPassword] = useState('');
    const [firstNameIn, setFirstNameIn] = useState('');
    const [lastNameIn, setLastNameIn] = useState('');
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);

        fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: firstNameIn,
                lastName: lastNameIn,
                username: usernameIn,
                password: passwordIn
            })
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        throw Error("Username is already in use, try another one");
                    }
                    throw Error("Something went wrong. Please try again");
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
        <div className="signup">
            <h2>Create a Freespace account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>First name:</label>
                <input
                    type="text"
                    required
                    value={firstNameIn}
                    onChange={(e) => setFirstNameIn(e.target.value)}
                    placeholder='Enter first name'/>
                <label>Last name:</label>
                <input
                    type="text"
                    required
                    value={lastNameIn}
                    onChange={(e) => setLastNameIn(e.target.value)}
                    placeholder='Enter last name'/>
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
                {!isPending && <button>Sign Up</button>}
                {isPending && <button disabled>Sign Up...</button>}
            </form>
            <div className="signup-link">
                <h5>
                    Already have an account? <Link to="/login">Log In</Link>
                </h5>
            </div>
        </div>
    );
}

export default Signup;