import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ChatRoom from "./routes/ChatRoom";
import Login from "./routes/Login";



const router = createBrowserRouter([
    { path: "/", element: <ChatRoom /> },
    { path: "/login", element: <Login /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

