import classes from "./BotMessage.module.css"
import logo from "../../images/logo.png";

function BotMessage({ content, avatar }) {
    return (
        <div className={classes.messageContainer}>
            <img src={avatar} className={classes.avatar} alt=""/>
            <div className={classes.messageBubble}>{content}</div>
        </div>
    );
}

export default BotMessage;