import NavigationBar from "../components/NavigationBar";
import TrainingAndUpload from "../components/upload/TrainingAndUpload";
import classes from "./TrainingPage.module.css";

function TrainingPage() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <TrainingAndUpload />
            </div>
        </>
    );
}

export default TrainingPage;
