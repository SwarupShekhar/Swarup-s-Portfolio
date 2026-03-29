export const metadata = { title: 'Lab — Swarup Shekhar' };

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        /* ── LAB PAGE ISOLATION ── */
        /* Override root body styles */
        body {
          background: #000000 !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* Kill the Nav (fixed, z-50, rounded pill at top) */
        body > * nav,
        nav[class*="fixed"],
        nav[class*="z-50"] {
          display: none !important;
        }

        /* Kill the Footer */
        body > * footer,
        footer[class*="z-50"] {
          display: none !important;
        }

        /* Kill PremiumBackground (fixed inset-0 z-[-1]) */
        div[class*="fixed"][class*="inset-0"][class*="pointer-events-none"] {
          display: none !important;
        }

        /* Kill CustomCursor (fixed divs with cursor logic) */
        div[style*="pointer-events: none"][style*="position: fixed"][style*="border-radius: 50%"] {
          display: none !important;
        }

        /* Google Fonts for Lab */
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500;700&display=swap');
      `}</style>
      {children}
    </>
  );
}
