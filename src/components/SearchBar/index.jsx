import Icon from "../Icon";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <div className={styles.searchInput}>
                <Icon name="search" size="sm" className={styles.searchIcon} />
                <input type="text" placeholder="Search questions" />
            </div>
            <div className={styles.filters}>
                <button className={styles.filterBtn}>
                    <Icon name="sort" size="sm" />
                </button>
                <button className={styles.filterBtn}>
                    <Icon name="caret-down" size="sm" />
                </button>
                <button className={styles.filterBtn}>
                    <Icon name="bullseye" size="sm" />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
