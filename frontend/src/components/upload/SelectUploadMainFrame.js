import { useState } from "react";
import { useNavigate } from "react-router-dom";
import question from "../../images/question.png";
import ContactPerson from "../chat/ContactPerson";
import AddContactPerson from "../chat/AddContactPerson";
import CreateAndLink from "../chat/CreateAndLink";
import AddCPMainFrame from "../chat/AddCPMainFrame";
import EnterLink from "../chat/EnterLink";
import TrainingAndUpload from "./TrainingAndUpload";
import classes from "./SelectUploadMainFrame.module.css";

function SelectUploadMainFrame({ modelInfo }) {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    const navigate = useNavigate();

    if (modelInfo.message === "此使用者沒有任何訓練的模型") {
        modelInfo = [];
    }

    function contactClickHandler(person) {
        setSelectedPerson(person);
    }

    function startUploadHandler() {
        if (selectedPerson) {
            setIsFading(true);
            setTimeout(() => {
                setIsNavigating(true);
            }, 500)

            setTimeout(() => {
                navigate(`/upload/${selectedPerson.id}`, {
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

    function viewCreateModalHandler() {
        setShowCreateModal(true);
    }

    function closeCreateModalHandler() {
        setShowCreateModal(false);
    }

    function viewLinkModalHandler() {
        setShowLinkModal(true);
    }

    function closeLinkModalHandler() {
        setShowLinkModal(false);
    }

    return (
        <div className={classes.outerContainer}>
            {isNavigating && <div className={classes.dummy}>
                <TrainingAndUpload dummy={isNavigating} />
            </div>}
            <div className={`${classes.header} ${isFading ? classes["fade-out"] : classes["fade-in"]}`}>
                <div className={classes.title}>選擇訓練對象</div>
                <img
                    src={question}
                    alt="更多資訊"
                    className={classes.question}
                />
            </div>
            <div className={`${classes.contactList} ${isFading ? classes["fade-out"] : classes["fade-in"]}`}>
                {modelInfo.map((person, index) => (
                    <ContactPerson
                        key={index}
                        name={person.model_original_name}
                        personality={person.anticipation}
                        photo={person.modelphoto}
                        isSelected={selectedPerson?.id === person.id}
                        onClick={() => contactClickHandler(person)}
                    />
                ))}
                {modelInfo.length < 4 && (<AddContactPerson onClick={viewModalHandler} />)}
            </div>
            <button className={`${classes.button} ${isFading ? classes["fade-out"] : classes["fade-in"]}`} disabled={!selectedPerson} onClick={startUploadHandler}>
                進入訓練資料上傳
            </button>
                
            {showModal && (
                <div className={classes.modal} onClick={closeModalHandler}>
                    <CreateAndLink
                        onClick={(e) => e.stopPropagation()}
                        closeModal={closeModalHandler}
                        viewCreateModal={viewCreateModalHandler}
                        viewLinkModal={viewLinkModalHandler}
                    />
                </div>
            )}

            {showLinkModal && (
                <div className={classes.modal} onClick={closeLinkModalHandler}>
                    <EnterLink
                        onClick={(e) => e.stopPropagation()}
                        onClickCloseBtn={closeLinkModalHandler}
                    />
                </div>
            )}

            {showCreateModal && (
                <div className={classes.modal} onClick={closeCreateModalHandler}>
                    <AddCPMainFrame
                        onClick={(e) => e.stopPropagation()}
                        onClickCloseBtn={closeCreateModalHandler}
                    />
                </div>
            )}
        </div>
    );
}

export default SelectUploadMainFrame;