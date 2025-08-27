import Icon from "../Icon";
import styles from "./TopicTags.module.scss";

const TopicTags = () => {
    const topics = [
        { name: "Array", count: 1977 },
        { name: "String", count: 809 },
        { name: "Hash Table", count: 722 },
        { name: "Dynamic Programming", count: 609 },
        { name: "Math", count: 607 },
        { name: "Sorting", count: 467 },
        { name: "Greedy", count: 430 },
        { name: "Depth-First Search", count: null, expandable: true },
    ];

    return (
        <div className={styles.topicTags}>
            {topics.map((topic, index) => (
                <div key={index} className={styles.tag}>
                    <span className={styles.name}>{topic.name}</span>
                    {topic.count && (
                        <span className={styles.count}>{topic.count}</span>
                    )}
                    {topic.expandable && (
                        <span className={styles.expand}>
                            Expand <Icon name="chevron-down" size="sm" />
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TopicTags;
