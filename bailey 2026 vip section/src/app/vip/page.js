export default function VIPUpsellPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '48px 24px',
      background: 'linear-gradient(180deg, #0F2A2A 0%, #0B1D1D 100%)',
    }}>
      <div style={{
        padding: '8px 20px',
        background: 'rgba(212, 168, 83, 0.1)',
        border: '1px solid rgba(212, 168, 83, 0.2)',
        borderRadius: '100px',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#D4A853',
        marginBottom: '24px',
      }}>
        Page 2 — VIP Upsell
      </div>
      <h1 style={{
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: 700,
        color: '#F5F0E8',
        marginBottom: '16px',
      }}>
        VIP Upsell Page
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#8A9A9A',
        maxWidth: '480px',
        lineHeight: 1.6,
      }}>
        This page will contain the $47 VIP Gift Bundle upsell.
        Coming soon — this is the next page in the funnel.
      </p>
    </div>
  );
}
