/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#F63049',
          100: '#FCECEF',
          200: '#F8D3D9',
          300: '#F5A9B5',
          400: '#F96A7E',
          500: '#F63049',
          600: '#D02752',
          700: '#8A244B',
          800: '#5E1832',
          900: '#3A0F1F',
        },
        ink: {
          DEFAULT: '#14090C',
          700: '#2A1B20',
          500: '#5A4A50',
          400: '#8A787E',
          300: '#B9AAAF',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.055em',
      },
      boxShadow: {
        glass: '0 24px 60px -30px rgba(138, 36, 75, 0.28)',
        panel: '0 40px 90px -50px rgba(138, 36, 75, 0.45)',
        lift: '0 18px 40px -24px rgba(20, 9, 12, 0.35)',
      },
      backgroundImage: {
        'paper-atmos':
          'radial-gradient(1100px 580px at 82% -8%, rgba(246,48,73,0.20), transparent 62%), radial-gradient(900px 520px at -8% 18%, rgba(208,39,82,0.16), transparent 62%), radial-gradient(1000px 600px at 50% 108%, rgba(138,36,75,0.16), transparent 65%), linear-gradient(180deg, #FFF6F7 0%, #FBE7EB 42%, #F6DAE0 100%)',
      },
    },
  },
  plugins: [],
};
