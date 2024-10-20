import NavigationBar from "../components/NavigationBar";
import SelectUploadMainFrame from "../components/upload/SelectUploadMainFrame";
import classes from "./SelectUpload.module.css";

function Upload() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <SelectUploadMainFrame />
            </div>
        </>
    );
}

export default Upload;
