import PropTypes from "prop-types";
import styles from "./TopicTags.module.scss";
import { useGetAllTagsQuery } from "../../api/tagApi";

const TopicTags = ({ activeTag, setActiveTag }) => {
  const { data: tags, isLoading, isError } = useGetAllTagsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tags.</div>;
  if (!tags || tags.length === 0) return <div>No tags found.</div>;

  return (
    <div className={styles.topicTags}>
      {tags.map((tag) => (
        <div
          key={tag.id}
          className={
            activeTag === tag.id ? `${styles.tag} ${styles.active}` : styles.tag
          }
          onClick={() => setActiveTag(tag.id)}
        >
          <span className={styles.name}>{tag.name}</span>
        </div>
      ))}
    </div>
  );
};

TopicTags.propTypes = {
  activeTag: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setActiveTag: PropTypes.func.isRequired,
};

export default TopicTags;
