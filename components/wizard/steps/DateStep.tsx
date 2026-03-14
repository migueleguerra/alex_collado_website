"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  stepId: string;
  onNext: (stepId: string, value: string) => void;
  currentValue?: unknown;
}

export default function DateStep({ stepId, onNext, currentValue }: Props) {
  const t = useTranslations("serviceFlow");
  const [date, setDate] = useState((currentValue as string) || "");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="buttons" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
      <input
        type="date"
        value={date}
        min={minDate}
        onChange={(e) => setDate(e.target.value)}
        className="form__input"
        style={{ padding: "1.5rem", borderRadius: "2rem", border: "1px solid rgba(0,0,0,0.4)", fontSize: "1.6rem", fontFamily: "inherit", width: "100%", maxWidth: "30rem" }}
      />
      <button
        onClick={() => { if (date) onNext(stepId, date); }}
        className="btn btn--primary"
        style={{ cursor: "pointer", marginTop: "2rem", opacity: date ? 1 : 0.5 }}
        disabled={!date}
      >
        {t(`${stepId}.continue`)}
      </button>
    </div>
  );
}
