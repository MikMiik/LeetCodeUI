import Icon from "../Icon";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <Icon name="search" size="sm" className={styles.searchIcon} />
        <input type="text" placeholder="Search questions" />
      </div>
    </div>
  );
};

export default SearchBar;
