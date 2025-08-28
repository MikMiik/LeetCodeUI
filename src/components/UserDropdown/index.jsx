import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./UserDropdown.module.scss";
import { logout } from "@/services/authService";
import { useDispatch } from "react-redux";
import { removeCurrentUser } from "@/api/auth/authSlice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UserDropdown = ({ userAvatar, userName = "User", onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("system");
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await logout({ refreshToken });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    } else {
      localStorage.removeItem("token");
    }
    if (dispatch && typeof dispatch === "function") {
      dispatch(removeCurrentUser());
    }
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle theme selection
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  const menuItems = [
    {
      id: "settings",
      label: "Settings",
      icon: "cog",
      action: () => console.log("Settings clicked"),
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: "palette",
      isSubmenu: true,
      submenu: [
        { id: "system", label: "System Default", icon: "laptop" },
        { id: "light", label: "Light", icon: "sun" },
        { id: "dark", label: "Dark", icon: "moon" },
      ],
    },
    {
      id: "signout",
      label: "Sign Out",
      icon: "sign-out-alt",
      action: handleLogout,
      danger: true,
    },
  ];

  return (
    <div className={styles.userDropdown} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src={userAvatar || "/user-profile-avatar.png"}
          alt="User avatar"
          className={styles.avatar}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {/* User Info Header */}
          <div className={styles.userInfo}>
            <img
              src={userAvatar || "/user-profile-avatar.png"}
              alt="User avatar"
              className={styles.userAvatar}
            />
            <span className={styles.userName}>{userName}</span>
          </div>

          <div className={styles.separator}></div>

          {/* Menu Items */}
          <div className={styles.menuItems}>
            {menuItems.map((item) => (
              <div key={item.id} className={styles.menuItem}>
                {item.isSubmenu ? (
                  <div className={styles.submenuContainer}>
                    <div className={styles.submenuHeader}>
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={styles.icon}
                      />
                      <span className={styles.label}>{item.label}</span>
                    </div>
                    <div className={styles.submenuItems}>
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.id}
                          className={`${styles.submenuItem} ${
                            selectedTheme === subItem.id ? styles.active : ""
                          }`}
                          onClick={() => handleThemeSelect(subItem.id)}
                        >
                          <FontAwesomeIcon
                            icon={subItem.icon}
                            className={styles.submenuIcon}
                          />
                          <span className={styles.submenuLabel}>
                            {subItem.label}
                          </span>
                          {selectedTheme === subItem.id && (
                            <FontAwesomeIcon
                              icon="check"
                              className={styles.checkmark}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    className={`${styles.menuButton} ${
                      item.danger ? styles.danger : ""
                    }`}
                    onClick={item.action}
                  >
                    <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                    <span className={styles.label}>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
