import { Link } from "@/i18n/navigation";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ gridColumn: "1 / -1", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "8rem", paddingBottom: "8rem" }}>
      <style>{`
        .nav, .footer { display: none !important; }
        .container { grid-template-rows: none !important; }
      `}</style>
      <Link
        href="/"
        style={{
          position: "absolute",
          top: "3rem",
          left: "3rem",
          backgroundColor: "#212021",
          color: "#ffffff",
          border: "none",
          borderRadius: "50%",
          width: "4.5rem",
          height: "4.5rem",
          fontSize: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          transition: "all 0.2s",
          zIndex: 5,
        }}
      >
        ←
      </Link>
      {children}
    </div>
  );
}
