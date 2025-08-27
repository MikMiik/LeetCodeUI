import Icon from "../Icon";
import styles from "./WeeklyPremium.module.scss";

const WeeklyPremium = () => {
    const weekDays = ["W1", "W2", "W3", "W4", "W5"];

    return (
        <div className={styles.weeklyPremium}>
            <div className={styles.header}>
                <h3>Weekly Premium</h3>
                <Icon name="info-circle" size="sm" className={styles.info} />
            </div>

            <div className={styles.daysLeft}>
                <span>5 days left!</span>
            </div>

            <div className={styles.weekGrid}>
                {weekDays.map((day, index) => (
                    <div
                        key={day}
                        className={`${styles.weekDay} ${
                            index < 4 ? styles.completed : ""
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className={styles.redeem}>
                <Icon name="gift" size="sm" className={styles.redeemIcon} />
                <span>0 Redeem</span>
            </div>

            <div className={styles.rules}>
                <span>Rules</span>
            </div>
        </div>
    );
};

export default WeeklyPremium;
