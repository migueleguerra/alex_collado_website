"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setErrorMsg(tValidation("requiredFields"));
      setTimeout(() => setErrorMsg(""), 5000);
      return;
    }

    setStatus("sending");

    const formData = new FormData();
    formData.append("service_id", "default_service");
    formData.append("template_id", "template_services");
    formData.append("user_id", "user_RjYoUr6zpBN3O4umVqmJ3");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);

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

    if (wizardData.where !== undefined) formData.append("where", resolveValue("where", wizardData.where));
    if (wizardData.what !== undefined) formData.append("what", resolveValue("what", wizardData.what));
    if (wizardData.typeService !== undefined) formData.append("typeService", resolveValue("typeService", wizardData.typeService));

    const howMany = wizardData.howMany as { adults?: number; children?: number } | undefined;
    if (howMany) {
      formData.append("adults", String(howMany.adults || 0));
      formData.append("children", String(howMany.children || 0));
    }

    if (wizardData.meal !== undefined) formData.append("meal", resolveValue("meal", wizardData.meal));

    const food = wizardData.food as { selected?: number[]; message?: string } | undefined;
    if (food) {
      const foodOptions = t.raw("food.options") as string[];
      const selectedFoods = (food.selected || []).map(i => foodOptions[i] || "").join(", ");
      formData.append("selectedFood", selectedFoods);
      formData.append("foodMessage", food.message || "");
    }

    if (wizardData.stove !== undefined) formData.append("stove", resolveValue("stove", wizardData.stove));
    if (wizardData.hobs !== undefined) formData.append("hobs", resolveValue("hobs", wizardData.hobs));
    if (wizardData.oven !== undefined) formData.append("oven", resolveValue("oven", wizardData.oven));

    if (wizardData.calendar) formData.append("oneServiceDate", String(wizardData.calendar));
    if (wizardData.calendarRange) {
      const range = wizardData.calendarRange as { from: string; to: string };
      formData.append("fromDate", range.from);
      formData.append("toDate", range.to);
    }

    const allergies = wizardData.allergies as { selected?: number[]; message?: string } | undefined;
    if (allergies) {
      const allergyOptions = t.raw("allergies.options") as string[];
      const selectedAllergies = (allergies.selected || []).map(i => allergyOptions[i] || "").join(", ");
      formData.append("selectedAllergies", selectedAllergies);
      formData.append("allergiesMessage", allergies.message || "");
    }

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send-form", {
        method: "POST",
        body: formData,
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

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", width: "100%", maxWidth: "50rem", margin: "0 auto" }}>
      {errorMsg && (
        <div style={{ backgroundColor: "#ff7730", color: "white", padding: "1rem 2rem", borderRadius: "1rem", width: "100%" }}>
          {errorMsg}
        </div>
      )}

      <div style={{ width: "100%" }}>
        <label className="form__label" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("contact.nameLabel")}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("contact.namePlaceholder")}
          className="form__input"
          style={{ width: "100%", padding: "1.5rem", borderRadius: "2rem", border: "1px solid rgba(0,0,0,0.4)", fontSize: "1.6rem", fontFamily: "inherit" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <label className="form__label" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("contact.emailLabel")}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("contact.emailPlaceholder")}
          className="form__input"
          style={{ width: "100%", padding: "1.5rem", borderRadius: "2rem", border: "1px solid rgba(0,0,0,0.4)", fontSize: "1.6rem", fontFamily: "inherit" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <label className="form__label" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("contact.phoneLabel")}</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("contact.phonePlaceholder")}
          className="form__input"
          style={{ width: "100%", padding: "1.5rem", borderRadius: "2rem", border: "1px solid rgba(0,0,0,0.4)", fontSize: "1.6rem", fontFamily: "inherit" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <label className="form__label" style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("contact.messageLabel")}</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("contact.messagePlaceholder")}
          className="form__input"
          style={{ width: "100%", padding: "1.5rem", borderRadius: "2rem", border: "1px solid rgba(0,0,0,0.4)", fontSize: "1.6rem", fontFamily: "inherit", minHeight: "10rem" }}
        />
      </div>

      <button
        type="submit"
        className="btn btn--primary"
        style={{ cursor: "pointer", marginTop: "2rem" }}
        disabled={status === "sending"}
      >
        {status === "sending" ? "..." : t("contact.submit")}
      </button>
    </form>
  );
}
