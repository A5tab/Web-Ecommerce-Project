import { useNavigate, useLocation, replace } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function Protected({ children, authentication = true, allowedRoles = [] }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, userRole } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAllowed = allowedRoles.length === 0 || allowedRoles.includes(userRole);

        if (authentication && isLoggedIn !== authentication) {
            navigate('/login', { state: { from: location } }, replace);
        }
        else if (!authentication && isLoggedIn !== authentication) {
            navigate('/');
        }
        else if (authentication && !isAllowed) {
            navigate('/unauthorized', { state: { from: location } }, replace);
        }

        setLoading(false);
    }, [navigate, authentication, allowedRoles]);

    return loading ? <h1>Checking Authentication......</h1> : <>{children}</>;
}
