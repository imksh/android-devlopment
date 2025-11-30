/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
        floatUp: {
          "0%": { transform: "translateY(50%)", opacity: "0" },
          "50%": { transform: "translateY(-50%)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        dice: {
          "0%": { transform: "rotate(0deg)"},
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        bounce: "bounce 1s infinite",
        "float-up": "floatUp 1s ease-in-out 1s  forwards infinite",
        "dice1": "dice 0.3s ease-in-out forwards infinite",
        "dice2": "dice 0.3s ease-in-out forwards infinite",
      },
    },
  },
  plugins: [],
};
