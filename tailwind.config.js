/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./components/**/*.html",
    "./assets/js/**/*.js",
    "./data/translations.json"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Brand palette derived from the logo (OKLCH ramps, see the colour-system review).
      // ink = structure/text, ocean = interactive only, signal = logo orange, one spot per screen.
      colors: {
        ink: {  // structure · text · surfaces, tinted toward the logo navy
          50: '#eff6fd',
          100: '#e2e9f0',
          200: '#cbd2d9',
          300: '#aeb5bc',
          400: '#90969c',
          500: '#707c87',
          600: '#5a656f',
          700: '#46515c',
          800: '#343e48',
          900: '#232d36',
          950: '#121c24',
        },
        ocean: {  // links · buttons · focus · selected state
          50: '#eef6fe',
          100: '#d7ebfe',
          200: '#b3d5f6',
          300: '#8ab9e6',
          400: '#5c9bd4',
          500: '#2a7fc3',
          600: '#0f67a7',
          700: '#0d5387',
          800: '#094069',
          900: '#052d4c',
          950: '#021c32',
        },
        signal: {  // logo orange — primary CTA or one key highlight per screen
          50: '#fff3e8',
          100: '#fee2cb',
          200: '#fecca1',
          300: '#feb16a',
          400: '#f09025',
          500: '#d27903',
          600: '#ad6200',
          700: '#884d01',
          800: '#693b03',
          900: '#4c2904',
          950: '#301903',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'Noto Sans SC', 'Noto Sans JP', 'sans-serif'],
        display: ['Space Grotesk', 'Noto Sans KR', 'Noto Sans SC', 'Noto Sans JP', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in'
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    }
  },
  plugins: []
}
