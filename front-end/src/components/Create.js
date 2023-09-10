import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";


const Create = () => {
    const token = useSelector(state => state.auth.token);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [access , setAccess] = useState('private');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, access};

        setIsPending(true);

        fetch('/api/v1/blogs', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog),

        }).then(() => {
            setIsPending(false);
            history.push('/home');
        });
    };

    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <select
                    value={access}
                    onChange={(e) => setAccess(e.target.value)}
                >
                    <option value="public">public</option>
                    <option value="private">private</option>
                </select>
                <div>
                    {!isPending && <button>Add block</button>}
                    {isPending && <button disabled>Adding blog...</button>}
                </div>
            </form>
        </div>
    );
};

export default Create;