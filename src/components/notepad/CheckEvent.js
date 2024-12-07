import { useState, useEffect } from "react";
import { useNavigate, useParams, redirect } from "react-router-dom";
import EventCard from "./EventCard";
import goBack_white from "../../images/goBack_white.png";
import add_event from "../../images/add_event.png";
import nextImg from "../../images/goBack_white.png";
import { getEvents } from "../../utils/notepadUtils";
import { refresh } from "../../utils/tokenUtils";
import classes from "./CheckEvent.module.css";

function CheckEvent() {
    const [eventList, setEventList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const { time } = useParams();

    useEffect(() => {
        const timeParameter = time === "Recently" ? "" : time;

        async function fetchEvents() {
            const response = await getEvents(timeParameter);
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 200) {
                const responseData = await response.json();
                const sortedEvents = responseData.sort(
                    (a, b) => new Date(b.event_date) - new Date(a.event_date)
                );
                setEventList(sortedEvents);
            } else if (response.status === 404) {
                setEventList([]);
            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();

                if (checkReTokenStatus) {
                    const response = await getEvents(timeParameter);

                    if (response.status === 200) {
                        const responseData = await response.json();
                        const sortedEvents = responseData.sort(
                            (a, b) => new Date(b.event_date) - new Date(a.event_date)
                        );
                        setEventList(sortedEvents);
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
        }

        fetchEvents();
    }, [time]); // 當 `time` 改變時重新呼叫 API

    const eventsPerPage = 3; // 每頁顯示的事件數量
    const totalPages = Math.ceil(eventList.length / eventsPerPage); // 總頁數

    const navigate = useNavigate();

    function goBackHandler() {
        navigate("/notepad");
    }

    function goCreateEventHandler() {
        navigate(`/notepad/event/${time}/createEvent`);
    }

    function handleNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const startIndex = (currentPage - 1) * eventsPerPage;
    const currentEvents = eventList.slice(
        startIndex,
        startIndex + eventsPerPage
    );

    return (
        <div className={classes.checkEventContainer}>
            <div className={classes.header}>
                <img
                    src={goBack_white}
                    className={classes.goBack}
                    alt="返回"
                    onClick={goBackHandler}
                />
                <div className={classes.title}>記事本</div>
            </div>
            <div className={classes.mainContent}>
                <div className={classes.contentHeader}>
                    <div className={classes.contentTitle} data-text={time}>
                        {time}
                    </div>
                    <img
                        src={add_event}
                        alt="新增事件"
                        className={classes.createEventBtn}
                        onClick={goCreateEventHandler}
                    />
                </div>
                <div className={classes.eventList}>
                    {currentPage > 1 && (
                        <img
                            src={nextImg}
                            alt="上一個"
                            className={`${classes.leftImg} ${classes.leftImgVisible}`}
                            onClick={handlePreviousPage}
                        />
                    )}
                    {currentEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            id={event.event_id}
                            time={time}
                            index={startIndex + index + 1}
                            title={event.event_title}
                            date={event.event_date}
                            photo={event.event_picture}
                        />
                    ))}
                    {currentPage < totalPages && (
                        <img
                            src={nextImg}
                            alt="下一個"
                            className={`${classes.rightImg} ${classes.rightImgVisible}`}
                            onClick={handleNextPage}
                        />
                    )}
                </div>
                {eventList.length === 0 && (
                    <div className={classes.noEvent}>尚無事件紀錄</div>
                )}
            </div>
        </div>
    );
}

export default CheckEvent;
