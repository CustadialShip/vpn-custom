import useFetch from "../hooks/useFetch";

const Profile = () => {

    const {data: user} = useFetch('/api/v1/auth/me');
    return (
        <div className="profile">
            {user && (
                <article>
                    <h2>{user.firstName} {user.lastName}</h2>
                    <p>aka {user.username}</p>
                </article>
            )}
            {user && (
                <div className="stats">
                    <h2>Stats:</h2>
                    <table>
                        <tbody>
                        <tr>
                            <td>Blogs</td>
                            <td>{user.blogs}</td>
                        </tr>
                        <tr>
                            <td>Words</td>
                            <td>{user.words}</td>
                        </tr>
                        <tr>
                            <td>Comments</td>
                            <td>{user.comments}</td>
                        </tr>
                        <tr>
                            <td>Likes</td>
                            <td>{user.likes}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Profile;