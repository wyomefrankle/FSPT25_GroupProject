import { useContext } from "react";
import AddContext from "../Context/AddContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { isLoggedIn } = useContext(AddContext);

    if (isLoggedIn) {
        return children;
    } else {
        return <Navigate to ="/login" />;
    };
}
