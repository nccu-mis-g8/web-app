import classes from "./BotMessage.module.css"
import logo from "../../images/logo.png";

function BotMessage({ content }) {
    return (
        <div className={classes.messageContainer}>
            <img src={logo} className={classes.avatar} alt=""/>
            <div className={classes.messageBubble}>{content}</div>
        </div>
    );
}

export default BotMessage;