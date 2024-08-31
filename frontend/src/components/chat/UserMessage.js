import classes from "./UserMessage.module.css";

function UserMessage({content}) {
    return (
        <div className={classes.messageContainer}>
            <div className={classes.messageBubble}>{content}</div>
        </div>
    );
}

export default UserMessage;