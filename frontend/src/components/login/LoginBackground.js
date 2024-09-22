import classes from "./LoginBackground.module.css";
import { Link } from "react-router-dom";
import LoginMainFrame from "./LoginMainFrame";

function LoginBackground() {
    return (
        <div className={classes.container}>
            <div className={classes.outerWrap}>
                <div className={classes.title}>Login</div>
                <LoginMainFrame />
                <Link to="/register" className={classes.register}>註冊</Link>
            </div>
        </div>
    );
}

export default LoginBackground;
