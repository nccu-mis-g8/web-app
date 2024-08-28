import ContactPerson from "./ContactPerson";
import classes from "./ContactList.module.css";

function ContactList() {
    return (
        <>
            <div className={classes.outerContainer}>
                <h2 className={classes.title}>聊天室</h2>
                <ul className={classes.listContainer}>
                    <ContactPerson />
                    <ContactPerson />
                    <ContactPerson />
                </ul>
            </div>
        </>
    );
}

export default ContactList;
