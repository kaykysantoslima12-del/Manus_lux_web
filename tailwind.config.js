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
        neon: {
          cyan: "#00E0FF",
          magenta: "#E91E63",
          orange: "#FF8C00",
          green: "#00D9A3",
          "orange-red": "#FF6B35",
          dark: "#0A0E27",
          darker: "#05070F",
          // Novas Cores
          purple: "#8A2BE2", // Roxo
          red: "#FF0000", // Vermelho
          pink: "#FF69B4", // Rosa
          yellow: "#FFFF00", // Amarelo (para gradientes)
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 224, 255, 0.5)",
        "glow-magenta": "0 0 20px rgba(233, 30, 99, 0.5)",
        "glow-orange": "0 0 20px rgba(255, 140, 0, 0.5)",
        "glow-green": "0 0 20px rgba(0, 217, 163, 0.5)",
        "glow-cyan-lg": "0 0 30px rgba(0, 224, 255, 0.6)",
        "glow-magenta-lg": "0 0 30px rgba(233, 30, 99, 0.6)",
        "glow-orange-lg": "0 0 30px rgba(255, 140, 0, 0.6)",
        "glow-green-lg": "0 0 30px rgba(0, 217, 163, 0.6)",
        // Novos Glows
        "glow-purple": "0 0 20px rgba(138, 43, 226, 0.5)",
        "glow-red": "0 0 20px rgba(255, 0, 0, 0.5)",
        "glow-pink": "0 0 20px rgba(255, 105, 180, 0.5)",
      },
      backdropBlur: {
        glass: "15px",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.98)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

