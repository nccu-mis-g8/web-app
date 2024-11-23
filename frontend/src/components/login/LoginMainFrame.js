import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import mail from "../../images/mail.png";
import passwordImg from "../../images/password.png";
import openEye from "../../images/openEye.png";
import closeEye from "../../images/closeEye.png";
import classes from "./LoginMainFrame.module.css";

function LoginMainFrame({ onLoginSuccess }) {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [showPasswordState, setShowPasswordState] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const isFormValid = account.trim() !== "" && password.trim() !== ""; // 確認ID跟密碼已經輸入了

    function accountChangeHandler(e) {
        setAccount(e.target.value);
        setErrorMessage("");
    }

    function passwordChangeHandler(e) {
        setPassword(e.target.value);
        setErrorMessage("");
    }

    function togglePasswordVisibility() {
        setShowPasswordState(!showPasswordState);
    }

    async function loginHandler(e) {
        e.preventDefault(); // 阻止表單默認的提交行為

        try {
            const response = await fetch("https://nccu-group-8.work/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: account,
                    password: password,
                }),
            });

            if (response.status === 200) {
                const responseData = await response.json();

                // 儲存 Tokens 及必要資訊
                // console.log("登入成功");

                onLoginSuccess();

                const accessToken = responseData.access_token;
                const refreshToken = responseData.refresh_token;
                const userId = responseData.user_id;
                const lastName = responseData.lastname;
                const firstName = responseData.firstname;
                const photo = responseData.photo;
                const email = responseData.email;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("userId", userId);
                localStorage.setItem("lastName", lastName);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("email", email);
                localStorage.setItem("photo", photo);

            } else if (response.status === 401) {
                const responseData = await response.json();
                const error = responseData.message;
                setErrorMessage(error);
                console.log("錯誤訊息" + error);
            } else {
                const responseData = await response.json();
                const error = responseData.message;
                console.error(error);
                alert("發生錯誤，請重新整理後再試一次");
            }
        } catch (error) {
            console.error("Error durning login: ", error);
        }
    }

    return (
        <Form onSubmit={loginHandler} className={classes.formContainer}>
            <div className={classes.inputGroup}>
                <img src={mail} className={classes.inputImg} alt="信箱" />
                <input
                    type="email"
                    className={classes.customPlaceholder}
                    placeholder="信箱"
                    autoComplete="account"
                    onChange={accountChangeHandler}
                />
            </div>
            <div className={classes.inputGroup2}>
                <img
                    src={passwordImg}
                    className={classes.inputImg}
                    alt="密碼"
                />
                <input
                    type={showPasswordState ? "text" : "password"}
                    className={classes.customPlaceholder}
                    placeholder="密碼"
                    autoComplete="current-password"
                    onChange={passwordChangeHandler}
                />
                <img
                    src={showPasswordState ? openEye : closeEye}
                    className={classes.eyeIcon}
                    onClick={togglePasswordVisibility}
                    alt="隱藏密碼"
                />
            </div>
            <div className={classes.error}>{errorMessage}</div>
            <button className={classes.loginButton} disabled={!isFormValid}>
                登入
            </button>
        </Form>
    );
}

export default LoginMainFrame;
