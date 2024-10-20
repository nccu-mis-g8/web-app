import NavigationBar from "../components/NavigationBar";
import classes from "./Notepad.module.css";

function Notepad() {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.barContainer}>
                    <NavigationBar />
                </div>
                
            </div>
        </>
    );
}

export default Notepad;