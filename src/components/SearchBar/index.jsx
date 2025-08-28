import Icon from "../Icon";
import styles from "./SearchBar.module.scss";
import PropTypes from "prop-types";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <Icon name="search" size="sm" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search questions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
