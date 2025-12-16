/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /**
       * Map our CSS variables to Tailwind color tokens so utilities like
       * `border-border` or `bg-background` (and their opacity variants such as
       * `/50`) are generated.
       */
      colors: (() => {
        const withOpacity = (variable) => ({ opacityValue }) =>
          opacityValue === undefined
            ? `var(${variable})`
            : `color-mix(in oklch, var(${variable}) ${parseFloat(opacityValue) * 100}%, transparent)`;

        return {
          border: withOpacity('--border'),
          input: withOpacity('--input'),
          ring: withOpacity('--ring'),
          background: withOpacity('--background'),
          foreground: withOpacity('--foreground'),
          navy: '#0b2d4e',
          'navy-dark': '#08121e',
          teal: '#006d77',
          orange: '#ff6b35',
          gold: '#d4a017',
          cream: '#faf8f5',
          primary: {
            DEFAULT: withOpacity('--primary'),
            foreground: withOpacity('--primary-foreground'),
          },
          secondary: {
            DEFAULT: withOpacity('--secondary'),
            foreground: withOpacity('--secondary-foreground'),
          },
          destructive: {
            DEFAULT: withOpacity('--destructive'),
            foreground: withOpacity('--destructive-foreground'),
          },
          muted: {
            DEFAULT: withOpacity('--muted'),
            foreground: withOpacity('--muted-foreground'),
          },
          accent: {
            DEFAULT: withOpacity('--accent'),
            foreground: withOpacity('--accent-foreground'),
          },
          popover: {
            DEFAULT: withOpacity('--popover'),
            foreground: withOpacity('--popover-foreground'),
          },
          card: {
            DEFAULT: withOpacity('--card'),
            foreground: withOpacity('--card-foreground'),
          },
          sidebar: {
            DEFAULT: withOpacity('--sidebar'),
            foreground: withOpacity('--sidebar-foreground'),
            primary: withOpacity('--sidebar-primary'),
            'primary-foreground': withOpacity('--sidebar-primary-foreground'),
            accent: withOpacity('--sidebar-accent'),
            'accent-foreground': withOpacity('--sidebar-accent-foreground'),
            border: withOpacity('--sidebar-border'),
            ring: withOpacity('--sidebar-ring'),
          },
        };
      })(),
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
