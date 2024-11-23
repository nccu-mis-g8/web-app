﻿import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, redirect } from "react-router-dom";
import ChatRoomHeader from "./ChatRoomHeader";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import ChooseResponse from "./ChooseResponse";
import MessageInput from "./MessageInput";
import { inference } from "../../utils/modelUtils";
import { refresh } from "../../utils/tokenUtils";
import classes from "./MessageList.module.css";

function MessageList({ dummy, dummyName }) {
    const [messages, setMessages] = useState([]);
    const [pageSize, setPageSize] = useState(false);

    // 用於儲存前五筆對話紀錄
    const [conversationHistory, setConversationHistory] = useState([]);

    const [pendingChoices, setPendingChoices] = useState(null);
    const [loadingHint, setLoadingHint] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // 當組件首次加載時觸發淡入效果
        setPageSize(dummy);
    }, [dummy]);

    useEffect(() => {
        // 滑到底部
        scrollToBottom();
    }, [messages, pendingChoices]);

    const { id } = useParams();
    const location = useLocation();
    const { person } = location.state || {};

    const name = person ? person.model_original_name : dummyName;
    const modelname = person ? person.modelname : "";

    async function sendMessageHandler(userMessage) {
        setMessages([...messages, { type: "user", text: userMessage }]);
        setLoadingHint(true);

        const formData = new FormData();
        formData.append("is_shared", "false");
        formData.append("modelname", modelname);
        formData.append("input_text", userMessage);

        try {
            console.log(conversationHistory);
            const response = await inference(formData);
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 200) {
                const responseData = await response.json();
                const results = responseData.result;
                if (results.length === 1) {
                    // 只有一個回答時
                    const botOutput = results[0].output;
                    setLoadingHint(false);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { type: "bot", text: botOutput },
                    ]);
                    updateConversationHistory({
                        user: userMessage,
                        model: botOutput,
                    });

                  } else if (results.length > 1) {
                    // 有兩個或更多回答時
                    let botOutputs = []
                    botOutputs[0] = results[0].output;
                    botOutputs[1] = results[1].output;
                    setLoadingHint(false);
                    setPendingChoices(botOutputs);
                    console.log(conversationHistory);
                }


            } else if (response.status === 400) {
                const responseData = await response.json();
                const error = responseData.error;
                console.log("錯誤訊息: " + error);
            } else if (response.status === 401 && accessToken) {
                // access Token過期，用refresh Token去拿新的access Token
                const checkReTokenStatus = await refresh();
                if (checkReTokenStatus) {
                    const response = await inference(formData);
                    if (response.status === 200) {
                        const responseData = await response.json();
                        const results = responseData.result;
                        if (results.length === 1) {
                            // 只有一個回答時
                            const botOutput = results[0].output;
                            setLoadingHint(false);
                            setMessages((prevMessages) => [
                                ...prevMessages,
                                { type: "bot", text: botOutput },
                            ]);
                            updateConversationHistory({
                                user: userMessage,
                                model: botOutput,
                            });

                          } else if (results.length > 1) {
                            // 有兩個或更多回答時
                            let botOutputs = []
                            botOutputs[0] = results[0].output;
                            botOutputs[1] = results[1].output;
                            setLoadingHint(false);
                            setPendingChoices(botOutputs);
                        }

                    }
                } else {
                    // refresh Token過期，重新登入並刪掉 localStorage 裡的東西
                    // alert("refresh Token過期，請重新登入!");
                    localStorage.clear();
                    redirect("/login");
                }
            } else {
                const responseData = await response.json();
                const error = responseData.message;
                console.error(error);
                alert("發生錯誤，請重新整理後再試一次");
            }
        } catch (error) {
            console.error("Error durning inference model: ", error);
            redirect("/login");
        }

    }

    function updateConversationHistory(newConversation) {
        setConversationHistory((prevHistory) => {
            const updatedHistory = [...prevHistory, newConversation];
            if (updatedHistory.length > 5) {
                updatedHistory.shift(); // 超過 5 條時刪除最舊的
            }
            return updatedHistory;
        });
    }

    function handleChoice(selection) {
        // 添加選擇的回覆為 botMessage
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: "bot", text: selection },
        ]);

        updateConversationHistory({
            user: messages[messages.length - 1]?.text || "",
            model: selection,
        });

        // 隱藏選擇元件
        setPendingChoices(null);
    }

    function scrollToBottom() {
        // 滾動到消息列表底部
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <>
            <div className={pageSize ? classes.outerContainerDummy : classes.outerContainer}>
                <ChatRoomHeader name={name} />
                <div className={classes.listContainer}>
                    {messages.map((message, index) =>
                        message.type === "user" ? (
                            <UserMessage key={index} content={message.text} />
                        ) : (
                            <BotMessage key={index} content={message.text} avatar={person.modelphoto} />
                        )
                    )}
                    {pendingChoices && (
                        <ChooseResponse
                            res1={pendingChoices[0]}
                            res2={pendingChoices[1]}
                            onChoose={handleChoice}
                            avatar={person.modelphoto}
                        />
                    )}
                    <div ref={messagesEndRef}></div>
                </div>
                <MessageInput onSendMessage={sendMessageHandler} name={name} loadingHint={loadingHint} disabled={loadingHint} />
            </div>
        </>
    );
}

export default MessageList;
