import ProblemItem from "../ProblemItem";
import styles from "./ProblemList.module.scss";
import { useGetAllProblemsQuery } from "../../api/problemApi";

const ProblemList = () => {
  const { data: problems, isLoading, isError } = useGetAllProblemsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading problems.</div>;
  if (!problems || problems.length === 0) return <div>No problems found.</div>;

  return (
    <div className={styles.problemList}>
      {problems.map((problem) => (
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

export default ProblemList;
