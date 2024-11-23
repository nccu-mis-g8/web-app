﻿import { redirect, useLoaderData } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import SelectUploadMainFrame from "../components/upload/SelectUploadMainFrame";
import { refresh } from "../utils/tokenUtils";
import { getAllModel } from "../utils/modelUtils";
import classes from "./SelectUpload.module.css";

function Upload() {

    const modelInfo = useLoaderData();

    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <SelectUploadMainFrame modelInfo={modelInfo} />
            </div>
        </>
    );
}

export async function loader() {
    const response = await getAllModel();
    const accessToken = localStorage.getItem("accessToken");

    if (response.status === 200) {
        const responseData = await response.json();
        return responseData;
    } else if (response.status === 401 && accessToken) {
        // access Token過期，用refresh Token去拿新的access Token
        const checkReTokenStatus = await refresh();

        if (checkReTokenStatus) {
            const response = await getAllModel();

            if (response.status === 200) {
                const responseData = await response.json();
                return responseData;
            }
        } else {
            // refresh Token過期，重新登入並刪掉 localStorage 裡的東西
            // alert("refresh Token過期，請重新登入!");
            localStorage.clear();
            return redirect("/login");
        }
    }
    // 發生其他問題
    return redirect("/login");
}

export default Upload;
