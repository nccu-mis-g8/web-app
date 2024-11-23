import { useState, useRef, useEffect } from "react";
import classes from "./MessageInput.module.css";
import sendButton from "../../images/sendButton.png";
import add_item from "../../images/add_item.png";
import send_photo from "../../images/send_photo.png";
import camera from "../../images/camera.png";
import stickers from "../../images/stickers.png";

function MessageInput({ onSendMessage, name, loadingHint, disabled }) {
    const [text, setText] = useState("");

    const textareaRef = useRef(null);
    const containerRef = useRef(null);

    function textChangeHandler(e) {
        setText(e.target.value);
    }

    function keyDownHandler(e) {
        if (!disabled) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // 阻止默認行為 (也就是不要在textarea創建新行)
                sendMessageHandler();
            }
        }
    }

    function sendMessageHandler() {
        if (text.trim()) {
            //檢查是否不只空白字符
            onSendMessage(text);
            setText("");
        }
    }

    useEffect(() => {
        const textarea = textareaRef.current;
        const container = containerRef.current;

        // 自適應高度
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;

        // 當達到設定高度時，變成滾動，停止增加高度
        if (textarea.scrollHeight > 140) {
            textarea.style.height = "140px";
            textarea.style.overflowY = "scroll";
        } else {
            textarea.style.overflowY = "hidden";
        }

        // 根據內容調整容器高度
        container.style.width = "auto";
    }, [text]);

    const loadingText = " 正在輸入訊息...";

    return (
        <>
            <div className={classes.outerContainer}>
                {loadingHint && (
                    <div className={classes.loadingText}>
                        <div>{name}</div>
                        {loadingText.split("").map((char, index) => (
                            <span
                                key={index}
                                className={classes.loadingChar}
                                style={{
                                    animationDelay: `${
                                        (index % 2 === 0 ? index : -index) * 0.1
                                    }s`,
                                }} // 隨機延遲
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                )}
                <div className={classes.messageInputWrapper}>
                    <div className={classes.gadgetContainer}>
                        <img
                            src={add_item}
                            alt="更多"
                            className={classes.gadget}
                        />
                        <img
                            src={send_photo}
                            alt="傳送照片"
                            className={classes.gadget}
                        />
                        <img
                            src={camera}
                            alt="拍照"
                            className={classes.gadget}
                        />
                    </div>
                    <div
                        className={classes.textareaContainer}
                        ref={containerRef}
                    >
                        <textarea
                            className={classes.customTextarea}
                            // placeholder="發送訊息"
                            value={text}
                            ref={textareaRef}
                            rows="1"
                            onChange={textChangeHandler}
                            onKeyDown={keyDownHandler}
                        />
                    </div>
                    <button
                        className={classes.sendButton}
                        onClick={sendMessageHandler}
                        disabled={disabled}
                    >
                        <img
                            src={sendButton}
                            alt="送出"
                            width="35px"
                            height="35px"
                        />
                    </button>
                    <img
                        src={stickers}
                        alt="貼圖"
                        className={classes.gadget2}
                    />
                </div>
            </div>
        </>
    );
}

export default MessageInput;
