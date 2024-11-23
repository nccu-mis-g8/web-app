import NavigationBar from "../components/NavigationBar";
import CheckEvent from "../components/notepad/CheckEvent";
import classes from "./ChatRoom.module.css";

function Event() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <CheckEvent />
            </div>
        </>
    )
}

export default Event;