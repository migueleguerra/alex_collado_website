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

  return (
    <div className="buttons">
      {options.map((option, index) => (
        <button
          key={index}
          className="btn btn--primary u-margin-bottom-small"
          onClick={() => toggle(index)}
          style={{
            cursor: "pointer",
            display: "block",
            width: "100%",
            maxWidth: "40rem",
            margin: "0 auto 2rem",
            backgroundColor: selected.includes(index) ? "#ff7730" : "#FCDE61",
          }}
        >
          {option}
        </button>
      ))}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t(`${stepId}.placeholder`)}
        className="form__input"
        style={{ display: "block", width: "100%", maxWidth: "40rem", margin: "2rem auto", padding: "1.5rem", borderRadius: "2rem", border: "1px solid rgba(0,0,0,0.4)", fontFamily: "inherit", fontSize: "1.6rem", minHeight: "8rem" }}
      />
      <button
        onClick={() => onNext(stepId, { selected, message })}
        className="btn btn--primary"
        style={{ cursor: "pointer", display: "block", margin: "0 auto" }}
      >
        {t(`${stepId}.continue`)}
      </button>
    </div>
  );
}
