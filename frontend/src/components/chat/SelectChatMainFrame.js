import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import question from "../../images/question.png";
import ContactPerson from "./ContactPerson";
import AddContactPerson from "./AddContactPerson";
import AddCPMainFrame from "./AddCPMainFrame";
import MessageList from "./MessageList";
import classes from "./SelectChatMainFrame.module.css";

function SelectChatMainFrame() {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

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
            setIsFading(true);

            setTimeout(() => {
                setIsNavigating(true);
            }, 500)

            setTimeout(() => {
                navigate(`/message/${selectedPerson.id}`, {
                    state: { person: selectedPerson },
                });
            }, 1200);
        }
    }

    function viewModalHandler() {
        setShowModal(true);
    }

    function closeModalHandler() {
        setShowModal(false);
    }

    return (
        <div className={classes.outerContainer}>
            {isNavigating && <div className={classes.dummy}>
                <MessageList dummy={isNavigating} dummyName={selectedPerson.name} />
            </div>}
            <div className={`${classes.header} ${isFading ? classes["fade-out"] : classes["fade-in"]}`}>
                <div className={classes.title}>選擇聊天對象</div>
                <img
                    src={question}
                    alt="更多資訊"
                    className={classes.question}
                />
            </div>
            <div className={`${classes.contactList} ${isFading ? classes["fade-out"] : classes["fade-in"]}`}>
                {contactList.map((person, index) => (
                    <ContactPerson
                        key={index}
                        name={person.name}
                        personality={person.personality}
                        isSelected={selectedPerson?.name === person.name}
                        onClick={() => contactClickHandler(person)}
                    />
                ))}
                {contactList.length < 4 && (
                    <AddContactPerson onClick={viewModalHandler} />
                )}
            </div>
            <button
                className={`${classes.button} ${isFading ? classes["fade-out"] : classes["fade-in"]}`}
                disabled={!selectedPerson}
                onClick={startChatHandler}
            >
                開始聊天
            </button>

            {showModal && (
                <div className={classes.modal} onClick={closeModalHandler}>
                    <AddCPMainFrame
                        onClick={(e) => e.stopPropagation()}
                        onClickCloseBtn={closeModalHandler}
                    />
                </div>
            )}
        </div>
    );
}

export default SelectChatMainFrame;
