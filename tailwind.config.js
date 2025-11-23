/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          blue: "#007AFF",
          purple: "#AF52DE",
          orange: "#FF9500",
          cyan: "#5AC8FA",
          pink: "#FF2D55",
          green: "#34C759",
          indigo: "#5856D6",
          teal: "#30B0C7",
        },
        bg: {
          light: "#F2F2F7",
          dark: "#1C1C1E",
          gradient: {
            start: "#E5E5EA",
            end: "#F2F2F7",
          },
        },
        text: {
          primary: "#000000",
          secondary: "#8E8E93",
          tertiary: "#C7C7CC",
          inverse: "#FFFFFF",
        },
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, #1E3A8A 0%, #7C3AED 50%, #EC4899 100%)',
        'gradient-glass-dark': 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)',
        'gradient-blue': 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
        'gradient-purple': 'linear-gradient(135deg, #AF52DE 0%, #5856D6 100%)',
        'gradient-orange': 'linear-gradient(135deg, #FF9500 0%, #FF2D55 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #5AC8FA 0%, #30B0C7 100%)',
        'gradient-pink': 'linear-gradient(135deg, #FF2D55 0%, #AF52DE 100%)',
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        "glass-lg": "0 12px 48px 0 rgba(31, 38, 135, 0.2)",
        "glass-hover": "0 16px 64px 0 rgba(31, 38, 135, 0.25)",
        "inner-glass": "inset 0 1px 0 0 rgba(255, 255, 255, 0.5)",
      },
      backdropBlur: {
        glass: "20px",
        "glass-lg": "30px",
      },
      borderRadius: {
        "glass": "20px",
        "glass-lg": "24px",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
