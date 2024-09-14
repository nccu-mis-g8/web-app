import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {

     function isAuthenticated() {
        const accessToken = localStorage.getItem("accessToken");
        return accessToken !== null;
     }

     return isAuthenticated() ? element : <Navigate to="/login" />;
}

export default PrivateRoute;