import '../styles/globals.css';

export const metadata = {
    title: {
        template: '%s | Prompt Studio',
        default: 'Prompt Studio'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased bg-neutral-100 text-neutral-900">
                <main>{children}</main>
            </body>
        </html>
    );
}
