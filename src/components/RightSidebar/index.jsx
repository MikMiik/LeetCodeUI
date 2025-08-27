import Calendar from "../Calendar"
import WeeklyPremium from "../WeeklyPremium"
import TrendingCompanies from "../TrendingCompanies"
import styles from "./RightSidebar.module.scss"

const RightSidebar = () => {
  return (
    <aside className={styles.rightSidebar}>
      <Calendar />
      <WeeklyPremium />
      <TrendingCompanies />
    </aside>
  )
}

export default RightSidebar
