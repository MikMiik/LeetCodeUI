import { useState } from "react";
import Icon from "../Icon";
import styles from "./CategoryTabs.module.scss";

const CategoryTabs = () => {
    const [activeTab, setActiveTab] = useState("JavaScript");

    const tabs = [
        { name: "All Topics", icon: "clipboard-list" },
        { name: "Algorithms", icon: "cog" },
        { name: "Database", icon: "database" },
        { name: "Shell", icon: "terminal" },
        { name: "Concurrency", icon: "bolt" },
        { name: "JavaScript", icon: "code", text: "JS" },
        { name: "pandas", icon: "chart-bar" },
    ];

    return (
        <div className={styles.categoryTabs}>
            {tabs.map((tab) => (
                <button
                    key={tab.name}
                    className={`${styles.tab} ${
                        activeTab === tab.name ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab(tab.name)}
                >
                    <span className={styles.icon}>
                        {tab.text ? (
                            tab.text
                        ) : (
                            <Icon name={tab.icon} size="sm" />
                        )}
                    </span>
                    <span className={styles.name}>{tab.name}</span>
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;
