import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

const useFetch = (url) => {
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 403) {
                    throw Error("Forbidden");
                }
                throw Error("Something went wrong. Please try again");
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch((err) => {
            setError(err.message);
            setIsPending(false);
            if (err.message === "Forbidden") {
                history.push("/login");
            }
        })
    }, [token, history, url]);

    return {data, isPending, error};
}

export default useFetch;