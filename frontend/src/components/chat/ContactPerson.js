import classes from "./ContactPerson.module.css";

function ContactPerson({ isSelected, onClick }) {
    return (
        <li
            className={`${classes.container} ${
                isSelected ? classes.selected : ""
            }`}
            onClick={onClick}
        >
            <img className={classes.avatar} alt="" />
            <div>
                <div className={classes.name}>名字</div>
                <div className={classes.content}>內容內容內容</div>
            </div>
        </li>
    );
}

export default ContactPerson;
