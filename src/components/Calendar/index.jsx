import Icon from "../Icon";
import styles from "./Calendar.module.scss";

const Calendar = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = currentDate.getDate();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(
            <div
                key={day}
                className={`${styles.day} ${
                    day === today ? styles.today : ""
                } ${day === 23 ? styles.highlighted : ""}`}
            >
                {day}
            </div>
        );
    }

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <h3>Day {today}</h3>
                <span className={styles.date}>11.03.10 left</span>
                <button className={styles.closeBtn}>
                    <Icon name="times" size="sm" />
                </button>
            </div>

            <div className={styles.monthHeader}>
                <button className={styles.navBtn}>
                    <Icon name="chevron-left" size="sm" />
                </button>
                <span className={styles.monthYear}>
                    {monthNames[currentMonth]} {currentYear}
                </span>
                <button className={styles.navBtn}>
                    <Icon name="chevron-right" size="sm" />
                </button>
            </div>

            <div className={styles.weekDays}>
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <div key={index} className={styles.weekDay}>
                        {day}
                    </div>
                ))}
            </div>

            <div className={styles.daysGrid}>{days}</div>
        </div>
    );
};

export default Calendar;
