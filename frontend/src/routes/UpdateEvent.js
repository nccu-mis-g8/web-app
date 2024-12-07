import NavigationBar from "../components/NavigationBar";
import UpdateEventMainFrame from "../components/notepad/UpdateEventMainFrame";
import classes from "./UpdateEvent.module.css";

function UpdateEvent() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <UpdateEventMainFrame />
            </div>
        </>
    );
}

export default UpdateEvent;