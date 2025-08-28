import HeroSection from "../HeroSection";
import TopicTags from "../TopicTags";
import CategoryTabs from "../CategoryTabs";
import SearchBar from "../SearchBar";
import ProblemList from "../ProblemList";
import styles from "./MainContent.module.scss";

import { useState } from "react";

const MainContent = () => {
  const [activeTag, setActiveTag] = useState(null);
  return (
    <main className={styles.mainContent}>
      <HeroSection />
      <TopicTags activeTag={activeTag} setActiveTag={setActiveTag} />
      <CategoryTabs />
      <SearchBar />
      <ProblemList activeTag={activeTag} />
    </main>
  );
};

export default MainContent;
