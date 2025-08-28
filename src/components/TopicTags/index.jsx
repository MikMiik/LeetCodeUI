import PropTypes from "prop-types";
import styles from "./TopicTags.module.scss";
import { useGetAllTagsQuery } from "../../api/tagApi";

const TopicTags = ({ activeTags, setActiveTags }) => {
  const { data: tags, isLoading, isError } = useGetAllTagsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tags.</div>;
  if (!tags || tags.length === 0) return <div>No tags found.</div>;

  const handleTagClick = (tagId) => {
    if (activeTags.includes(tagId)) {
      setActiveTags(activeTags.filter((id) => id !== tagId));
    } else {
      setActiveTags([...activeTags, tagId]);
    }
  };

  return (
    <div className={styles.topicTags}>
      {tags.map((tag) => (
        <div
          key={tag.id}
          className={
            activeTags.includes(tag.id)
              ? `${styles.tag} ${styles.active}`
              : styles.tag
          }
          onClick={() => handleTagClick(tag.id)}
        >
          <span className={styles.name}>{tag.name}</span>
        </div>
      ))}
    </div>
  );
};

TopicTags.propTypes = {
  activeTags: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  setActiveTags: PropTypes.func.isRequired,
};

export default TopicTags;
