import { Link } from "react-router-dom";
import Button from "../Button";
import UserDropdown from "../UserDropdown";
import Icon from "../Icon";
import { useTheme } from "../../hooks/useTheme";
import { ROUTES } from "../../configs/routes";
import styles from "./Header.module.scss";

const Header = () => {
  const { setTheme } = useTheme();

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  // Lấy pathname để set active nav
  const pathname = window.location.pathname;
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button className={styles.backBtn}>
            <Icon name="arrow-left" size="sm" />
          </button>
          <nav className={styles.nav}>
            <Link
              to={ROUTES.HOME}
              className={`${styles.navItem} ${
                pathname === ROUTES.HOME ? styles.active : ""
              }`}
            >
              Home
            </Link>
            <Link
              to={ROUTES.PROBLEMS}
              className={`${styles.navItem} ${
                pathname === ROUTES.PROBLEMS ? styles.active : ""
              }`}
            >
              Problems
            </Link>
          </nav>
        </div>
        <div className={styles.right}>
          <div className={styles.notifications}>
            <Icon name="bell" size="sm" />
          </div>
          <div className={styles.streak}>
            <Icon name="fire" size="sm" /> 0
          </div>
          <UserDropdown
            userAvatar="/user-profile-avatar.png"
            userName="LeetCode User"
            onThemeChange={handleThemeChange}
          />
          <Button variant="premium">Premium</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
