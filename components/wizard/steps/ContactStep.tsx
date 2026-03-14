"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { PhoneInput } from "react-international-phone";
import { PhoneNumberUtil } from "react-international-phone";
import "react-international-phone/style.css";

interface Props {
  wizardData: Record<string, unknown>;
}

export default function ContactStep({ wizardData }: Props) {
  const t = useTranslations("serviceFlow");
  const tValidation = useTranslations("validation");
  const tSuccess = useTranslations("success");
  const tError = useTranslations("error");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validators = {
    name: (v: string) => v.trim().length >= 2,
    email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: (v: string) => {
      try {
        const phoneUtil = PhoneNumberUtil.getInstance();
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(v));
      } catch {
        return false;
      }
    },
  };

  const errors = {
    name: touched.name && !validators.name(name),
    email: touched.email && !validators.email(email),
    phone: touched.phone && !validators.phone(phone),
  };

  const isValid = validators.name(name) && validators.email(email) && validators.phone(phone);

  const blur = (field: string) => setTouched(prev => ({ ...prev, [field]: true }));

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "1.5rem",
    borderRadius: "2rem",
    border: `2px solid ${hasError ? "#ff7730" : "rgba(0,0,0,0.15)"}`,
    fontSize: "1.6rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  });

  const errorStyle: React.CSSProperties = {
    color: "#ff7730",
    fontSize: "1.2rem",
    marginTop: "0.5rem",
    paddingLeft: "1.5rem",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });

    if (!isValid) return;

    setStatus("sending");

    const resolveValue = (key: string, value: unknown): string => {
      if (value === null || value === undefined) return "";
      if (typeof value === "number") {
        try {
          const options = t.raw(`${key}.options`) as string[];
          return options[value] || String(value);
        } catch {
          return String(value);
        }
      }
      if (typeof value === "object") return JSON.stringify(value);
      return String(value);
    };

    // Build template params
    const templateParams: Record<string, string> = {
      name,
      email,
      phone,
      message,
    };

    if (wizardData.where !== undefined) templateParams.where = resolveValue("where", wizardData.where);
    if (wizardData.what !== undefined) templateParams.what = resolveValue("what", wizardData.what);
    if (wizardData.typeService !== undefined) templateParams.typeService = resolveValue("typeService", wizardData.typeService);

    const howMany = wizardData.howMany as { adults?: number; children?: number } | undefined;
    if (howMany) {
      templateParams.adults = String(howMany.adults || 0);
      templateParams.children = String(howMany.children || 0);
    }

    if (wizardData.meal !== undefined) templateParams.meal = resolveValue("meal", wizardData.meal);

    const food = wizardData.food as { selected?: number[]; message?: string } | undefined;
    if (food) {
      const foodOptions = t.raw("food.options") as string[];
      templateParams.selectedFood = (food.selected || []).map(i => foodOptions[i] || "").join(", ");
      templateParams.foodMessage = food.message || "";
    }

    if (wizardData.stove !== undefined) templateParams.stove = resolveValue("stove", wizardData.stove);
    if (wizardData.hobs !== undefined) templateParams.hobs = resolveValue("hobs", wizardData.hobs);
    if (wizardData.oven !== undefined) templateParams.oven = resolveValue("oven", wizardData.oven);

    if (wizardData.calendar) templateParams.oneServiceDate = String(wizardData.calendar);
    if (wizardData.calendarRange) {
      const range = wizardData.calendarRange as { from: string; to: string };
      templateParams.fromDate = range.from;
      templateParams.toDate = range.to;
    }

    const allergies = wizardData.allergies as { selected?: number[]; message?: string } | undefined;
    if (allergies) {
      const allergyOptions = t.raw("allergies.options") as string[];
      templateParams.selectedAllergies = (allergies.selected || []).map(i => allergyOptions[i] || "").join(", ");
      templateParams.allergiesMessage = allergies.message || "";
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: "template_services",
          ...templateParams,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "5rem" }}>
        <h2 className="heading--2 u-margin-bottom-medium">{tSuccess("heading")}</h2>
        <p className="paragraph-1 u-margin-bottom-big">{tSuccess("message")}</p>
        <a href="/" className="btn btn--primary">{tSuccess("button")}</a>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ textAlign: "center", padding: "5rem" }}>
        <h2 className="heading--2 u-margin-bottom-medium">{tError("heading")}</h2>
        <p className="paragraph-1 u-margin-bottom-big">{tError("message")}</p>
        <button onClick={() => setStatus("idle")} className="btn btn--primary" style={{ cursor: "pointer" }}>
          {tError("button")}
        </button>
      </div>
    );
  }

  const resolveDisplay = (key: string, value: unknown): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === "number") {
      try {
        const options = t.raw(`${key}.options`) as string[];
        return options[value] || String(value);
      } catch {
        return String(value);
      }
    }
    if (typeof value === "object" && value !== null) {
      const obj = value as Record<string, unknown>;
      if ("adults" in obj) return `${obj.adults} adults, ${obj.children} children`;
      if ("from" in obj) return `${obj.from} → ${obj.to}`;
      if ("selected" in obj) {
        try {
          const options = t.raw(`${key}.options`) as string[];
          const selected = (obj.selected as number[]).map(i => options[i]).join(", ");
          const msg = obj.message ? ` | ${obj.message}` : "";
          return selected + msg;
        } catch {
          return JSON.stringify(value);
        }
      }
    }
    return String(value);
  };

  const summaryKeys = Object.keys(wizardData).filter(k => wizardData[k] !== undefined);

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", width: "100%", maxWidth: "50rem", margin: "0 auto" }}>
      {/* Selection summary */}
      {summaryKeys.length > 0 && (
        <div style={{ width: "100%", backgroundColor: "#f9f9f9", borderRadius: "2rem", padding: "2rem 3rem", marginBottom: "1rem" }}>
          <p style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "1rem", color: "#212021", letterSpacing: "1px" }}>YOUR SELECTIONS</p>
          {summaryKeys.map(key => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: "1.4rem", padding: "0.5rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <span style={{ color: "#888", textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, " $1")}</span>
              <span style={{ fontWeight: "500", color: "#212021" }}>{resolveDisplay(key, wizardData[key])}</span>
            </div>
          ))}
        </div>
      )}

      {/* Form fields */}
      <div style={{ width: "100%" }}>
        <label className="form__label" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("contact.nameLabel")}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => blur("name")}
          placeholder={t("contact.namePlaceholder")}
          style={inputStyle(!!errors.name)}
        />
        {errors.name && <p style={errorStyle}>{tValidation("nameInvalid")}</p>}
      </div>

      <div style={{ width: "100%" }}>
        <label className="form__label" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("contact.emailLabel")}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => blur("email")}
          placeholder={t("contact.emailPlaceholder")}
          style={inputStyle(!!errors.email)}
        />
        {errors.email && <p style={errorStyle}>{tValidation("emailInvalid")}</p>}
      </div>

      <div style={{ width: "100%" }}>
        <label className="form__label" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("contact.phoneLabel")}</label>
        <PhoneInput
          defaultCountry="mx"
          value={phone}
          onChange={(val) => setPhone(val)}
          onBlur={() => blur("phone")}
          inputStyle={{
            width: "100%",
            padding: "1.5rem",
            borderRadius: "0 2rem 2rem 0",
            border: `2px solid ${errors.phone ? "#ff7730" : "rgba(0,0,0,0.15)"}`,
            borderLeft: "none",
            fontSize: "1.6rem",
            fontFamily: "inherit",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          countrySelectorStyleProps={{
            buttonStyle: {
              padding: "1.5rem",
              borderRadius: "2rem 0 0 2rem",
              border: `2px solid ${errors.phone ? "#ff7730" : "rgba(0,0,0,0.15)"}`,
              borderRight: "none",
              transition: "border-color 0.2s",
            },
          }}
        />
        {errors.phone && <p style={errorStyle}>{tValidation("phoneInvalid")}</p>}
      </div>

      <div style={{ width: "100%" }}>
        <label className="form__label" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("contact.messageLabel")}</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("contact.messagePlaceholder")}
          style={{ ...inputStyle(false), minHeight: "10rem" }}
        />
      </div>

      <button
        type="submit"
        className="btn btn--primary"
        style={{ cursor: isValid ? "pointer" : "not-allowed", marginTop: "2rem", opacity: isValid ? 1 : 0.6 }}
        disabled={status === "sending"}
      >
        {status === "sending" ? "..." : t("contact.submit")}
      </button>
    </form>
  );
}
