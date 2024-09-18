import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import classes from "./LoginMainFrame.module.css"

function LoginMainFrame() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const isFormValid =  username.trim() !== "" && password.trim() !== ""; // 確認ID跟密碼已經輸入了

    async function loginHandler(e) {
        e.preventDefault(); // 阻止表單默認的提交行為

        try {
            
            const response = await fetch(
                "http://127.0.0.1:5001/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "username": username,
                        "password": password
                    }),
                }
            );

            if(response.status === 200) {
                const responseData = await response.json();
        
                // 儲存 Tokens
                console.log("登入成功");
                const access_token = responseData.access_token;
                const refresh_token = responseData.refresh_token;
                localStorage.setItem("accessToken", access_token);
                localStorage.setItem("refreshToken", refresh_token);

                navigate("/"); // 重新導向到主畫面
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

        } catch(error) {
            console.error("Error durning login: ", error);
        }

    }


    return (
        <Form onSubmit={loginHandler} className={classes.formContainer}>
            <div className={classes.inputGroup}>
                <input
                    type="text"
                    className={classes.customPlaceholder}
                    placeholder="帳號"
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={classes.inputGroup}>
                <input
                    type="password"
                    className={classes.customPlaceholder}
                    placeholder="密碼"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className={classes.loginButton} disabled={!isFormValid}>
                登入
            </button>
        </Form>
    );
}

export default LoginMainFrame;
