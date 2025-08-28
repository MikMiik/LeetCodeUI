import HeroSection from "../HeroSection";
import TopicTags from "../TopicTags";
import CategoryTabs from "../CategoryTabs";
import SearchBar from "../SearchBar";
import ProblemList from "../ProblemList";
import styles from "./MainContent.module.scss";

import { useState } from "react";

const MainContent = () => {
  const [activeTags, setActiveTags] = useState([]);
  const [activeDifficulty, setActiveDifficulty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main className={styles.mainContent}>
      <HeroSection />
      <TopicTags activeTags={activeTags} setActiveTags={setActiveTags} />
      <CategoryTabs
        activeDifficulty={activeDifficulty}
        setActiveDifficulty={setActiveDifficulty}
      />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProblemList
        activeTags={activeTags}
        activeDifficulty={activeDifficulty}
        searchTerm={searchTerm}
      />
    </main>
  );
};

export default MainContent;
