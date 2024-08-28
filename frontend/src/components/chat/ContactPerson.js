import classes from "./ContactPerson.module.css";

function ContactPerson() {
    return (
        <li className={classes.container}>
            <img className={classes.avatar} alt=""/>
            <div>
                <div className={classes.name}>名字</div>
                <div className={classes.content}>內容內容內容</div>
            </div>
        </li>
    );
}

export default ContactPerson;