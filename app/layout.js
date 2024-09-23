import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Skuling Invoice Generator",
  description: "Create and manage invoices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
