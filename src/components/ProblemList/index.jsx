import ProblemItem from "../ProblemItem"
import styles from "./ProblemList.module.scss"

const ProblemList = () => {
  const problems = [
    {
      id: "3197",
      title: "Find the Minimum Area to Cover All Ones II",
      acceptance: "57.0%",
      difficulty: "Hard",
    },
    {
      id: "2618",
      title: "Check if Object Instance of Class",
      acceptance: "28.4%",
      difficulty: "Med.",
    },
    {
      id: "2619",
      title: "Array Prototype Last",
      acceptance: "74.5%",
      difficulty: "Easy",
    },
    {
      id: "2620",
      title: "Counter",
      acceptance: "82.2%",
      difficulty: "Easy",
    },
    {
      id: "2621",
      title: "Sleep",
      acceptance: "87.5%",
      difficulty: "Easy",
    },
    {
      id: "2622",
      title: "Cache With Time Limit",
      acceptance: "75.8%",
      difficulty: "Med.",
    },
    {
      id: "2623",
      title: "Memoize",
      acceptance: "64.3%",
      difficulty: "Med.",
    },
  ]

  return (
    <div className={styles.problemList}>
      {problems.map((problem) => (
        <ProblemItem key={problem.id} {...problem} />
      ))}
    </div>
  )
}

export default ProblemList
