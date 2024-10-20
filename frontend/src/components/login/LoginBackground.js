import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginBackground.module.css";
import LoginMainFrame from "./LoginMainFrame";
import logo from "../../images/logo.png";

function LoginBackground() {
    const [isExpanding, setIsExpanding] = useState(false);

    const navigate = useNavigate();

    function loginSuccessHandler() {
        // 當登入成功後，觸發動畫
        setIsExpanding(true);

        // 設置延遲，與動畫時間匹配，然後進行頁面跳轉
        setTimeout(() => {
            navigate("/");
            console.log("動畫結束，跳轉到主頁");
        }, 800); // 與動畫時間一致
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.outerWrap} ${isExpanding ? classes.expand : ""}`}>
                <div className={classes.title}>Login</div>
                <LoginMainFrame onLoginSuccess={loginSuccessHandler} />
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
