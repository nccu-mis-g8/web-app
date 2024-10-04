import classes from "./LoginBackground.module.css";
import { Link } from "react-router-dom";
import LoginMainFrame from "./LoginMainFrame";
import logo from "../../images/logo.png";

function LoginBackground() {
    return (
        <div className={classes.container}>
            <div className={classes.outerWrap}>
                <div className={classes.title}>Login</div>
                <LoginMainFrame />
                <div className={classes.loginBottom}>
                    <Link to="/register" className={classes.register}>
                        註冊帳號
                    </Link>
                    <Link to="/forget_password" className={classes.forgetPW}>
                        忘記密碼?
                    </Link>
                </div>
                <img src={logo} alt="langemotion" className={classes.logo} />
            </div>
        </div>
    );
}

export default LoginBackground;
