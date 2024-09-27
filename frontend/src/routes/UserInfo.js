import NavigationBar from "../components/NavigationBar";
import UserInfoAvatar from "../components/userInfo/UserInfoAvatar";
import classes from "./UserInfo.module.css";

function UserInfo() {
    return (
        <div className={classes.container}>
            <div className={classes.left}>
                <NavigationBar />
            </div>
            <div className={classes.right}>
                <UserInfoAvatar />
            </div>
        </div>
    );
}

export default UserInfo;
