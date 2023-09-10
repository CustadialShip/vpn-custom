import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const ShowNavbar = ({children}) => {

    const location = useLocation();

    const [isShowNavbar, setIsShowNavbar] = useState(true);

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
            setIsShowNavbar(false);
        } else {
            setIsShowNavbar(true);
        }
    }, [location])

    return (
        <div>
            {isShowNavbar && children}
        </div>
    );
};

export default ShowNavbar;