import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center text-primary fs-1 mt-5">Loading...</div>;
    if (error) return <div className="text-danger text-center mt-5 fs-1">Error: {error}</div>;

    return (
        <>
            <div className="bg-cover">
                <div className="container p-5 rounded-lg">
                    <h2 className="text-white text-center mb-4">Data Users</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="table-primary">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address.city}</td>
                                        <td>
                                            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                                                {user.website}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
