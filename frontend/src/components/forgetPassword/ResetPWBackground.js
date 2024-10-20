import classes from "./ResetPWBackground.module.css";
import { Link } from "react-router-dom";
import ResetPWMainFrame from "./ResetPWMainFrame";
import logo from "../../images/logo.png";

function ResetPWBackground() {
    return (
        <div className={classes.container}>
            <div className={classes.outerWrap}>
                <div className={classes.title}>Reset Password</div>
                <ResetPWMainFrame />
                <Link to="/login" className={classes.backToLogin}>
                    返回登入
                </Link>
                <img src={logo} alt="langemotion" className={classes.logo} />
            </div>
        </div>
    );
}

export default ResetPWBackground;
