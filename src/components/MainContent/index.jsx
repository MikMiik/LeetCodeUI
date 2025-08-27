import HeroSection from "../HeroSection"
import TopicTags from "../TopicTags"
import CategoryTabs from "../CategoryTabs"
import SearchBar from "../SearchBar"
import ProblemList from "../ProblemList"
import styles from "./MainContent.module.scss"

const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <HeroSection />
      <TopicTags />
      <CategoryTabs />
      <SearchBar />
      <ProblemList />
    </main>
  )
}

export default MainContent
