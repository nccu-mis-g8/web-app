import { Link } from "react-router-dom";
import RegisterMainFrame from "./RegisterMainFrame";
import classes from "./RegisterBackground.module.css";
import logo from "../../images/logo.png";

function RegisterBackground() {
    return (
        <div className={classes.container}>
            <div className={classes.outerWrap}>
                <div className={classes.title}>Sign up</div>
                <RegisterMainFrame />
                <Link to="/login" className={classes.backToLogin}>返回登入</Link>
                <img src={logo} alt="langemotion" className={classes.logo} />
            </div>
        </div>
    );
}

export default RegisterBackground;
