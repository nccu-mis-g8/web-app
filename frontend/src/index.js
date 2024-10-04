import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import ChatRoom from "./routes/ChatRoom";
import UserInfo from "./routes/UserInfo";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Upload from "./routes/Upload";
import ForgetPassword from "./routes/ForgetPassword";
import NavigationBar from "./components/NavigationBar";



const router = createBrowserRouter([
    { path: "/", element: <PrivateRoute element={<ChatRoom />} /> },
    { path: "/login", element: <Login /> },
    { path: "/upload", element: <Upload /> },
    { path: "/register", element: <Register /> },
    { path:"/user_info", element: <UserInfo /> },
    { path:"/forget_password", element: <ForgetPassword /> },
    { path: "/test", element: <NavigationBar />}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

