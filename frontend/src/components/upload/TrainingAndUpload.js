import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import goBack_white from "../../images/goBack_white.png";
import UploadFileMainFrame from "./UploadFileMainFrame";
import CheckStatusMainFrame from "./CheckStatusMainFrame";
import StartTrainingHint from "./StartTrainingHint";
import classes from "./TrainingAndUpload.module.css";

function TrainingAndUpload({ dummy }) {
    const [navigationStatus, setNavigationStatus] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [pageSize, setPageSize] = useState(false);

    useEffect(() => {
        // 當組件首次加載時觸發淡入效果
        setPageSize(dummy);
    }, [dummy]);

    const navigate = useNavigate();

    function uploadClickHandler() {
        setNavigationStatus(true);
    }

    function checkClickHandler() {
        setNavigationStatus(false);
    }

    function goBackHandler() {
        navigate("/upload");
    }

    function viewModalHandler() {
        setShowModal(true);
    }

    function closeModalHandler() {
        setShowModal(false);
    }

    return (
        <div className={pageSize ? classes.outerContainerDummy : classes.outerContainer}>
            <div className={classes.header}>
                <img
                    src={goBack_white}
                    className={classes.goBack} 
                    alt="返回"
                    onClick={goBackHandler}
                />
                <div className={classes.title}>訓練模型</div>
            </div>
            <div className={classes.mainFrame}>
                <div className={classes.navigationBtnContainer}>
                    <div
                        className={`${classes.navigationBtn} ${
                            navigationStatus
                                ? classes.navigationBtnSelected
                                : classes.navigationBtnNotSelected
                        }`}
                        onClick={uploadClickHandler}
                    >
                        上傳資料
                    </div>
                    <div
                        className={`${classes.navigationBtn} ${
                            navigationStatus
                                ? classes.navigationBtnNotSelected
                                : classes.navigationBtnSelected
                        }`}
                        onClick={checkClickHandler}
                    >
                        查看進度
                    </div>
                </div>
                {navigationStatus ? (
                    <UploadFileMainFrame viewModal={viewModalHandler} />
                ) : (
                    <CheckStatusMainFrame />
                )}

                {showModal && (
                    <div className={classes.modal} onClick={closeModalHandler}>
                        <StartTrainingHint
                            onClick={(e) => e.stopPropagation()}
                            goCheckStatus={checkClickHandler}
                            closeModal={closeModalHandler}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default TrainingAndUpload;
