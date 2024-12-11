import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import infoImg1 from "../../images/infoImg1.png";
import infoImg2 from "../../images/infoImg2.png";
import question from "../../images/question.png";
import ContactPerson from "./ContactPerson";
import AddContactPerson from "./AddContactPerson";
import CreateAndLink from "./CreateAndLink";
import AddCPMainFrame from "./AddCPMainFrame";
import EnterLink from "./EnterLink";
import MessageList from "./MessageList";
import classes from "./SelectChatMainFrame.module.css";

function SelectChatMainFrame({ modelInfo }) {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    
    if (modelInfo.message === "此使用者沒有任何訓練的模型") {
        modelInfo = [];
    }

    const navigate = useNavigate();

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
                navigate(`/message/${selectedPerson.model_id}`, {
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

    function viewInfoModalHandler() {
        setShowInfoModal(true);
    }

    function closeInfoModalHandler() {
        setShowInfoModal(false);
    }

    return (
        <div className={classes.outerContainer}>
            {isNavigating && <div className={classes.dummy}>
                <MessageList dummy={isNavigating} dummyName={selectedPerson.name} />
            </div>}
            <div className={`${classes.header} ${isFading ? classes["fade-out"] : classes["fade-in"]}`}>
                <div className={classes.title}>選擇聊天對象</div>
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
                {modelInfo.length < 4 && (
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
                                    <li>點選想聊天的模型，按下【開始聊天】就能進入充滿情感的聊天室啦！🎉</li>
                                    <li>在模型卡片上按下左鍵，能決定是否要刪除這位模型喔 (無法刪除分享模型)～🗑️</li>
                                    <li>想要更多新的聊天體驗？使用【新增聊天對象】創建屬於你的模型，每位用戶最多可以創建4個模型，超多選擇！✨</li>
                                </ul>
                                <img src={infoImg1} alt="更多資訊用圖1" className={classes.infoImg} />
                            </div>
                            <div className={classes.infoContentContainer}>
                                <img src={infoImg2} alt="更多資訊用圖2" className={classes.infoImg} />
                                <ul className={classes.listStyle}>
                                    <div className={classes.infoTitle1}>創建模型的兩種方式：</div>
                                    <li>新建模型：自己命名，輸入專屬個性留言，還能挑選可愛頭像，讓模型更貼近你想要的樣子！🎨</li>
                                    <li>輸入分享連結：快速加入其他用戶訓練的模型，像魔法一樣方便！快速體驗情感聊天室~</li>
                                </ul>
                            </div>
                            <div>
                                <div className={classes.infoTitle2}>❗小提醒：</div>
                                <ul className={classes.listStyle2}>
                                    <li>剛新建的模型需要先到【訓練資料】上傳資料並完成訓練，才能跟專屬模型暢聊～如果跳過訓練，系統會用基礎模型聊天哦</li>
                                    <li>用分享連結建立的模型可以直接開聊，完全免訓練，超快速！🚀</li>
                                </ul>
                            </div>
                        </div>
                        <div className={classes.infoBottom}></div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SelectChatMainFrame;
