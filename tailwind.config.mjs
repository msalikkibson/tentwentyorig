/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        'md': '24px',
        'xl': '56px',
        'xxl': '64px',
        'lg': '36px',
        'sm': '14px' 
      },
      colors: {
        'primary': '#7A7777', 
        'secondary':'#EEF4F9'
      },
      fontFamily: {
        'work-sans': ['Work Sans', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
