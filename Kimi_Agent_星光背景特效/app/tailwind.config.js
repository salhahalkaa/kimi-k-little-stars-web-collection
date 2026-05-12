/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand Colors updated to match the new logo
        teal: {
          DEFAULT: '#1B2A47', // Logo Navy
          light: '#273A5E',
          dark: '#0F182B',
        },
        gold: {
          DEFAULT: '#F5A623', // Logo Gold
          light: '#F7B74D',
          dark: '#D48F1E',
        },
        navy: {
          DEFAULT: '#0a2540',
          light: '#0f3859',
          dark: '#061a2e',
        },
        cream: {
          DEFAULT: '#f8f9ff',
          dark: '#e8eaf6',
        },
        coral: {
          DEFAULT: '#E08E79', // Logo Rose Gold
          light: '#E6A795',
        },
        purple: {
          brand: '#8b5cf6',
          light: '#a78bfa',
        },
        whatsapp: {
          DEFAULT: '#25d366',
          dark: '#128c7e',
        },
      },
      fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'gold': '0 0 30px rgba(245, 200, 66, 0.4)',
        'gold-lg': '0 0 50px rgba(245, 200, 66, 0.5)',
        'teal': '0 0 30px rgba(13, 92, 115, 0.4)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.3)',
        'whatsapp': '0 4px 20px rgba(37, 211, 102, 0.4)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(3deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245, 200, 66, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(245, 200, 66, 0.7)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ripple": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.015)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "card-flip": {
          "0%": { transform: "rotateY(90deg)", opacity: "0" },
          "100%": { transform: "rotateY(0deg)", opacity: "1" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "ripple": "ripple 0.6s ease-out",
        "breathe": "breathe 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "card-flip": "card-flip 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "count-up": "count-up 0.5s ease-out forwards",
        "scroll-x": "scroll-x 30s linear infinite",
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
