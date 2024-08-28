import classes from "./ChatRightHeader.module.css";

function ChatRightHeader() {
    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <img className={classes.avatar} alt="" />
                <span className={classes.name}>名字</span>
            </div>
        </div>
    );
}

export default ChatRightHeader;
