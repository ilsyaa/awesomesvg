import { ThemeProvider } from 'next-themes'
import "./globals.css";
import { Inter } from 'next/font/google'
import Nav from '@/components/nav';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-cat-200 dark:bg-cat-950 text-cat-950 dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Nav />
        </ThemeProvider>
      </body>
    </html>
  );
}

