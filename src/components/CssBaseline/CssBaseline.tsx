import "@/styles/global.scss";

/** Optional once-per-app mount: box-sizing / font-family baseline (`global.scss`) and Inter (400/700). Default `:root` tokens ship with `style.css` via the package entry — not here. */
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
