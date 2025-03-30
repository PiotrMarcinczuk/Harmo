/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Adjust according to your file structure
  ],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#E689F4",
        "custom-blue": "#0A83E7",
        "form-button-color": "#0A83E7",
        "custom-blue-text": "#1A6AC6",
        "custom-validation-red": "#ff0000",
      },
      backgroundImage: {
        "custom-purple-gradient":
          "linear-gradient(180deg, #E5A5FE, #A682B5, #A463BD)",
        "custom-blue-gradient": "linear-gradient(180deg, #ECF3F8, #84C2EE)",
        "custom-main-gradient": "linear-gradient(180deg, #00ffff, #9171C6)",
        "custom-task-gradient":
          "linear-gradient(180deg, #A46CBA, #956AA6, #6E3C82)",
      },
      backgroundColor: {
        "blue-menu": "#4294F1",
        "event-date": "#c866ae",
        "selected-collaborator": "#b63af9",
        "user-has-event": "#83ee6d",
        "m-1": "#44c6e3",
        "m-2": "#63fbf3",
        "m-3": "#5efbac",
        "m-4": "#6af84e",
        "m-5": "#a8fc26",
        "m-6": "#f76951",
        "m-7": "#fba03f",
        "m-8": "#fee533",
        "m-9": "#da7345",
        "m-11": "#48c69d",
        "m-10": "#a17272",
        "m-12": "#6e74b0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      maxWidth: {
        1732: "1732px",
        1864: "1864px",
        1920: "1920px",
      },
      screens: {
        "800px": "800px",
        "1366px": "1366px",
        "1470px": "1470px",
        "1400px": "1400px",
        xs: "475px",
        "3xl": "1670px",
        "4xl": "1870px",
      },
      borderRadius: {
        md: "0.75rem",
      },
    },
  },
  plugins: [],
};
