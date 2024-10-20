import NavigationBar from "../components/NavigationBar";
import SelectChatMainFrame from "../components/chat/SelectChatMainFrame";
import classes from "./SelectChat.module.css";

function SelectChat() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <SelectChatMainFrame />
            </div>
        </>
    );
}

export default SelectChat;
