import styles from "./HomeMainContent.module.scss";
import Icon from "../Icon";

import Button from "../Button";
import {
  useCreateMessageMutation,
  useGetAllMessagesQuery,
} from "@/api/messageApi";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import socketClient from "@/utils/socketClient";

const HomeMainContent = () => {
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const [createMessage] = useCreateMessageMutation();
  const { data: messages = [], refetch } = useGetAllMessagesQuery();
  const chatBodyRef = useRef(null);
  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  const [message, setMessage] = useState("");
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Create message after ensuring conversation exists
    try {
      await createMessage({
        content: message.trim(),
        userId: currentUser.id,
      }).unwrap();

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    const channel = socketClient.subscribe(`forum-leetcode`);

    channel.bind("new-message", () => {
      refetch();
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [refetch]);

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
          <div className={styles.chatBody} ref={chatBodyRef}>
            {messages.length === 0 ? (
              <div className={styles.chatPlaceholder}>
                <Icon name="user" size="sm" /> Hãy đặt câu hỏi hoặc thảo luận
                cùng mọi người!
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.userId === currentUser?.id
                      ? styles.chatMessageRight
                      : styles.chatMessageLeft
                  }
                >
                  <span className={styles.chatUser}>
                    {msg.user?.name || "User"}
                  </span>
                  <span className={styles.chatContent}>{msg.content}</span>
                </div>
              ))
            )}
          </div>
          <form className={styles.chatForm} onSubmit={handleSendMessage}>
            <input
              className={styles.chatInput}
              placeholder="Nhập câu hỏi hoặc bình luận..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="primary" size="sm" type="submit">
              Gửi
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HomeMainContent;
