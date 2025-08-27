import styles from "./Explore.module.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";
import ExploreCard from "./ExploreCard";

const featured = [
  {
    title: "Top Interview Questions",
    subtitle: "Easy Collection",
    chapters: 9,
    items: 48,
    percent: 0,
  },
  {
    title: "Data Structures and Algorithms",
    subtitle: "LeetCode's Interview Crash Course",
    chapters: 13,
    items: 149,
    percent: 0,
  },
  {
    title: "System Design for Interviews and Beyond",
    subtitle: "LeetCode’s Interview Crash Course",
    chapters: 16,
    items: 81,
    percent: 0,
  },
  {
    title: "The LeetCode Beginner's Guide",
    subtitle: "",
    chapters: 4,
    items: 17,
    percent: 0,
  },
];

export default function Explore() {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.mainContent}>
          <h2 className={styles.heading}>LeetCode Explore</h2>
          <section className={styles.section}>
            <h3>Featured</h3>
            <div className={styles.cardRow}>
              {featured.map((item, i) => (
                <ExploreCard key={i} {...item} />
              ))}
            </div>
          </section>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
