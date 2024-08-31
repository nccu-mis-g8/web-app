import { useState } from "react";
import ChatRightHeader from "./ChatRightHeader";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import MessageInput from "./MessageInput";
import classes from "./MessageList.module.css";

function MessageList() {
    const [messages, setMessages] = useState([]);

    async function sendMessageHandler(userMessage) {
        setMessages([...messages, { type: "user", text: userMessage }]);
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: "bot", text: "尚未連接API" },
        ]);
    }

    return (
        <>
            <div className={classes.outerContainer}>
                <ChatRightHeader />
                <div className={classes.listContainer}>
                    {messages.map((message, index) =>
                        message.type === "user" ? (
                            <UserMessage key={index} content={message.text} />
                        ) : (
                            <BotMessage key={index} content={message.text} />
                        )
                    )}
                </div>
                <MessageInput onSendMessage={sendMessageHandler} />
            </div>
        </>
    );
}

export default MessageList;
