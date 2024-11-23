﻿import { useState, useRef } from "react";
import { useNavigate, useParams, redirect } from "react-router-dom";
import goBack_white from "../../images/goBack_white.png";
import event1 from "../../images/event_picture1.jpg";
import event2 from "../../images/event_picture2.jpg";
import event3 from "../../images/event_picture3.jpg";
import event4 from "../../images/event_picture4.jpg";
import event5 from "../../images/event_picture5.jpg";
import event6 from "../../images/event_picture6.jpg";
import { createEvent } from "../../utils/notepadUtils";
import { refresh } from "../../utils/tokenUtils";
import classes from "./CreateNewEvent.module.css";

function CreateNewEvent() {
    const [eventTitle, setEventTitle] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [imgControl, setImgControl] = useState(true);
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const [textContent, setTextContent] = useState(""); // 用於儲存文字內容

    const navigate = useNavigate();
    const { time } = useParams();

    const photoName = [
        "event_picture1.jpg",
        "event_picture2.jpg",
        "event_picture3.jpg",
        "event_picture4.jpg",
        "event_picture5.jpg",
        "event_picture6.jpg",
    ]

    function goBackHandler() {
        navigate(`/notepad/event/${time}`);
    }

    const dateInputRef = useRef(null);

    function titleChangeHandler(e) {
        setEventTitle(e.target.value); // 更新標題內容
    }

    function timeChangeHandler(e) {
        setEventTime(e.target.value); // 更新日期
    }

    function handleDatePickerClick() {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker(); // 使用原生方法顯示日期選擇器
        }
    }

    function imgControlHandler() {
        setImgControl(!imgControl);
    }

    function textChangeHandler(e) {
        setTextContent(e.target.value); // 更新文字內容
    }

    async function createEventHandler() {
        try {
            const response = await createEvent(textContent, eventTime, photoName[selectedImgIndex-1], eventTitle);
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 201) {
                console.log("創建事件成功");
                navigate(`/notepad/event/${time}`);

            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();

                if (checkReTokenStatus) {
                    const response = await createEvent(textContent, eventTime, photoName[selectedImgIndex-1], eventTitle);

                    if (response.status === 200) {
                        console.log("創建事件成功");
                        navigate(`/notepad/event/${time}`);
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

        } catch(error) {
            console.error("Error durning create event: ", error);
        }
    }

    return (
        <div className={classes.createEventContainer}>
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
                <div className={classes.contentTitle}>新增事件紀錄</div>
                <div className={classes.eventForm}>
                    <div className={classes.inputGroup}>
                        <div className={classes.inputTitle}>事件標題 ：</div>
                        <input
                            type="text"
                            value={eventTitle}
                            onChange={titleChangeHandler}
                            className={classes.eventTitleInput}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <div className={classes.inputTitle}>事件日期 ：</div>
                        <input
                            type="date"
                            ref={dateInputRef}
                            onClick={handleDatePickerClick}
                            onChange={timeChangeHandler}
                            className={classes.eventTimeInput}
                        />
                    </div>
                    <div className={classes.inputGroup2}>
                        <div className={classes.inputTitle}>預覽照片 ：</div>
                        <div className={classes.imgGroup}>
                            {imgControl && (
                                <div className={classes.dummyLeftImg}></div>
                            )}
                            {!imgControl && (
                                <img
                                    src={goBack_white}
                                    alt="往前"
                                    className={classes.leftImg}
                                    onClick={imgControlHandler}
                                />
                            )}
                            {imgControl && (
                                <img
                                    src={event1}
                                    alt="事件"
                                    className={`${classes.eventImg} ${
                                        selectedImgIndex === 1
                                            ? classes.selectedImg
                                            : ""
                                    }`}
                                    onClick={() => setSelectedImgIndex(1)}
                                />
                            )}
                            {imgControl && (
                                <img
                                    src={event2}
                                    alt="事件"
                                    className={`${classes.eventImg} ${
                                        selectedImgIndex === 2
                                            ? classes.selectedImg
                                            : ""
                                    }`}
                                    onClick={() => setSelectedImgIndex(2)}
                                />
                            )}
                            {imgControl && (
                                <img
                                    src={event3}
                                    alt="事件"
                                    className={`${classes.eventImg} ${
                                        selectedImgIndex === 3
                                            ? classes.selectedImg
                                            : ""
                                    }`}
                                    onClick={() => setSelectedImgIndex(3)}
                                />
                            )}
                            {!imgControl && (
                                <img
                                    src={event4}
                                    alt="事件"
                                    className={`${classes.eventImg} ${
                                        selectedImgIndex === 4
                                            ? classes.selectedImg
                                            : ""
                                    }`}
                                    onClick={() => setSelectedImgIndex(4)}
                                />
                            )}
                            {!imgControl && (
                                <img
                                    src={event5}
                                    alt="事件"
                                    className={`${classes.eventImg} ${
                                        selectedImgIndex === 5
                                            ? classes.selectedImg
                                            : ""
                                    }`}
                                    onClick={() => setSelectedImgIndex(5)}
                                />
                            )}
                            {!imgControl && (
                                <img
                                    src={event6}
                                    alt="事件"
                                    className={`${classes.eventImg} ${
                                        selectedImgIndex === 6
                                            ? classes.selectedImg
                                            : ""
                                    }`}
                                    onClick={() => setSelectedImgIndex(6)}
                                />
                            )}
                            {imgControl && (
                                <img
                                    src={goBack_white}
                                    alt="往後"
                                    className={classes.rightImg}
                                    onClick={imgControlHandler}
                                />
                            )}
                        </div>
                    </div>
                    <div className={classes.inputGroup2}>
                        <div className={classes.inputTitle}>事件內容 ：</div>
                        <div className={classes.textareaContainer}>
                            <textarea
                                className={classes.textarea}
                                maxLength={300} // 限制最多輸入 300 字
                                value={textContent}
                                onChange={textChangeHandler}
                            ></textarea>
                            <div className={classes.charCount}>
                                {textContent.length} / 300
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className={classes.createBtn}
                    disabled={
                        !eventTitle ||
                        !eventTime ||
                        !selectedImgIndex ||
                        !textContent
                    }
                    onClick={createEventHandler}
                >
                    新增事件
                </button>
            </div>
        </div>
    );
}

export default CreateNewEvent;