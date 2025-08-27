/**
 * Theme utilities for managing light/dark mode
 */

export const THEMES = {
    LIGHT: "light",
    DARK: "dark",
    SYSTEM: "system",
};

export const THEME_STORAGE_KEY = "leetcode-ui-theme";

/**
 * Get the current theme from localStorage or default to system
 */
export const getCurrentTheme = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(THEME_STORAGE_KEY) || THEMES.SYSTEM;
    }
    return THEMES.SYSTEM;
};

/**
 * Save theme preference to localStorage
 */
export const saveTheme = (theme) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
};

/**
 * Get the effective theme (resolve system preference)
 */
export const getEffectiveTheme = (theme = getCurrentTheme()) => {
    if (theme === THEMES.SYSTEM) {
        if (typeof window !== "undefined") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches
                ? THEMES.DARK
                : THEMES.LIGHT;
        }
        return THEMES.LIGHT;
    }
    return theme;
};

/**
 * Apply theme to document
 */
export const applyTheme = (theme) => {
    if (typeof document !== "undefined") {
        const effectiveTheme = getEffectiveTheme(theme);
        const root = document.documentElement;

        // Remove existing theme classes
        root.removeAttribute("data-theme");

        // Apply new theme
        if (effectiveTheme === THEMES.DARK) {
            root.setAttribute("data-theme", "dark");
        }
        // Light theme is default, no attribute needed
    }
};

/**
 * Initialize theme system
 */
export const initializeTheme = () => {
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);

    // Listen for system theme changes
    if (typeof window !== "undefined") {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleSystemThemeChange = () => {
            const currentTheme = getCurrentTheme();
            if (currentTheme === THEMES.SYSTEM) {
                applyTheme(THEMES.SYSTEM);
            }
        };

        mediaQuery.addEventListener("change", handleSystemThemeChange);

        // Return cleanup function
        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
    }
};

/**
 * Set theme and persist preference
 */
export const setTheme = (theme) => {
    saveTheme(theme);
    applyTheme(theme);
};
