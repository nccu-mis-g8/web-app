﻿import { Link } from "react-router-dom";
import RegisterMainFrame from "./RegisterMainFrame";
import classes from "./RegisterBackground.module.css";

function RegisterBackground() {
    return (
        <div className={classes.container}>
            <div className={classes.outerWrap}>
                <div className={classes.title}>註冊</div>
                <RegisterMainFrame />
                <Link to="/login" className={classes.backToLogin}>返回登入</Link>
            </div>
        </div>
    );
}

export default RegisterBackground;
