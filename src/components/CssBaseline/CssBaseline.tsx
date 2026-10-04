/**
 * Installs the Google Fonts Inter face used by Figma
 * (https://fonts.google.com/specimen/Inter) via declarative link tags.
 * Static 400/700 cuts (not the variable opsz axis). React 19 hoists these into document.head.
 */
import "@/styles/global.scss";

export default function CssBaseline() {
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      />
    </>
  );
}
