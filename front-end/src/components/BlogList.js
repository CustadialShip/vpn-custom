import {Link} from "react-router-dom";
import moment from "moment";

const BlogList = ({blogs}) => {
    return (
        <div className="blog-list">
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={'/blogs/' + blog.id}>
                        <span>{blog.access}</span>
                        <h2>{blog.title}</h2>
                        <div className="blog-preview-posted">{moment(blog.posted).format('ll')}</div>
                        <p>Written by {blog.author}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default BlogList;