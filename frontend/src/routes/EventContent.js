import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import EventContentMainFrame from "../components/notepad/EventContentMainFrame";
import classes from "./EventContent.module.css";

function EventContent() {

    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <EventContentMainFrame />
            </div>
        </>
    );
}

export default EventContent;