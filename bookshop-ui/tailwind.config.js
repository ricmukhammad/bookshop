import { defineConfig } from 'tailwindcss'

export default defineConfig({
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
            brand: {
                primary: '#047857',       // emerald green
                primaryDark: '#065f46',
                secondary: '#f59e0b',     // amber gold
                secondaryDark: '#d97706',
                background: '#fefce8',    // parchment tone
                surface: '#ffffff',
                text: '#1f2937',          // charcoal
                textMuted: '#6b7280',
            },
        },
    },
    plugins: [],
})