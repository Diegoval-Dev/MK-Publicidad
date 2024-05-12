/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-text': '#030303',
        'color-symbols': '#262932',
        'calendar-days': '#716A6E',
        'calendar-selectday': '#6FB74B',
        'color-tittlesAdmin': '#3B6B27',
        'color-prices':'#426B1F',
        'top-banners': '#B8B3B6',
        'color-componentes': '#FAFAF5',
        'color-backgroundText': '#FFFFFF',
        'color-searcher': '#D9D9D9',
        'color-contorno': '#E6E6E6',
        'color-contornoButtons': '#000000',
        'color-shadow': '#7a7a7a',
        'color-button': '#99A3A4',
        'color-table': '#F9F9F9',
      },
    },
  },
  plugins: [],
}

