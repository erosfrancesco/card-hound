/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f1115",
        surface: "#161922",
        "surface-variant": "#1d2130",
        "surface-container-low": "#161922",
        "surface-container": "#1b1f2e",
        "surface-container-high": "#202536",
        "surface-container-highest": "#252a3d",
        outline: "#353c52",
        "outline-variant": "#2a3042",
        primary: "#7ea3ff",
        "primary-container": "#283a66",
        "on-primary": "#001a47",
        secondary: "#9fc2ff",
        error: "#ffb4a2",
        "on-error": "#410002",
        "on-surface": "#e6e9f2",
        "on-surface-variant": "#a3aac2",
        scrim: "#00000080",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        "elev-1": '0 1px 3px 0 rgba(0,0,0,0.3), 0 1px 2px -1px rgba(0,0,0,0.3)',
        "elev-2": '0 3px 8px 0 rgba(0,0,0,0.34), 0 1px 3px 0 rgba(0,0,0,0.3)',
        "elev-3": '0 6px 16px 0 rgba(0,0,0,0.4), 0 2px 6px 0 rgba(0,0,0,0.3)',
        "elev-4": '0 10px 24px 0 rgba(0,0,0,0.45), 0 3px 8px 0 rgba(0,0,0,0.3)',
        "elev-5": '0 16px 32px 0 rgba(0,0,0,0.5), 0 4px 10px 0 rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
};