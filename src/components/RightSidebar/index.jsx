import WeeklyPremium from "../WeeklyPremium";
import TrendingCompanies from "../TrendingCompanies";
import styles from "./RightSidebar.module.scss";
import MuiCalendar from "../MuiCalendar";

const RightSidebar = () => {
  return (
    <aside className={styles.rightSidebar}>
      <MuiCalendar />
      <WeeklyPremium />
      <TrendingCompanies />
    </aside>
  );
};

export default RightSidebar;
