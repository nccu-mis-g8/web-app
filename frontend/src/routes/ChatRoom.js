import NavigationBar from "../components/NavigationBar";
import ContactList from "../components/chat/ContactList";
import MessageList from "../components/chat/MessageList";
import classes from "./ChatRoom.module.css";

function chatRoom() {
    return (
        <>
            <div className={classes.container}>
                    <NavigationBar />
                    <MessageList />
            </div>
        </>
    );
}

export default chatRoom;
