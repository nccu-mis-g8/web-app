import { redirect, useLoaderData } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import CreateNewEvent from "../components/notepad/CreateNewEvent";
import classes from "./CreateEvent.module.css";
import { refresh } from "../utils/tokenUtils";
import { getAllModel } from "../utils/modelUtils";

function CreateEvent() {

    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <CreateNewEvent />
            </div>
        </>
    );
}

export default CreateEvent;
