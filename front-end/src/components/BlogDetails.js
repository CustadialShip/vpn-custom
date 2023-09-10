import {useHistory, useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import CommentList from "./CommentList";
import {useSelector} from "react-redux";


const BlogDetails = () => {
    const token = useSelector(state => state.auth.token);
    const {id} = useParams();
    const {data: blog, isPending, error} = useFetch('/api/v1/blogs/' + id);
    const {data: isShowDeleteBtn} = useFetch('/api/v1/blogs/' + id + '/me');
    const history = useHistory();

    const handleClick = () => {
        fetch('/api/v1/blogs/' + blog.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(() => {
            history.push('/home');
        });
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    {isShowDeleteBtn && (<button onClick={handleClick}>Delete</button>)}
                </article>
            )}
            <div className="comments">
                <CommentList blogId={id}/>
            </div>
        </div>
    );
}

export default BlogDetails;