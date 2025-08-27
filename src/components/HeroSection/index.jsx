import CourseCard from "../CourseCard"
import styles from "./HeroSection.module.scss"

const HeroSection = () => {
  const courses = [
    {
      title: "LeetCode's Interview Crash Course:",
      subtitle: "System Design for Interviews and Beyond",
      color: "green",
      buttonText: "Start Learning",
    },
    {
      title: "LeetCode's Interview Crash Course:",
      subtitle: "Data Structures and Algorithms",
      color: "purple",
      buttonText: "Start Learning",
    },
    {
      title: "Top Interview Questions",
      subtitle: "",
      color: "blue",
      buttonText: "Get Started",
    },
    {
      title: "JavaScript",
      subtitle: "30 Days",
      description: "Beginner Friendly",
      color: "orange",
      buttonText: "Start Learning",
    },
  ]

  return (
    <section className={styles.heroSection}>
      {courses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </section>
  )
}

export default HeroSection
