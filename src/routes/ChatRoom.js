import NavigationBar from "../components/NavigationBar";
import MessageList from "../components/chat/MessageList";
import classes from "./ChatRoom.module.css";

function ChatRoom() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <MessageList />
            </div>
        </>
    );
}

export default ChatRoom;
