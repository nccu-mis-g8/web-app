import { useState, useEffect } from "react";
import { useNavigate, useLocation, Form } from "react-router-dom";
import passwordImg from "../../images/password.png";
import checkPasswordImg from "../../images/checkPassword.png";
import codeImg from "../../images/verification_code.png";
import openEye from "../../images/openEye.png";
import closeEye from "../../images/closeEye.png";
import classes from "./ResetPWMainFrame.module.css";

function ResetPWMainFrame() {
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [code, setCode] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [checkPasswordError, setCheckPasswordError] = useState("");
    const [codeError, setCodeError] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    // for password
    const [showPasswordState, setShowPasswordState] = useState(false);
    // for check password
    const [showPasswordState2, setShowPasswordState2] = useState(false);

    const navigate = useNavigate();
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const location = useLocation();
    const { email } = location.state || "";

    useEffect(() => {
        if (password && checkPassword && code) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [password, checkPassword, code]);

    function passwordChangeHandler(e) {
        setPassword(e.target.value);
        setPasswordError("");
        setCheckPasswordError("");
    }

    function checkPasswordChangeHandler(e) {
        setCheckPassword(e.target.value);
        setPasswordError("");
        setCheckPasswordError("");
    }

    function codeChangeHandler(e) {
        setCode(e.target.value);
        setCodeError("");
    }

    function togglePasswordVisibility() {
        setShowPasswordState(!showPasswordState);
    }

    function togglePasswordVisibility2() {
        setShowPasswordState2(!showPasswordState2);
    }

    async function resetPWHandler() {
        if (!passwordPattern.test(password)) {
            setPasswordError("密碼不符合格式");
            return
        }

        if (password !== checkPassword) {
            setCheckPasswordError("二次密碼與密碼不一致");
            return
        }

        try {
            const response = await fetch(
                "https://nccu-group-8.work/auth/resetPassword",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password1: password,
                        password2: checkPassword,
                        verificationCode: code,
                    }),
                }
            );

            if (response.status === 200) {
                navigate("/login");

                alert("成功更新密碼");
                console.log("密碼更改成功");
            } else if (response.status === 400) {
                setCodeError("驗證碼錯誤");
            } else {
                const responseData = await response.json();
                const error = responseData.message;
                console.error(error);
                alert("發生錯誤，請重新整理後再試一次");
            }
        } catch (error) {
            console.error("Error durning reset password: ", error);
        }
    }

    return (
        <Form className={classes.outerContainer}>
            <div className={classes.inputContainer}>
                <img
                    src={passwordImg}
                    alt="密碼"
                    className={classes.inputImg}
                />
                <input
                    type={showPasswordState ? "text" : "password"}
                    className={classes.mailInput}
                    placeholder="密碼請由8位以上字母和數字組成"
                    onChange={passwordChangeHandler}
                />
                <img
                    src={showPasswordState ? openEye : closeEye}
                    className={classes.eyeIcon}
                    onClick={togglePasswordVisibility}
                    alt="隱藏密碼"
                />
            </div>
            <div className={classes.error}>{passwordError}</div>
            <div className={classes.inputContainer}>
                <img
                    src={checkPasswordImg}
                    alt="確認密碼"
                    className={classes.inputImg}
                />
                <input
                    type={showPasswordState2 ? "text" : "password"}
                    className={classes.mailInput}
                    placeholder="請再次輸入新密碼"
                    onChange={checkPasswordChangeHandler}
                />
                <img
                    src={showPasswordState2 ? openEye : closeEye}
                    className={classes.eyeIcon}
                    onClick={togglePasswordVisibility2}
                    alt="隱藏密碼"
                />
            </div>
            <div className={classes.error}>{checkPasswordError}</div>
            <div className={classes.inputContainer}>
                <img
                    src={codeImg}
                    alt="驗證碼"
                    className={classes.inputImg}
                />
                <input
                    type="text"
                    className={classes.mailInput}
                    placeholder="驗證碼"
                    onChange={codeChangeHandler}
                />
            </div>
            <div className={classes.error}>{codeError}</div>
            <button className={classes.button} onClick={resetPWHandler} disabled={!isButtonEnabled}>
                更改密碼
            </button>
        </Form>
    );
}

export default ResetPWMainFrame;
