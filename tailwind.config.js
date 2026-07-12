/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF2F8",
          100: "#D6E0EE",
          200: "#AEC1DD",
          300: "#7E9BC6",
          400: "#4E75AF",
          500: "#2A5591",
          600: "#1B4B91",
          700: "#123870",
          800: "#0B2545",
          900: "#071931",
          950: "#040F1E"
        },
        royal: {
          500: "#2F6FE0",
          600: "#14509E",
          700: "#0F3E7A"
        },
        ink: {
          DEFAULT: "#0A0A0C",
          800: "#17181C",
          600: "#3A3D45"
        },
        paper: {
          DEFAULT: "#F7F8FA",
          100: "#FFFFFF",
          200: "#EEF1F5",
          300: "#E4E9EF"
        },
        steel: {
          400: "#8894A6",
          500: "#5B6B82",
          600: "#465269"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      backgroundImage: {
        "grid-lines": "linear-gradient(rgba(11,37,69,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11,37,69,0.06) 1px, transparent 1px)"
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,12,0.06), 0 8px 24px -12px rgba(11,37,69,0.18)"
      }
    },
  },
  plugins: [],
};
