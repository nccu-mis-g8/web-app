import NavigationBar from "../components/NavigationBar";
import NotePadHomePage from "../components/notepad/NotePadHomePage";
import classes from "./Notepad.module.css";

function Notepad() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                <NotePadHomePage />
            </div>
        </>
    );
}

export default Notepad;