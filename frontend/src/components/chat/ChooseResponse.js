import classes from "./ChooseResponse.module.css";
import def_avatar from "../../images/default_avatar.png";

function ChooseResponse({ res1, res2, onChoose, avatar }) {
    return (
        <div>
            <div className={classes.title}>請選擇更符合期待的回答</div>
            <div className={classes.responseContainer}>
                <div className={classes.response} onClick={() => onChoose(res1)}>
                    <div className={classes.responseHeader}>
                        <img
                            src={avatar}
                            alt="頭像"
                            className={classes.avatar}
                        />
                        <div className={classes.responseTitle}>回應1</div>
                    </div>
                    <div className={classes.content}>
                        {res1}
                    </div>
                </div>
                <div className={classes.response} onClick={() => onChoose(res2)}>
                    <div className={classes.responseHeader}>
                        <img
                            src={avatar}
                            alt="頭像"
                            className={classes.avatar}
                        />
                        <div className={classes.responseTitle}>回應2</div>
                    </div>
                    <div className={classes.content}>
                        {res2}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChooseResponse;
