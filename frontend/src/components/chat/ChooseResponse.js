import classes from "./ChooseResponse.module.css";
import def_avatar from "../../images/default_avatar.png";

function ChooseResponse() {
    return (
        <div>
            <div className={classes.title}>請選擇更符合期待的回答</div>
            <div className={classes.responseContainer}>
                <div className={classes.response}>
                    <div className={classes.responseHeader}>
                        <img
                            src={def_avatar}
                            alt="頭像"
                            className={classes.avatar}
                        />
                        <div className={classes.responseTitle}>回應1</div>
                    </div>
                    <div className={classes.content}>
                        聽起來酷爆ㄌ！ 這個機器人實際上會怎麼陪伴阿？超好奇耶
                    </div>
                </div>
                <div className={classes.response}>
                    <div className={classes.responseHeader}>
                        <img
                            src={def_avatar}
                            alt="頭像"
                            className={classes.avatar}
                        />
                        <div className={classes.responseTitle}>回應2</div>
                    </div>
                    <div className={classes.content}>
                        哇哇炫炮的 idea ~ 那實際功能是甚麼勒
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChooseResponse;
