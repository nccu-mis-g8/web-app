import { useState } from "react";
import { useNavigate, Form } from "react-router-dom";
import classes from "./ForgetPWMainFrame.module.css";
import mailImg from "../../images/mail.png";

function ForgetPWMainFrame() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function mailChangeHandler(e) {
        setEmail(e.target.value);
        setError("");
    }

    async function forgetPWHandler(e) {
        e.preventDefault(); // 阻止表單默認的提交行為

        try {
            const response = await fetch(
                "https://nccu-group-8.work/auth/forgotPassword",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                }
            );

            if (response.status === 200) {
                navigate("/forget_password/reset_password", {
                    state: { email: email }
                });

                console.log("驗證碼傳送成功");
            } else if (response.status === 400) {
                const responseData = await response.json();
                const error = responseData.message;
                setError(error);
                console.log("錯誤訊息" + error);
            } else {
                const responseData = await response.json();
                const error = responseData.message;
                console.error(error);
                alert("發生錯誤，請重新整理後再試一次");
            }
        } catch (error) {
            console.error("Error durning send verification code: ", error);
        }
    }

    return (
        <Form className={classes.outerContainer}>
            <div className={classes.inputContainer}>
                <img src={mailImg} alt="信箱" className={classes.mailImg} />
                <input
                    type="mail"
                    className={classes.mailInput}
                    placeholder="信箱"
                    onChange={mailChangeHandler}
                />
            </div>
            <div className={classes.error}>{error}</div>
            <button
                className={classes.button}
                onClick={forgetPWHandler}
                disabled={!email}
            >
                傳送驗證碼
            </button>
        </Form>
    );
}

export default ForgetPWMainFrame;
