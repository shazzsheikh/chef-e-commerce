/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // React files ka path yahan do
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006699",
        secondary: "#339966",
        "gray-theme": "#f5f5f5",
      },
    },
  },
  plugins: [],
};
