import classes from "./MessageInput.module.css"
import sendButton from "../../images/sendButton.png"

function MessageInput() {
    return (
        <>
            <div>
                <textarea className={classes.customTextarea} />
            </div>
            <button className={classes.sendButton}>
                <img src={sendButton} alt="送出" width="45px" height="45px" />
            </button>
        </>
    );
}

export default MessageInput;
