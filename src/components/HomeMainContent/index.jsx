import styles from "./HomeMainContent.module.scss";
import Icon from "../Icon";

import Button from "../Button";

const HomeMainContent = () => {
  return (
    <main className={styles.mainContent}>
      <section className={styles.introSection}>
        <h1 className={styles.title}>
          <Icon name="bolt" size="lg" className={styles.icon} /> LeetCode UI
        </h1>
        <p className={styles.slogan}>
          Nền tảng luyện tập thuật toán, mô phỏng phỏng vấn, phát triển kỹ năng
          lập trình hiện đại.
        </p>
        <ul className={styles.features}>
          <li>
            • Giao diện đẹp, hỗ trợ dark mode, trải nghiệm như LeetCode quốc tế
          </li>
          <li>• Thư viện bài tập đa dạng, cập nhật liên tục</li>
          <li>• Thảo luận, hỏi đáp, chia sẻ kinh nghiệm cùng cộng đồng</li>
        </ul>
        <Button
          variant="primary"
          size="lg"
          className={styles.ctaBtn}
          onClick={() => (window.location.href = "/problems")}
        >
          Bắt đầu luyện tập
        </Button>
      </section>
      <section className={styles.chatSection}>
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <Icon name="comments" size="sm" /> Chat cộng đồng
          </div>
          <div className={styles.chatBody}>
            <div className={styles.chatPlaceholder}>
              <Icon name="user" size="sm" /> Hãy đặt câu hỏi hoặc thảo luận cùng
              mọi người!
            </div>
          </div>
          <form className={styles.chatForm}>
            <input
              className={styles.chatInput}
              placeholder="Nhập câu hỏi hoặc bình luận..."
              disabled
            />
            <Button variant="primary" size="sm" disabled>
              Gửi
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HomeMainContent;
