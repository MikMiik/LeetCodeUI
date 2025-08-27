import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import RightSidebar from "../../components/RightSidebar";
import styles from "./Problem.module.scss";

const Problem = () => {
  return (
    <div className={styles.problem}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <MainContent />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Problem;
