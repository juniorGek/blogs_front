/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        Primary_Color:'#FD4B5F',
        BG_Color:'#0F172A',
        Dsha_Font_Color:'#2B2B2B',
        Dsha_Font_2nd_Color:'#7C7C7C',
        BG_Line_Color:'#3F4555',
        White_Color:'#FFFFFF',
        Black_Color:'#000000',
        Font1_Color:'#101010',
        Font2_Color:'#7C7C7C',
        Light_Line_Color:'#E5E5E5'
      }
    },
  },
  plugins: [],
  darkMode: ["class", '[data-theme="dark"]'],

}
