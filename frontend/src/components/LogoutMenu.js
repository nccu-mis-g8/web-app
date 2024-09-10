import { useNavigate } from "react-router-dom";

import classes from "./LogoutMenu.module.css";

function LogoutMenu({ cancelLogout }) {

    const navigate = useNavigate();

    async function confirmLogout() {
        try {
            const access_token = localStorage.getItem("accessToken");
            
            const response = await fetch(
                "http://127.0.0.1:5001/auth/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token,
                    },
                }
            );

            if (response.status === 200) {
                console.log("登出成功");
            } else {
                const responseData = await response.json();
                const error = responseData.message;
                console.error(error);
            }

        } catch(error) {
            console.error("Error durning logout: ", error);
        }

        navigate("/login");
    }

    return (
        <div className={classes.menuContainer}>
            <div className={classes.hint}>是否確認登出?</div>
            <div className={classes.buttonContainer}>
                <button className={classes.cancelButton} onClick={cancelLogout}>取消</button>
                <button className={classes.confirmButton} onClick={confirmLogout}>確認</button>
            </div>
        </div>
    );
}

export default LogoutMenu;
