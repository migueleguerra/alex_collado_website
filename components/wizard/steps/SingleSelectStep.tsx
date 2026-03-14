"use client";
import { useTranslations } from "next-intl";

interface Props {
  stepId: string;
  onNext: (stepId: string, value: number) => void;
  currentValue?: unknown;
}

export default function SingleSelectStep({ stepId, onNext, currentValue }: Props) {
  const t = useTranslations("serviceFlow");
  const options = t.raw(`${stepId}.options`) as string[];

  return (
    <div className="buttons">
      {options.map((option, index) => (
        <button
          key={index}
          className={`btn btn--primary u-margin-bottom-small${currentValue === index ? " btn--selected" : ""}`}
          onClick={() => onNext(stepId, index)}
          style={{ cursor: "pointer", display: "block", width: "100%", maxWidth: "40rem", margin: "0 auto 2rem" }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
