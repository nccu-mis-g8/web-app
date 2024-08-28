import classes from "./NavigationBar.module.css";

function NavigationBar() {
    return (
        <div className={classes.barContainer}>
            <img className={classes.avatar} alt=""/>
            <img className={classes.avatar} alt=""/>
            <img className={classes.avatar} alt=""/>
            <img className={classes.logout} alt=""/>
        </div>
    );
}

export default NavigationBar;