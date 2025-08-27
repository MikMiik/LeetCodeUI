/**
 * FontAwesome configuration and icon mapping
 */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    // Navigation & Actions
    faArrowLeft,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faSearch,
    faSort,
    faBell,
    faFire,
    faFile,
    faBars,
    faCheck,
    faStar,
    faInfoCircle,
    faLock,

    // Settings & System
    faCog,
    faPalette,
    faSignOutAlt,
    faLaptop,
    faSun,
    faMoon,

    // Categories & Topics
    faClipboardList,
    faDatabase,
    faTerminal,
    faBolt,
    faChartBar,
    faDollarSign,
    faCode,
    faTimes,
    faCaretDown,
    faBullseye,
    faBook,
    faGraduationCap,
    faGift,
} from "@fortawesome/free-solid-svg-icons";

// Add all icons to the library
library.add(
    // Navigation & Actions
    faArrowLeft,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faSearch,
    faSort,
    faBell,
    faFire,
    faFile,
    faBars,
    faCheck,
    faStar,
    faInfoCircle,
    faLock,

    // Settings & System
    faCog,
    faPalette,
    faSignOutAlt,
    faLaptop,
    faSun,
    faMoon,

    // Categories & Topics
    faClipboardList,
    faDatabase,
    faTerminal,
    faBolt,
    faChartBar,
    faDollarSign,
    faCode,
    faTimes,
    faCaretDown,
    faBullseye,
    faBook,
    faGraduationCap,
    faGift
);

/**
 * Icon mapping from current emoji/symbols to FontAwesome
 */
export const ICON_MAPPING = {
    // Navigation
    "←": "arrow-left",
    "‹": "chevron-left",
    "›": "chevron-right",
    "▼": "chevron-down",

    // Search & Filter
    "🔍": "search",
    "↕️": "sort",

    // Notifications & Status
    "🔔": "bell",
    "🔥": "fire",
    "📄": "file",
    "||||": "bars",
    "✓": "check",
    "⭐": "star",
    ℹ️: "info-circle",

    // Settings & Theme
    "⚙️": "cog",
    "🎨": "palette",
    "🚪": "sign-out-alt",
    "💻": "laptop",
    "☀️": "sun",
    "🌙": "moon",

    // Categories
    "📋": "clipboard-list",
    "🗄️": "database",
    $: "dollar-sign",
    "⚡": "bolt",
    "📊": "chart-bar",
};

/**
 * Get FontAwesome icon name from emoji/symbol
 */
export const getIconName = (emoji) => {
    return ICON_MAPPING[emoji] || "question-circle";
};

/**
 * Common icon configurations
 */
export const ICON_CONFIGS = {
    small: { size: "sm" },
    medium: { size: "1x" },
    large: { size: "lg" },
    navigation: { size: "sm", fixedWidth: true },
    button: { size: "sm" },
    header: { size: "1x" },
};
