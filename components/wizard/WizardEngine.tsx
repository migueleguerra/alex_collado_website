"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getFlowSteps, stepConfigs, type StepId } from "./config";
import SingleSelectStep from "./steps/SingleSelectStep";
import MultiSelectStep from "./steps/MultiSelectStep";
import CounterStep from "./steps/CounterStep";
import DateStep from "./steps/DateStep";
import DateRangeStep from "./steps/DateRangeStep";
import ContactStep from "./steps/ContactStep";

interface WizardData {
  [key: string]: unknown;
}

export default function WizardEngine() {
  const t = useTranslations("serviceFlow");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<WizardData>({});

  const steps = getFlowSteps(data);
  const currentStepId = steps[currentStepIndex];
  const config = stepConfigs[currentStepId];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Clamp step index when flow changes (e.g. user goes back and picks a different service)
  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      setCurrentStepIndex(steps.length - 1);
    }
  }, [currentStepIndex, steps.length]);

  const handleNext = useCallback(
    (stepId: string, value: unknown) => {
      setData((prev) => ({ ...prev, [stepId]: value }));

      const updatedData = { ...data, [stepId]: value };
      const updatedSteps = getFlowSteps(updatedData);
      const nextIndex = currentStepIndex + 1;

      if (nextIndex < updatedSteps.length) {
        setCurrentStepIndex(nextIndex);
      }
    },
    [data, currentStepIndex]
  );

  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  const renderStep = () => {
    switch (config.type) {
      case "single-select":
        return (
          <SingleSelectStep
            stepId={currentStepId}
            onNext={handleNext}
            currentValue={data[currentStepId]}
          />
        );
      case "multi-select":
        return (
          <MultiSelectStep
            stepId={currentStepId}
            onNext={handleNext}
            currentValue={data[currentStepId]}
          />
        );
      case "counter":
        return (
          <CounterStep
            stepId={currentStepId}
            onNext={handleNext}
            currentValue={data[currentStepId]}
          />
        );
      case "date":
        return (
          <DateStep
            stepId={currentStepId}
            onNext={handleNext}
            currentValue={data[currentStepId]}
          />
        );
      case "date-range":
        return (
          <DateRangeStep
            stepId={currentStepId}
            onNext={handleNext}
            currentValue={data[currentStepId]}
          />
        );
      case "form":
        return <ContactStep wizardData={data} />;
    }
  };

  return (
    <div className="service-flow">
      {/* Progress bar */}
      <div className="timeline">
        <div
          style={{
            width: `${progress}%`,
            height: "4px",
            backgroundColor: "#F0C824",
            transition: "width 0.3s ease",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Step heading */}
      <div className="title">
        <h3 className="heading--2 u-margin-bottom-big">
          {t(`${config.translationKey}.heading`)}
        </h3>
      </div>

      {/* Back button */}
      {currentStepIndex > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={handleBack}
            className="btn btn--secondary"
            style={{ cursor: "pointer" }}
          >
            ←
          </button>
        </div>
      )}

      {/* Current step */}
      {renderStep()}
    </div>
  );
}
