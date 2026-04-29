/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'bg-primary': 'var(--background-primary)',
                'bg-surface': 'var(--background-surface)',
                primary: 'var(--text-primary)',
                secondary: 'var(--text-secondary)',
                accent: 'var(--text-accent)',
                cta: '#5b4ccc',
            },
            borderRadius: {
                10: '0.625rem',
                12: '0.75rem',
                14: '0.875rem',
            },
        },
    },
    plugins: [],
};
