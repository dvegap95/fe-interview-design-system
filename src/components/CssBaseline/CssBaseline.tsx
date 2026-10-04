import "@/styles/global.scss";

/** Loads design-system global styles (including :root CSS tokens), box-sizing baseline, and the Inter font (400/700). */
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
