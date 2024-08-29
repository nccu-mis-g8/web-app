import classes from "./NavigationBar.module.css";
import logout from "../images/logout.png";

function NavigationBar() {
    return (
        <div className={classes.barContainer}>
            <img className={classes.avatar} alt=""/>
            <img className={classes.avatar} alt=""/>
            <img className={classes.avatar} alt=""/>
            <img src={logout} className={classes.logout} alt="登出"/>
        </div>
    );
}

export default NavigationBar;