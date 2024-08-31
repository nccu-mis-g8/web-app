import NavigationBar from "../components/NavigationBar";
import ContactList from "../components/chat/ContactList";
import MessageList from "../components/chat/MessageList";
import classes from "./ChatRoom.module.css";

function chatRoom() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.left}>
                    <NavigationBar />
                </div>
                <div className={classes.mid}>
                    <ContactList />
                </div>
                <div className={classes.right}>
                    <MessageList />
                </div>
            </div>
        </>
    );
}

export default chatRoom;
