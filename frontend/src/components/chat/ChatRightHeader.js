import classes from "./ChatRightHeader.module.css";
import bot_avatar from "../../images/bot_avatar.png";

function ChatRightHeader() {
    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <img src={bot_avatar} className={classes.avatar} alt="" />
                <span className={classes.name}>名字</span>
            </div>
        </div>
    );
}

export default ChatRightHeader;
