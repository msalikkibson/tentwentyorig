
import "./globals.css";
import Header from "./components/Global/Header";
import { Work_Sans } from 'next/font/google';


export const metadata = {
  title: "Ten Twenty",
  description: "",
};
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-work-sans',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-work-sans ${workSans.variable}  `}
      >
        <Header/>
        {children}

      </body>
    </html>
  );
}
