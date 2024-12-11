import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, redirect } from "react-router-dom";
import ChatRoomHeader from "./ChatRoomHeader";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import ChooseResponse from "./ChooseResponse";
import MessageInput from "./MessageInput";
import question from "../../images/question.png";
import infoImg4 from "../../images/infoImg4.png";
import { inference, getChatResult } from "../../utils/modelUtils";
import { refresh } from "../../utils/tokenUtils";
import classes from "./MessageList.module.css";

function MessageList({ dummy, dummyName }) {
    const [messages, setMessages] = useState([]);
    const [pageSize, setPageSize] = useState(false);

    // 用於儲存前五筆對話紀錄
    const [conversationHistory, setConversationHistory] = useState([]);

    const [showInfoModal, setShowInfoModal] = useState(false);

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
    const isShared = person ? person.is_shared : "";

    // 輪詢查詢結果
    async function pollChatResult(requestId, userMessage) {
        const interval = 2000; // 每 2 秒檢查一次
        const maxAttempts = 120; // 最多嘗試 30 次（1 分鐘）

        let attempts = 0;
        const poll = async () => {
            if (attempts >= maxAttempts) {
                console.error("Polling timed out");
                return;
            }
            attempts++;

            try {
                const response = await getChatResult(requestId);
                const responseData = await response.json();

                if (response.status === 202) {
                    console.log("Still processing, retrying...");
                    setTimeout(poll, interval);
                } else if (response.status === 200) {
                    console.log("Result received:", responseData);
                    displayChatResult(responseData, userMessage); // 顯示結果
                } else {
                    console.error(
                        "Unexpected status:",
                        response.status,
                        responseData
                    );
                }
            } catch (error) {
                console.error("Error polling result:", error);
            }
        };

        poll();
    }

    function displayChatResult(responseData, userMessage) {
        if (responseData.status === "success") {
            console.log("Chat results:", responseData.result);
            // 在前端顯示對話結果
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
                    let botOutputs = [];
                    botOutputs[0] = results[0].output;
                    botOutputs[1] = results[1].output;
                    setLoadingHint(false);
                    setPendingChoices(botOutputs);
                    console.log(conversationHistory);
                }
        } else {
            console.error("Display error:", responseData.message);
        }
    }

    async function sendMessageHandler(userMessage) {
        setMessages([...messages, { type: "user", text: userMessage }]);
        setLoadingHint(true);

        console.log(conversationHistory);

        const formData = new FormData();
        formData.append("is_shared", String(isShared));
        formData.append("modelname", modelname);
        formData.append("input_text", userMessage);
        formData.append("session_history", JSON.stringify(conversationHistory));

        try {
            const response = await inference(formData);
            const accessToken = localStorage.getItem("accessToken");

            if (response.status === 200) {
                const responseData = await response.json();
                if (responseData.status === "queued") {
                    console.log("Request queued, request_id:", responseData.request_id);
                    pollChatResult(responseData.request_id, userMessage); // 開始輪詢
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
                        if (responseData.status === "queued") {
                            console.log("Request queued, request_id:", responseData.request_id);
                            pollChatResult(responseData.request_id, userMessage); // 開始輪詢
                        }
                    } else if (response.status === 429) {
                        alert("後端伺服器忙碌中，請稍後再試");
                    } 
                } else {
                    // refresh Token過期，重新登入並刪掉 localStorage 裡的東西
                    // alert("refresh Token過期，請重新登入!");
                    localStorage.clear();
                    redirect("/login");
                }
            } else if (response.status === 429) {
                alert("後端伺服器忙碌中，請稍後再試");
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

    function viewInfoModalHandler() {
        setShowInfoModal(true);
    }

    function closeInfoModalHandler() {
        setShowInfoModal(false);
    }

    return (
        <>
            <div
                className={
                    pageSize
                        ? classes.outerContainerDummy
                        : classes.outerContainer
                }
            >
                <ChatRoomHeader
                    name={name}
                    modelName={modelname}
                    viewInfoModal={viewInfoModalHandler}
                />
                <div className={classes.listContainer}>
                    {messages.map((message, index) =>
                        message.type === "user" ? (
                            <UserMessage key={index} content={message.text} />
                        ) : (
                            <BotMessage
                                key={index}
                                content={message.text}
                                avatar={person.modelphoto}
                            />
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
                <MessageInput
                    onSendMessage={sendMessageHandler}
                    name={name}
                    loadingHint={loadingHint}
                    disabled={loadingHint}
                />

                {showInfoModal && (
                    <div
                        className={classes.infoModalOverlay}
                        onClick={closeInfoModalHandler}
                    >
                        <div
                            className={classes.infoModalContent}
                            onClick={(e) => e.stopPropagation()} // 防止點擊內容區域觸發關閉
                        >
                            <div className={classes.infoHeader}>
                                <img
                                    src={question}
                                    alt="更多資訊"
                                    className={classes.infoIcon}
                                />
                                <div>系統使用說明 🌟</div>
                            </div>
                            <div className={classes.infoMainContent}>
                                <div className={classes.infoContentContainer}>
                                    <ul className={classes.listStyle}>
                                        <li>
                                            想讓好友也能體驗你的專屬模型？按下【分享】按鈕，自動複製分享連結，立刻分享快樂！💌
                                        </li>
                                        <li>
                                            記事本功能：到記事本新增事件，讓模型學習更多有趣的回應，讓對話更真實、更貼心～📖✨
                                        </li>
                                        <li>
                                            跟模型聊天時，一次輸入一則訊息，等模型回應後再繼續發送，這樣聊天最流暢！💬
                                        </li>
                                    </ul>
                                    <img
                                        src={infoImg4}
                                        alt="更多資訊用圖4"
                                        className={classes.infoImg}
                                    />
                                </div>
                            </div>
                            <div className={classes.infoBottom}></div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default MessageList;
