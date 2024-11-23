import { useState, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { getOneEvent } from "../../utils/notepadUtils";
import { refresh } from "../../utils/tokenUtils";
import classes from "./EventCard.module.css";

function EventCard({ index, id, time, title, date, photo }) {
    const navigate = useNavigate();

    const hoverClass =
        index % 3 === 1
            ? classes.yellowHover
            : index % 3 === 2
            ? classes.blueHover
            : classes.purpleHover;

    function formatDate(isoString) {
        const date = new Date(isoString); // 解析時間字串
        const year = date.getFullYear(); // 獲取年份
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 獲取月份，補0
        const day = String(date.getDate()).padStart(2, "0"); // 獲取日期，補0

        return `${year}.${month}.${day}`; // 格式化為 YYYY.MM.DD
    }

    const formattedDate = formatDate(date);

    async function cardClickHandler() {
        try {
            const response = await getOneEvent(id);
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 200) {
                const responseData = await response.json();
                navigate(`/notepad/event/${time}/${id}`, {
                    state: { event: responseData },
                });
            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();

                if (checkReTokenStatus) {
                    const response = await getOneEvent(id);

                    if (response.status === 200) {
                        const responseData = await response.json();
                        navigate(`/notepad/event/${time}/${id}`, {
                            state: { event: responseData },
                        });
                    }
                } else {
                    // refresh Token過期，重新登入並刪掉 localStorage 裡的東西
                    // alert("refresh Token過期，請重新登入!");
                    localStorage.clear();
                    redirect("/login");
                }
            }
            // 發生其他問題
            redirect("/login");
        } catch (error) {
            console.error("Error durning get event: ", error);
        }
    }

    return (
        <div
            className={`${classes.container} ${hoverClass}`}
            onClick={cardClickHandler}
        >
            <img src={photo} alt="預設平台頭像" className={classes.image} />
            <div className={classes.title}>{title}</div>
            <div className={classes.time}>{formattedDate}</div>
        </div>
    );
}

export default EventCard;
