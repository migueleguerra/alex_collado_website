"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface MultiSelectValue {
  selected: number[];
  message: string;
}

interface Props {
  stepId: string;
  onNext: (stepId: string, value: MultiSelectValue) => void;
  currentValue?: unknown;
}

export default function MultiSelectStep({ stepId, onNext, currentValue }: Props) {
  const t = useTranslations("serviceFlow");
  const options = t.raw(`${stepId}.options`) as string[];
  const prev = currentValue as MultiSelectValue | undefined;
  const [selected, setSelected] = useState<number[]>(prev?.selected || []);
  const [message, setMessage] = useState(prev?.message || "");

  const toggle = (index: number) => {
    setSelected(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const useGrid = options.length >= 4;

  return (
    <div className="buttons" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={useGrid ? {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2rem",
          width: "100%",
          maxWidth: "50rem",
          marginBottom: "2rem",
        } : undefined}
      >
        {options.map((option, index) => (
          <button
            key={index}
            className="btn btn--primary u-margin-bottom-small"
            onClick={() => toggle(index)}
            style={{
              backgroundColor: selected.includes(index) ? "#ff7730" : "#FCDE61",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t(`${stepId}.placeholder`)}
        className="form__input"
        style={{ maxWidth: "50rem", width: "100%", margin: "2rem 0", padding: "1.5rem", borderRadius: "2rem", border: "1px solid rgba(0,0,0,0.4)", fontFamily: "inherit", fontSize: "1.6rem", minHeight: "8rem" }}
      />
      <button
        onClick={() => onNext(stepId, { selected, message })}
        className="btn btn--primary"
      >
        {t(`${stepId}.continue`)}
      </button>
    </div>
  );
}
