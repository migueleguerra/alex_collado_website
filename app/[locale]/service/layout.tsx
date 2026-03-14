export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ gridColumn: "1 / -1", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "8rem", paddingBottom: "8rem" }}>
      <style>{`
        .nav, .footer { display: none !important; }
        .container { grid-template-rows: none !important; }
        .service-flow { align-items: center; height: auto; }
      `}</style>
      {children}
    </div>
  );
}
