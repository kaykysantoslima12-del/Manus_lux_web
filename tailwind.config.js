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
          purple: "#8B5CF6",
          pink: "#EC4899",
          blue: "#3B82F6",
          dark: "#0A0E27",
          darker: "#05070F",
        },
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #00E0FF 0%, #8B5CF6 50%, #EC4899 100%)',
        'gradient-cyan-purple': 'linear-gradient(135deg, #00E0FF 0%, #8B5CF6 100%)',
        'gradient-purple-pink': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'gradient-orange-red': 'linear-gradient(135deg, #FF8C00 0%, #EF4444 100%)',
        'gradient-cyan-green': 'linear-gradient(135deg, #00E0FF 0%, #00D9A3 100%)',
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 224, 255, 0.6), 0 0 40px rgba(0, 224, 255, 0.3)",
        "glow-magenta": "0 0 20px rgba(233, 30, 99, 0.6), 0 0 40px rgba(233, 30, 99, 0.3)",
        "glow-orange": "0 0 20px rgba(255, 140, 0, 0.6), 0 0 40px rgba(255, 140, 0, 0.3)",
        "glow-green": "0 0 20px rgba(0, 217, 163, 0.6), 0 0 40px rgba(0, 217, 163, 0.3)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.3)",
        "glow-cyan-lg": "0 0 30px rgba(0, 224, 255, 0.8), 0 0 60px rgba(0, 224, 255, 0.4)",
        "glow-magenta-lg": "0 0 30px rgba(233, 30, 99, 0.8), 0 0 60px rgba(233, 30, 99, 0.4)",
        "glow-orange-lg": "0 0 30px rgba(255, 140, 0, 0.8), 0 0 60px rgba(255, 140, 0, 0.4)",
        "glow-green-lg": "0 0 30px rgba(0, 217, 163, 0.8), 0 0 60px rgba(0, 217, 163, 0.4)",
        "glow-purple-lg": "0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)",
        "glow-pink-lg": "0 0 30px rgba(236, 72, 153, 0.8), 0 0 60px rgba(236, 72, 153, 0.4)",
      },
      backdropBlur: {
        glass: "15px",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
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
