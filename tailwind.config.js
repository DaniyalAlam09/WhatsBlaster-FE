/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Extracted from logo: WhatsApp green + charcoal and accents
                primary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#25D366', // brand green
                    600: '#1fb255',
                    700: '#199247',
                    800: '#13733a',
                    900: '#0d542b',
                },
                charcoal: {
                    50: '#f7f7f8',
                    100: '#eceef0',
                    200: '#d5d9de',
                    300: '#b1b8c1',
                    400: '#8a94a3',
                    500: '#5B6472',
                    600: '#404854',
                    700: '#2b3038',
                    800: '#1f2329',
                    900: '#121519',
                },
                accent: {
                    500: '#10b981'
                },
                success: {
                    500: '#22c55e'
                },
                error: {
                    500: '#ef4444'
                }
            },
            boxShadow: {
                soft: '0 10px 25px -10px rgba(16,185,129,0.25)',
                brand: '0 12px 30px -10px rgba(37,211,102,0.35)'
            },
            backgroundImage: {
                'brand-gradient': 'linear-gradient(135deg, #25D366 0%, #10b981 50%, #199247 100%)',
                'card-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.95))'
            }
        },
    },
    plugins: [],
}
