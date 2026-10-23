export const THEME_KEY = "rounak-theme";

// Inline <head> script: use the saved theme, else the device setting, before first paint.
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;
