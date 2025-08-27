import { useState, useEffect } from "react";
import {
    getCurrentTheme,
    setTheme,
    initializeTheme,
    getEffectiveTheme,
} from "../utils/theme";

/**
 * Custom hook for managing theme state and switching
 */
export const useTheme = () => {
    const [theme, setThemeState] = useState(getCurrentTheme());
    const [effectiveTheme, setEffectiveTheme] = useState(getEffectiveTheme());

    useEffect(() => {
        // Initialize theme system
        const cleanup = initializeTheme();

        // Update effective theme
        setEffectiveTheme(getEffectiveTheme(theme));

        // Listen for system preference changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemChange = () => {
            const currentTheme = getCurrentTheme();
            if (currentTheme === "system") {
                setEffectiveTheme(getEffectiveTheme(currentTheme));
            }
        };

        mediaQuery.addEventListener("change", handleSystemChange);

        return () => {
            if (cleanup) cleanup();
            mediaQuery.removeEventListener("change", handleSystemChange);
        };
    }, [theme]);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        setThemeState(newTheme);
        setEffectiveTheme(getEffectiveTheme(newTheme));
    };

    return {
        theme,
        effectiveTheme,
        setTheme: changeTheme,
        isDark: effectiveTheme === "dark",
        isLight: effectiveTheme === "light",
    };
};
