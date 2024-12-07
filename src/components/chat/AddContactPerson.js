import add_avatar from "../../images/add_avatar.png";
import classes from "./AddContactPerson.module.css";

function AddContactPerson({ onClick }) {
    return (
        <div className={classes.container} onClick={onClick}>
            <img
                src={add_avatar}
                alt="新增聊天對象頭像"
                className={classes.avatar}
            />
            <div className={classes.content}>新增聊天對象</div>
        </div>
    );
}

export default AddContactPerson;
