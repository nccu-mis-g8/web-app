import classes from "./BotMessage.module.css"

function BotMessage({ content }) {
    return (
        <div className={classes.messageContainer}>
            <img className={classes.avatar} alt=""/>
            <div className={classes.messageBubble}>{content}</div>
        </div>
    );
}

export default BotMessage;