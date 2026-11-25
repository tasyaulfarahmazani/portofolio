/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          bg: '#fbfaf5',           // Soft warm ivory / palace garden marble
          surface: '#ffffff',      // Pure white card
          card: '#ffffff',
          cardHover: '#f8faf6',
          border: 'rgba(212, 175, 55, 0.35)', // Warm royal gold border
          borderLight: 'rgba(16, 185, 129, 0.2)', // Emerald tint
          gold: '#c59b3f',         // Classic antique gold
          goldDark: '#8e6b1d',
          goldLight: '#f6e4b8',
          leaf: '#4a8b5e',         // Manhwa garden leaf green
          leafLight: '#d1fae5',
          rose: '#e25c75',         // Rose petal accent
          sky: '#e0f2fe',          // Royal sunlit blue sky
          textMain: '#1e293b',     // Deep slate for high contrast readability
          textMuted: '#64748b'
        }
      },
      fontFamily: {
        royal: ['Cinzel Decorative', 'Cinzel', 'Playfair Display', 'serif'],
        monarch: ['Uncial Antiqua', 'Cormorant Upright', 'serif'],
        script: ['Cormorant Upright', 'Cinzel', 'serif'],
        sans: ['Comic Neue', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        comic: ['Comic Neue', 'Bangers', 'sans-serif']
      },
      boxShadow: {
        'royal-gold': '0 8px 30px rgba(197, 155, 63, 0.2)',
        'garden-soft': '0 10px 35px -5px rgba(50, 80, 60, 0.08), 0 0 20px rgba(212, 175, 55, 0.15)',
        'comic-pop': '4px 4px 0px rgba(30, 41, 59, 0.9)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'wiggle-cute': 'wiggle 3s ease-in-out infinite',
        'petal-fall': 'petalFall 10s linear infinite',
        'sunbeam': 'sunbeam 4s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg) translateY(0px)' },
          '50%': { transform: 'rotate(5deg) translateY(-8px)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '0' },
          '20%': { opacity: '0.8' },
          '80%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        sunbeam: {
          '0%': { opacity: '0.2' },
          '100%': { opacity: '0.5' }
        }
      }
    },
  },
  plugins: [],
}
