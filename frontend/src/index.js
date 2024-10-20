import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import ChatRoom from "./routes/ChatRoom";
import UserInfo from "./routes/UserInfo";
import Login from "./routes/Login";
import Register from "./routes/Register";
import SelectUpload from "./routes/SelectUpload";
import TrainingPage from "./routes/TrainingPage";
import ForgetPassword from "./routes/ForgetPassword";
import ResetPassword from "./routes/ResetPassword";
import SelectChat from "./routes/SelectChat";
import Notepad from "./routes/Notepad";
import classes from "./index.css";



const router = createBrowserRouter([
    { path: "/", element: <PrivateRoute element={<SelectChat />} /> },
    { path: "/message/:id", element: <PrivateRoute element={<ChatRoom />} /> },
    { path: "/login", element: <Login /> },
    { path: "/upload", element: <SelectUpload /> },
    { path: "/upload/:id", element: <TrainingPage /> },
    { path: "/register", element: <Register /> },
    { path:"/user_info", element: <UserInfo /> },
    { path:"/forget_password", element: <ForgetPassword /> },
    { path:"/forget_password/reset_password", element: <ResetPassword /> },
    { path:"/notepad", element: <Notepad /> },
    // { path: "/test", element: <SelectChat />}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

