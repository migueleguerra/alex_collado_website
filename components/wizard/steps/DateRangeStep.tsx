"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface DateRangeValue {
  from: string;
  to: string;
}

interface Props {
  stepId: string;
  onNext: (stepId: string, value: DateRangeValue) => void;
  currentValue?: unknown;
}

export default function DateRangeStep({ stepId, onNext, currentValue }: Props) {
  const t = useTranslations("serviceFlow");
  const prev = currentValue as DateRangeValue | undefined;
  const [from, setFrom] = useState(prev?.from || "");
  const [to, setTo] = useState(prev?.to || "");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  const isValid = from && to && from <= to;

  return (
    <div className="buttons" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "30rem" }}>
        <label style={{ fontSize: "1.6rem", fontWeight: "bold" }}>{t(`${stepId}.from`)}</label>
        <input
          type="date"
          value={from}
          min={minDate}
          onChange={(e) => { setFrom(e.target.value); if (to && e.target.value > to) setTo(""); }}
          className="form__input"
          style={{ padding: "1.5rem", borderRadius: "2rem", border: "1px solid rgba(0,0,0,0.4)", fontSize: "1.6rem", fontFamily: "inherit" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "30rem" }}>
        <label style={{ fontSize: "1.6rem", fontWeight: "bold" }}>{t(`${stepId}.to`)}</label>
        <input
          type="date"
          value={to}
          min={from || minDate}
          onChange={(e) => setTo(e.target.value)}
          className="form__input"
          style={{ padding: "1.5rem", borderRadius: "2rem", border: "1px solid rgba(0,0,0,0.4)", fontSize: "1.6rem", fontFamily: "inherit" }}
        />
      </div>
      <button
        onClick={() => { if (isValid) onNext(stepId, { from, to }); }}
        className="btn btn--primary"
        style={{ cursor: "pointer", marginTop: "2rem", opacity: isValid ? 1 : 0.5 }}
        disabled={!isValid}
      >
        {t(`${stepId}.continue`)}
      </button>
    </div>
  );
}
