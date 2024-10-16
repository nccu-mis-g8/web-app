import { useState } from "react";
import { useNavigate } from "react-router-dom";
import question from "../../images/question.png";
import ContactPerson from "./ContactPerson";
import AddContactPerson from "./AddContactPeroson";
import classes from "./SelectChatMainFrame.module.css";

function SelectChatMainFrame() {
    const [selectedPerson, setSelectedPerson] = useState(null);

    const navigate = useNavigate();

    const contactList = [
        { id: 1, name: "平台", personality: "預設" },
        { id: 2, name: "子安", personality: "測試" },
        { id: 3, name: "ZK", personality: "測試2" },
    ];

    function contactClickHandler(person) {
        setSelectedPerson(person);
    }

    function startChatHandler() {
        if (selectedPerson) {
            navigate(`/message/${selectedPerson.id}`, {
                state: { person: selectedPerson },
            });
        }
    }

    return (
        <div className={classes.outerContainer}>
            <div className={classes.header}>
                <div className={classes.title}>選擇聊天對象</div>
                <img
                    src={question}
                    alt="更多資訊"
                    className={classes.question}
                />
            </div>
            <div className={classes.contactList}>
                {contactList.map((person, index) => (
                    <ContactPerson
                        key={index}
                        name={person.name}
                        personality={person.personality}
                        isSelected={selectedPerson?.name === person.name}
                        onClick={() => contactClickHandler(person)}
                    />
                ))}
                {contactList.length < 4 && <AddContactPerson />}
            </div>
            <button className={classes.button} disabled={!selectedPerson} onClick={startChatHandler}>
                開始聊天
            </button>
        </div>
    );
}

export default SelectChatMainFrame;
