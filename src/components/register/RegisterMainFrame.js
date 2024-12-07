import { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import nameInput from "../../images/nameInput.png";
import mail from "../../images/mail.png";
import passwordImg from "../../images/password.png";
import checkPasswordImg from "../../images/checkPassword.png";
import openEye from "../../images/openEye.png";
import closeEye from "../../images/closeEye.png";
import classes from "./RegisterMainFrame.module.css";

function RegisterMainFrame() {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [accountError, setAccountError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [checkPasswordError, setCheckPasswordError] = useState("");
    // for password
    const [showPasswordState, setShowPasswordState] = useState(false);
    // for check password
    const [showPasswordState2, setShowPasswordState2] = useState(false);

    const navigate = useNavigate();
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (lastName && firstName && account && password && checkPassword) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [lastName, firstName, account, password, checkPassword]);

    function accountChangeHandler(e) {
        setAccount(e.target.value);
        setAccountError("");
    }
    
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

    function togglePasswordVisibility() {
        setShowPasswordState(!showPasswordState);
    }

    function togglePasswordVisibility2() {
        setShowPasswordState2(!showPasswordState2);
    }

    async function submitHandler(e) {
        e.preventDefault();

        if (!emailRegex.test(account)) {
            setAccountError("請輸入有效的信箱");
            return
        }

        if (!passwordPattern.test(password)) {
            setPasswordError("密碼不符合格式");
            return
        }

        if (password !== checkPassword) {
            setCheckPasswordError("二次密碼與密碼不一致");
            return
        }

        try {
            const response = await fetch("https://nccu-group-8.work/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: account,
                    firstname: firstName,
                    lastname: lastName,
                    password: password,
                }),
            });

            if (response.status === 200) {
                console.log("註冊成功");
                alert("註冊成功");
                navigate("/login"); // 重新導向到登入頁面
            } else if (response.status === 400) {
                // 電子郵件已被使用
                const responseData = await response.json();
                const error = responseData.message;
                setAccountError(error);
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
        <Form className={classes.formContainer} onSubmit={submitHandler}>
            <div className={classes.nameGroup}>
                <div className={classes.lastNameInput}>
                    <img src={nameInput} alt="name" className={classes.inputImg} />
                    <input
                        placeholder="姓氏"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className={classes.firstNameInput}>
                    <img src={nameInput} alt="name" className={classes.inputImg} />
                    <input
                        placeholder="名字"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
            </div>
            <div className={classes.errorMessage}>{accountError}</div>
            <div className={classes.inputGroup}>
                <img src={mail} className={classes.inputImg} alt="信箱" />
                <input
                    placeholder="信箱"
                    type="email"
                    onChange={accountChangeHandler}
                />
            </div>
            <div className={classes.errorMessage}>{passwordError}</div>
            <div className={classes.inputGroup}>
                <img
                    src={passwordImg}
                    className={classes.inputImg}
                    alt="密碼"
                />
                <input
                    placeholder="密碼請由8位以上字母和數字組成"
                    type={showPasswordState ? "text" : "password"}
                    onChange={passwordChangeHandler}
                />
                <img
                    src={showPasswordState ? openEye : closeEye}
                    className={classes.eyeIcon}
                    onClick={togglePasswordVisibility}
                    alt="隱藏密碼"
                />
            </div>
            <div className={classes.errorMessage}>{checkPasswordError}</div>
            <div className={classes.inputGroup}>
                <img
                    src={checkPasswordImg}
                    className={classes.inputImg}
                    alt="確認密碼"
                />
                <input
                    placeholder="請再次輸入密碼"
                    type={showPasswordState2 ? "text" : "password"}
                    onChange={checkPasswordChangeHandler}
                />
                <img
                    src={showPasswordState2 ? openEye : closeEye}
                    className={classes.eyeIcon}
                    onClick={togglePasswordVisibility2}
                    alt="隱藏密碼"
                />
            </div>
            <button className={classes.registerButton} disabled={!isButtonEnabled}>
                送出
            </button>
        </Form>
    );
}

export default RegisterMainFrame;
