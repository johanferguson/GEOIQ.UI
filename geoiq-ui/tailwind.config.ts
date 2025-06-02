import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f0ff',
          100: '#e7dffe',
          200: '#d2c2fe',
          300: '#b499fd',
          400: '#9366fb',
          500: '#390099', // Deep Royal Purple
          600: '#300080',
          700: '#280066',
          800: '#1f004d',
          900: '#170033',
        },
        magenta: {
          50: '#fff0f8',
          100: '#ffe0f1',
          200: '#ffc2e4',
          300: '#ff99d1',
          400: '#ff66b8',
          500: '#9E0059', // Rich Magenta
          600: '#850048',
          700: '#6b0037',
          800: '#520026',
          900: '#380015',
        },
        pink: {
          50: '#fff0f3',
          100: '#ffe0e7',
          200: '#ffc2d0',
          300: '#ff99b3',
          400: '#ff6691',
          500: '#FF0054', // Vivid Pink
          600: '#e6004a',
          700: '#cc0040',
          800: '#b30036',
          900: '#99002c',
        },
        orange: {
          50: '#fff4f0',
          100: '#ffe8e0',
          200: '#ffd1c2',
          300: '#ffb399',
          400: '#ff9366',
          500: '#FF5400', // Bright Orange
          600: '#e64d00',
          700: '#cc4400',
          800: '#b33b00',
          900: '#993300',
        },
        yellow: {
          50: '#fffef0',
          100: '#fffdde',
          200: '#fffabd',
          300: '#fff79c',
          400: '#fff47a',
          500: '#FFBD00', // Golden Yellow
          600: '#e6aa00',
          700: '#cc9600',
          800: '#b38300',
          900: '#996f00',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'geoiq-gradient': 'linear-gradient(135deg, #390099 0%, #9E0059 25%, #FF0054 50%, #FF5400 75%, #FFBD00 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config 