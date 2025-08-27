import Icon from "../Icon";
import styles from "./TrendingCompanies.module.scss";

const TrendingCompanies = () => {
    const companies = [
        { name: "Meta", count: 1290 },
        { name: "Uber", count: 490 },
        { name: "Amazon", count: 1887 },
        { name: "Google", count: 2000 },
        { name: "TikTok", count: 433 },
        { name: "Oracle", count: 312 },
        { name: "Apple", count: 544 },
        { name: "Microsoft", count: 1237 },
    ];

    return (
        <div className={styles.trendingCompanies}>
            <div className={styles.header}>
                <h3>Trending Companies</h3>
                <div className={styles.navigation}>
                    <button className={styles.navBtn}>
                        <Icon name="chevron-left" size="sm" />
                    </button>
                    <button className={styles.navBtn}>
                        <Icon name="chevron-right" size="sm" />
                    </button>
                </div>
            </div>

            <div className={styles.searchBar}>
                <Icon name="search" size="sm" className={styles.searchIcon} />
                <input type="text" placeholder="Search for a company..." />
            </div>

            <div className={styles.companiesList}>
                {companies.map((company) => (
                    <div key={company.name} className={styles.companyItem}>
                        <div className={styles.companyInfo}>
                            <div className={styles.companyLogo}>
                                <img
                                    src={`/abstract-geometric-shapes.png?height=24&width=24&query=${company.name} logo`}
                                    alt={`${company.name} logo`}
                                />
                            </div>
                            <span className={styles.companyName}>
                                {company.name}
                            </span>
                        </div>
                        <span className={styles.companyCount}>
                            {company.count}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingCompanies;
