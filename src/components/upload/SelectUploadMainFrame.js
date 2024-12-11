import { useState } from "react";
import { useNavigate } from "react-router-dom";
import question from "../../images/question.png";
import ContactPerson from "../chat/ContactPerson";
import AddContactPerson from "../chat/AddContactPerson";
import CreateAndLink from "../chat/CreateAndLink";
import AddCPMainFrame from "../chat/AddCPMainFrame";
import EnterLink from "../chat/EnterLink";
import TrainingAndUpload from "./TrainingAndUpload";
import close_btn from "../../images/close_button.png";
import infoImg3 from "../../images/infoImg3.png";
import classes from "./SelectUploadMainFrame.module.css";

function SelectUploadMainFrame({ modelInfo }) {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showCanNotTrain, setShowCanNotTrain] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
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
            if (selectedPerson.is_shared === true) {
                setShowCanNotTrain(true);
                return;
            }
            setIsFading(true);
            setTimeout(() => {
                setIsNavigating(true);
            }, 500)

            setTimeout(() => {
                navigate(`/upload/${selectedPerson.model_id}`, {
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

    function closeCanNotTrainModalHandler() {
        setShowCanNotTrain(false);
    }

    function viewInfoModalHandler() {
        setShowInfoModal(true);
    }

    function closeInfoModalHandler() {
        setShowInfoModal(false);
    }

    return (
        <div className={classes.outerContainer}>
            {isNavigating && <div className={classes.dummy}>
                <TrainingAndUpload dummy={isNavigating} />
            </div>}
            <div className={`${classes.header} ${isFading ? classes["fade-out"] : classes["fade-in"]}`}>
                <div className={classes.title}>選擇訓練對象</div>
                <div className={classes.infoBtn}>
                    <img
                        src={question}
                        alt="更多資訊"
                        className={classes.question}
                        onClick={viewInfoModalHandler}
                    />
                    <div className={classes.lightRays}>
                        <div className={classes.lightRay}></div>
                        <div className={classes.lightRay}></div>
                        <div className={classes.lightRay}></div>
                        <div className={classes.lightRay}></div>
                        <div className={classes.lightRay}></div>
                    </div>
                </div>
            </div>
            <div className={`${classes.contactList} ${isFading ? classes["fade-out"] : classes["fade-in"]}`}>
                {modelInfo.map((person, index) => (
                    <ContactPerson
                        key={index}
                        modelId={person.model_id}
                        name={person.model_original_name}
                        personality={person.anticipation}
                        photo={person.modelphoto}
                        isSelected={selectedPerson?.model_id === person.model_id}
                        isShared={person.is_shared}
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

            {showCanNotTrain && (
                <div className={classes.modal} onClick={closeCanNotTrainModalHandler}>
                    <div className={classes.canNotTrain} onClick={(e) => e.stopPropagation()}>
                        <div className={classes.closeBtnContainer}>
                            <img
                                src={close_btn}
                                alt="關閉"
                                className={classes.closeBtn}
                                onClick={closeCanNotTrainModalHandler}
                            />
                        </div>
                        <div>分享模型無法進行訓練</div>
                    </div> 
                </div>
            )}

            {showInfoModal && (
                <div
                    className={classes.infoModalOverlay}
                    onClick={closeInfoModalHandler}
                >
                    <div
                        className={classes.infoModalContent}
                        onClick={(e) => e.stopPropagation()} // 防止點擊內容區域觸發關閉
                    >
                        <div className={classes.infoHeader}>
                            <img src={question} alt="更多資訊" className={classes.infoIcon} />
                            <div>系統使用說明 🌟</div>
                        </div>
                        <div className={classes.infoMainContent}>
                        <div className={classes.infoContentContainer}>
                                <ul className={classes.listStyle}>
                                    <li>選擇想訓練的模型，按下【進入訓練資料上傳】跳轉到上傳頁面超簡單！</li>
                                    <li>上傳Line聊天記錄時，記得加上對象的名稱（要跟Line上的名字一樣喔），然後按下【開始訓練】按鈕，模型訓練馬上開始！訓練進度可以到【查看進度】追蹤</li>
                                </ul>
                                <img src={infoImg3} alt="更多資訊用圖3" className={classes.infoImg} />
                            </div>
                            <div>
                                <div className={classes.infoTitle1}>💡小提醒：</div>
                                <ul className={classes.listStyle2}>
                                    <li>分享模型無法進行訓練喔！</li>
                                    <li>我們只會用你的聊天記錄來優化模型，絕對保護你的隱私，讓聊天機器人更像你的朋友～🤝</li>
                                </ul>
                            </div>
                            <div className={classes.infoTitle2}>現在就動手創建屬於你的專屬模型，和它一起進入超療癒的聊天世界吧！🌈</div>
                        </div>
                        <div className={classes.infoBottom}></div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SelectUploadMainFrame;