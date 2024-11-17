import './globals.css';

export const metadata = {
  title: 'SwitchBot Controller',
  description: 'Control your SwitchBot devices easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}