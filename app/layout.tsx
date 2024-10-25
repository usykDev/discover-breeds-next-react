import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breeds of cats and dogs",
  description: "Discover more about cats and dogs",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className="h-screen sm:p-10 p-6">
          <h1 className="head_text text-center text-3xl mb-7">
            Discover more about cats and dogs
          </h1>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
