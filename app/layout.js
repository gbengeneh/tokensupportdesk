import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import { ThemeProvider } from './contexts/ThemeContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Welcome to our website",
  description: "A support desk for token-related issues",
};

export default function RootLayout({ children }) {
    return (
        <>
            <ThemeProvider>
                <Header />
                <html lang="en">
                    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                        {children}
                    </body>
                </html>
            </ThemeProvider>
        </>
    );
}
