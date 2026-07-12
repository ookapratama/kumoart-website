/**
 * Set data-theme dari localStorage sebelum paint pertama
 * agar tidak ada flash tema yang salah di halaman admin.
 */
export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const theme = localStorage.getItem('admin-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', theme);
          })()
        `,
      }}
    />
  );
}
