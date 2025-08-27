import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import HomeMainContent from "../../components/HomeMainContent";
import RightSidebar from "../../components/RightSidebar";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <HomeMainContent />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
