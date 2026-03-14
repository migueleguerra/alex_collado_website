"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Link } from "@/i18n/navigation";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const IS_TEST_MODE = process.env.NEXT_PUBLIC_EMAIL_TEST_MODE === "true";
const SHOW_RECAPTCHA = RECAPTCHA_SITE_KEY && !IS_TEST_MODE;

export default function ContactPage() {
  const t = useTranslations("contactForm");
  const tValidation = useTranslations("validation");
  const tSuccess = useTranslations("success");
  const tError = useTranslations("error");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const validators = {
    name: (v: string) => v.trim().length >= 2,
    email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: (v: string) => {
      const digits = v.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    },
  };

  const errors = {
    name: touched.name && !validators.name(name),
    email: touched.email && !validators.email(email),
    phone: touched.phone && !validators.phone(phone),
  };

  const isValid = validators.name(name) && validators.email(email) && validators.phone(phone) && (!SHOW_RECAPTCHA || !!captchaToken);
  const blur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

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

    try {
      const formData = new FormData();
      formData.append("service_id", "default_service");
      formData.append("template_id", "template_contact");
      formData.append("user_id", process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("message", message);

      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send-form", {
        method: "POST",
        body: formData,
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="service-flow">
        <h2 className="heading--2 u-margin-bottom-medium">{tSuccess("heading")}</h2>
        <p className="paragraph-1 u-margin-bottom-big">{tSuccess("message")}</p>
        <Link href="/" className="btn btn--primary">{tSuccess("button")}</Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="service-flow">
        <h2 className="heading--2 u-margin-bottom-medium">{tError("heading")}</h2>
        <p className="paragraph-1 u-margin-bottom-big">{tError("message")}</p>
        <button onClick={() => setStatus("idle")} className="btn btn--primary" style={{ cursor: "pointer" }}>
          {tError("button")}
        </button>
      </div>
    );
  }

  return (
    <div className="service-flow">
      <div className="title">
        <h2 className="heading--2 u-margin-bottom-big">{t("heading")}</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", width: "100%", maxWidth: "50rem", margin: "0 auto" }}>
        <div style={{ width: "100%" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("nameLabel")}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => blur("name")}
            placeholder={t("namePlaceholder")}
            style={inputStyle(!!errors.name)}
          />
          {errors.name && <p style={errorStyle}>{tValidation("nameInvalid")}</p>}
        </div>

        <div style={{ width: "100%" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("emailLabel")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => blur("email")}
            placeholder={t("emailPlaceholder")}
            style={inputStyle(!!errors.email)}
          />
          {errors.email && <p style={errorStyle}>{tValidation("emailInvalid")}</p>}
        </div>

        <div style={{ width: "100%" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("phoneLabel")}</label>
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
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.6rem" }}>{t("messageLabel")}</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("messagePlaceholder")}
            style={{ ...inputStyle(false), minHeight: "10rem" }}
          />
        </div>

        {SHOW_RECAPTCHA && (
          <div style={{ marginTop: "1rem" }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY!}
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn--primary"
          style={{ cursor: isValid ? "pointer" : "not-allowed", marginTop: "2rem", opacity: isValid ? 1 : 0.6 }}
          disabled={status === "sending"}
        >
          {status === "sending" ? "..." : t("submit")}
        </button>
      </form>
    </div>
  );
}
