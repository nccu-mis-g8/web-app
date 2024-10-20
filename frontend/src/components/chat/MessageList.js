import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ChatRoomHeader from "./ChatRoomHeader";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import ChooseResponse from "./ChooseResponse";
import MessageInput from "./MessageInput";
import classes from "./MessageList.module.css";

function MessageList({ dummy, dummyName }) {
    const [messages, setMessages] = useState([]);
    const [pageSize, setPageSize] = useState(false);

    useEffect(() => {
        // 當組件首次加載時觸發淡入效果
        setPageSize(dummy);
    }, [dummy]);

    const { id } = useParams();
    const location = useLocation();
    const { person } = location.state || {};

    const name = person ? person.name : dummyName;

    async function sendMessageHandler(userMessage) {
        setMessages([...messages, { type: "user", text: userMessage }]);
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: "bot", text: "尚未連接API" },
        ]);
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
                            <BotMessage key={index} content={message.text} />
                        )
                    )}
                    <ChooseResponse />
                </div>
                <MessageInput onSendMessage={sendMessageHandler} />
            </div>
        </>
    );
}

export default MessageList;
