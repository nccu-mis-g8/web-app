import classes from "./BotMessage.module.css"
import bot_avatar from "../../images/bot_avatar.png";

function BotMessage({ content }) {
    return (
        <div className={classes.messageContainer}>
            <img src={bot_avatar} className={classes.avatar} alt=""/>
            <div className={classes.messageBubble}>{content}</div>
        </div>
    );
}

export default BotMessage;