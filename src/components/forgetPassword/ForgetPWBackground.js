import classes from "./ForgetPWBackground.module.css";
import { Link } from "react-router-dom";
import ForgetPWMainFrame from "./ForgetPWMainFrame";
import logo from "../../images/logo.png";

function ForgetPWBackground() {
    return (
        <div className={classes.container}>
            <div className={classes.outerWrap}>
                <div className={classes.title}>Reset Password</div>
                <ForgetPWMainFrame />
                <Link to="/login" className={classes.backToLogin}>返回登入</Link>
                <img src={logo} alt="langemotion" className={classes.logo} />
            </div>
        </div>
    );
}

export default ForgetPWBackground;
