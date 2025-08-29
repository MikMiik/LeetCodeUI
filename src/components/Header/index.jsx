import { Link } from "react-router-dom";
import Button from "../Button";
import UserDropdown from "../UserDropdown";
import Icon from "../Icon";
import { useTheme } from "../../hooks/useTheme";
import { ROUTES } from "../../configs/routes";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";

const Header = () => {
  const { setTheme } = useTheme();

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };
  const currentUser = useSelector((state) => state.auth?.currentUser);

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
          {currentUser ? (
            <>
              <UserDropdown
                userAvatar={
                  currentUser.avatar || "/src/assets/placeholder-user.jpg"
                }
                userName={currentUser.name || "LeetCode User"}
                onThemeChange={handleThemeChange}
              />
              <Button variant="premium">Premium</Button>
            </>
          ) : (
            <>
              <Button as={Link} to={ROUTES.LOGIN} variant="primary">
                Login
              </Button>
              <Button as={Link} to={ROUTES.REGISTER} variant="secondary">
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
