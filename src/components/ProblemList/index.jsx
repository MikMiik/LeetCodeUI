import PropTypes from "prop-types";
import ProblemItem from "../ProblemItem";
import styles from "./ProblemList.module.scss";
import { useGetAllProblemsQuery } from "../../api/problemApi";

const ProblemList = ({ activeTag }) => {
  const { data: problems, isLoading, isError } = useGetAllProblemsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading problems.</div>;
  if (!problems || problems.length === 0) return <div>No problems found.</div>;

  // Lọc theo tag nếu có
  const filteredProblems = activeTag
    ? problems.filter(
        (problem) =>
          Array.isArray(problem.tags) &&
          problem.tags.some((tag) => tag.id === activeTag)
      )
    : problems;

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
  activeTag: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProblemList;
