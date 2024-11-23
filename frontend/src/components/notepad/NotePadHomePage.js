import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NotePadHomePage.module.css";

function NotePadHomePage() {

    const navigate = useNavigate();

    function navigateToRecentlyEvent(time) {
        navigate(`/notepad/event/${time}`);
    }

    return (
        <div className={classes.notePadContainer}>
            <div className={classes.header}>
                <div className={classes.title}>記事本</div>
            </div>
            <div className={classes.mainContent}>
                <svg className={classes.wavyLine} viewBox="0 0 600 200" filter="url(#glow)">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur
                                stdDeviation="3.5"
                                result="coloredBlur"
                            />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <g className={classes.hoverGroup}>
                        <line className={classes.stickDown} x1="50" y1="106" x2="50" y2="192" />
                        <circle className={classes.circle} cx="50" cy="192" r="10" onClick={() => navigateToRecentlyEvent("2020")} />
                    </g>

                    <g className={classes.hoverGroup}>
                        <line className={classes.stickUp} x1="150" y1="62" x2="150" y2="146" />
                        <circle className={classes.circle} cx="150" cy="62" r="10" onClick={() => navigateToRecentlyEvent("2021")} />
                    </g>

                    <g className={classes.hoverGroup}>
                        <line className={classes.stickDown} x1="260" y1="142" x2="260" y2="212" />
                        <circle className={classes.circle} cx="260" cy="212" r="10" onClick={() => navigateToRecentlyEvent("2022")} />
                    </g>

                    <g className={classes.hoverGroup}>
                        <line className={classes.stickUp} x1="380" y1="41" x2="380" y2="127" />
                        <circle className={classes.circle} cx="380" cy="41" r="10" onClick={() => navigateToRecentlyEvent("2023")} />
                    </g>

                    <g className={classes.hoverGroup}>
                        <line className={classes.stickDown} x1="500" y1="137" x2="500" y2="212" />
                        <circle className={classes.circle} cx="500" cy="212" r="10" onClick={() => navigateToRecentlyEvent("Recently")} />
                    </g>

                    <path
                        id="wavePath"
                        d="M0,65 C200,260 350,30 600,180"
                        fill="transparent"
                        stroke="#fffc2f"
                        strokeWidth="3"
                        className={classes.animatedPath}
                    />

                    <text x="85" y="185" textAnchor="middle" className={classes.text}>2020</text>
                    <text x="135" y="40" textAnchor="middle" className={classes.text}>2021</text>
                    <text x="290" y="195" textAnchor="middle" className={classes.text}>2022</text>
                    <text x="395" y="20" textAnchor="middle" className={classes.text}>2023</text>
                    <text x="545" y="190" textAnchor="middle" className={classes.text}>Recently</text>
                </svg>
            </div>
        </div>
    );
}

export default NotePadHomePage;
