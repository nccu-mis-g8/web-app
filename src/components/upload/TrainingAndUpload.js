import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

    const location = useLocation();
    const { person } = location.state || {};
    console.log(person);
    const name = person ? person.model_original_name : "未命名模型";
    const photo = person ? person.modelphoto : "";
    const modelId = person ? person.model_id : "";
    const modelname = person? person.modelname : "";

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
                    <UploadFileMainFrame viewModal={viewModalHandler} id={modelId} modelName={modelname} />
                ) : (
                    <CheckStatusMainFrame name={name} avatar={photo} id={modelId} />
                )}

                {showModal && (
                    <div className={classes.modal}>
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
