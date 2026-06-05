/** @type {import('tailwindcss').Config} */
module.exports = {
  content : ["./src/**/*.{js,jsx,ts,tsx}"],

  theme : {
    extend : {
      colors : {
        watch : {
          bg : "#0c0f14",
          surface : "#151a22",
          panel : "#1c2330",
          border : "#2a3444",
          muted : "#8b95a8",
          gold : "#c9a962",
          "gold-light" : "#e2c878",
          "gold-dark" : "#a08540"
        }
      },

      fontFamily : {
        sans : ["DM Sans", "system-ui", "sans-serif"],
        display : ["Cormorant Garamond", "Georgia", "serif"]
      },

      boxShadow : {
        panel : "0 8px 32px rgba(0, 0, 0, 0.45)",
        gold : "0 0 20px rgba(201, 169, 98, 0.25)"
      }
    }
  },

  plugins : []
};
