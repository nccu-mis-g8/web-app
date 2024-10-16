import def_avatar from "../../images/default_avatar.png";
import classes from "./ContactPerson.module.css";

function ContactPerson({ name, personality, isSelected, onClick }) {
    return (
        <div
            className={`${classes.container} ${
                isSelected ? classes.isSelected : ""
            }`}
            onClick={onClick}
        >
            <img
                src={def_avatar}
                alt="預設平台頭像"
                className={classes.avatar}
            />
            <div className={classes.content}>
                <div className={classes.name}>姓名： {name}</div>
                <div className={classes.personality}>
                    個性留言： {personality}
                </div>
            </div>
        </div>
    );
}

export default ContactPerson;
