import useFetch from "../hooks/useFetch";
import BlogList from "./BlogList";
import {useEffect, useState} from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const {data: responseBlogs, isPending, error} = useFetch('/api/v1/blogs?page=' + currentPage);
    const [pageNumbers, setPageNumbers] = useState(null);

    useEffect(() => {
        if (responseBlogs && responseBlogs.totalPage) {
            setPageNumbers([...Array(responseBlogs.totalPage).keys()].slice(1));
        }
    }, [responseBlogs]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {responseBlogs && responseBlogs.blogs && <BlogList blogs={responseBlogs.blogs}/>}
            <div className="blogPagination">
                <Stack spacing={2}>
                    {pageNumbers && <Pagination count={pageNumbers.length + 1}
                                                page={currentPage}
                                                onChange={handleChange}
                                                defaultPage={0}/>}
                </Stack>
            </div>
        </div>
    );

};

export default Home;