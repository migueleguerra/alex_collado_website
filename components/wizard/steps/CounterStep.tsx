"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface CounterValue {
  adults: number;
  children: number;
}

interface Props {
  stepId: string;
  onNext: (stepId: string, value: CounterValue) => void;
  currentValue?: unknown;
}

export default function CounterStep({ stepId, onNext, currentValue }: Props) {
  const t = useTranslations("serviceFlow");
  const prev = currentValue as CounterValue | undefined;
  const [adults, setAdults] = useState(prev?.adults ?? 2);
  const [children, setChildren] = useState(prev?.children ?? 0);

  const counterBtnStyle: React.CSSProperties = {
    cursor: "pointer",
    width: "4.5rem",
    height: "4.5rem",
    minWidth: "4.5rem",
    minHeight: "4.5rem",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#212021",
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  };

  return (
    <div className="buttons" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
      {/* Adults counter */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <button style={counterBtnStyle} onClick={() => setAdults(Math.max(1, adults - 1))} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#444")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#212021")}>−</button>
        <div style={{ textAlign: "center", minWidth: "12rem" }}>
          <div style={{ fontSize: "3rem", fontWeight: "bold" }}>{adults}</div>
          <div style={{ fontSize: "1.4rem", letterSpacing: "2px" }}>{t(`${stepId}.adults`)}</div>
        </div>
        <button style={counterBtnStyle} onClick={() => setAdults(adults + 1)} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#444")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#212021")}>+</button>
      </div>

      {/* Children counter */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <button style={counterBtnStyle} onClick={() => setChildren(Math.max(0, children - 1))} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#444")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#212021")}>−</button>
        <div style={{ textAlign: "center", minWidth: "12rem" }}>
          <div style={{ fontSize: "3rem", fontWeight: "bold" }}>{children}</div>
          <div style={{ fontSize: "1.4rem", letterSpacing: "2px" }}>{t(`${stepId}.children`)}</div>
        </div>
        <button style={counterBtnStyle} onClick={() => setChildren(children + 1)} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#444")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#212021")}>+</button>
      </div>

      <button
        onClick={() => onNext(stepId, { adults, children })}
        className="btn btn--primary"
        style={{ cursor: "pointer", marginTop: "2rem" }}
      >
        {t(`${stepId}.continue`)}
      </button>
    </div>
  );
}
