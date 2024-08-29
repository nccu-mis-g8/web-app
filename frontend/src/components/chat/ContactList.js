import { useState } from "react";
import ContactPerson from "./ContactPerson";
import classes from "./ContactList.module.css";

function ContactList() {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const contacts = [1, 2, 3]; //這邊到時候放傳過來的資料

    return (
        <>
            <div className={classes.outerContainer}>
                <h2 className={classes.title}>聊天室</h2>
                <ul className={classes.listContainer}>
                    {contacts.map((_, index) => (
                        <ContactPerson
                            key={index}
                            isSelected={selectedIndex === index}
                            onClick={() => setSelectedIndex(index)}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ContactList;
