import PropTypes from "prop-types";
import ProblemItem from "../ProblemItem";
import styles from "./ProblemList.module.scss";
import { useGetAllProblemsQuery } from "../../api/problemApi";

const ProblemList = ({ activeTags, activeDifficulty, searchTerm }) => {
  const { data: problems, isLoading, isError } = useGetAllProblemsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading problems.</div>;
  if (!problems || problems.length === 0) return <div>No problems found.</div>;

  // Lọc theo nhiều tag, độ khó và search title nếu có
  let filteredProblems = problems;
  if (activeTags && activeTags.length > 0) {
    filteredProblems = filteredProblems.filter(
      (problem) =>
        Array.isArray(problem.tags) &&
        activeTags.every((tagId) =>
          problem.tags.some((tag) => tag.id === tagId)
        )
    );
  }
  if (activeDifficulty) {
    filteredProblems = filteredProblems.filter(
      (problem) =>
        problem.difficulty &&
        problem.difficulty.toLowerCase() === activeDifficulty
    );
  }
  if (searchTerm && searchTerm.trim() !== "") {
    const lowerSearch = searchTerm.trim().toLowerCase();
    filteredProblems = filteredProblems.filter(
      (problem) =>
        problem.title && problem.title.toLowerCase().includes(lowerSearch)
    );
  }

  return (
    <div className={styles.problemList}>
      {filteredProblems.map((problem) => (
        <ProblemItem
          key={problem.id}
          id={problem.id}
          title={problem.title}
          difficulty={problem.difficulty}
          tags={problem.tags}
        />
      ))}
    </div>
  );
};

ProblemList.propTypes = {
  activeTags: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  activeDifficulty: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  searchTerm: PropTypes.string.isRequired,
};

export default ProblemList;
