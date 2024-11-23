import classes from "./CreateAndLink.module.css";

function CreateAndLink({ onClick, closeModal, viewCreateModal, viewLinkModal }) {

    function showCreateModalHandler() {
        closeModal();
        viewCreateModal();
    }

    function showLinkModalHandler() {
        closeModal();
        viewLinkModal();
    }

    return (
        <div className={classes.container} onClick={onClick}>
            <div className={classes.title}>新建模型或匯入模型連結</div>
            <div className={classes.btnGroup}>
                <button className={classes.linkBtn} onClick={showLinkModalHandler} >輸入連結</button>
                <button className={classes.createBtn} onClick={showCreateModalHandler} >新建模型</button>
            </div>
        </div>
    );
}

export default CreateAndLink;