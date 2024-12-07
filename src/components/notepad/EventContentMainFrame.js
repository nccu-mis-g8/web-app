import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import goBack_white from "../../images/goBack_white.png";
import pencil from "../../images/pencil.png";
import classes from "./EventContentMainFrame.module.css";

function EventContentMainFrame() {
    const navigate = useNavigate();
    const { time, id } = useParams();
    const location = useLocation();

    const { event } = location.state || {};

    const photo = event ? event.event_picture : "";
    const title = event ? event.event_title : "";
    const content = event ? event.event_content : "";

    function goBackHandler() {
        navigate(`/notepad/event/${time}`);
    }

    function goBackToNotepadMainHandler() {
        navigate("/notepad");
    }

    function goUpdateEventHandler() {
        navigate(`/notepad/event/${time}/updateEvent/${id}`, {
            state: { event: event },
        });
    }

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
                <div
                    className={classes.backToNotePadBtn}
                    onClick={goBackToNotepadMainHandler}
                >
                    回記事本主頁
                </div>
                <div className={classes.contentContainer}>
                    <div className={classes.titleAndImg}>
                        <img
                            src={photo}
                            alt="事件照片"
                            className={classes.photo}
                        />
                        <div className={classes.contentTitle}>{title}</div>
                        <div className={classes.tooltipContainer}>
                            <img
                                src={pencil}
                                alt="編輯事件"
                                className={classes.pencil}
                                onClick={goUpdateEventHandler}
                            />
                            <div className={classes.tooltip}>編輯事件</div>
                        </div>
                    </div>
                    <div className={classes.content}>{content}</div>
                </div>
            </div>
        </div>
    );
}

export default EventContentMainFrame;
