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

  const useGrid = options.length >= 4;

  return (
    <div
      className={useGrid ? "wizard-grid" : "buttons"}
    >
      {options.map((option, index) => (
        <button
          key={index}
          className="btn btn--primary u-margin-bottom-small"
          onClick={() => onNext(stepId, index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
