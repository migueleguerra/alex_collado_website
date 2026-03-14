"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const popupsT = useTranslations("popups");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section id="section-testimonials" className="testimonials">
        <picture>
          <source srcSet="/img/plate2-x2.jp2" type="image/jp2" />
          <img
            srcSet="/img/plate2-x1.png 1x, /img/plate2-x2.png 2x"
            className="testimonials__plate"
            alt={t("altTulum")}
          />
        </picture>
        <div className="testimonials__title">
          <img src="/img/title_line.png" alt={t("altTulum")} />
          <h2 className="heading--2 u-margin-bottom-small">{t("title")}</h2>
          <p className="paragraph-1 u-margin-bottom-big">{t("subtitle")}</p>
        </div>
        <div className="testimonials__background">&nbsp;</div>
        <div className="testimonials__container">
          {/* Testimonial 1 - Ambika */}
          <div className="testimonials__card">
            <picture>
              <source
                srcSet="/img/client1-x1.jp2"
                type="image/jp2"
                media="(max-width: 37.5em)"
              />
              <source srcSet="/img/client1-x2.jp2" type="image/jp2" />
              <img
                src="/img/client1-x2.jpg"
                className="testimonials__card--img u-margin-bottom-small"
                alt={t("altPlaya")}
              />
            </picture>
            <h3 className="heading--3 u-margin-bottom-small">
              {t("testimonial1.name")}
            </h3>
            <p className="testimonials__card--text paragraph-1 u-margin-bottom-small">
              {t("testimonial1.text")}
            </p>
            <div className="testimonials__card--btn btn-wrapper">
              <button
                onClick={() => setIsOpen(true)}
                className="btn-line"
                style={{ cursor: "pointer", background: "none", border: "none", font: "inherit" }}
              >
                {t("testimonial1.more")}
              </button>
            </div>
          </div>

          {/* Testimonial 2 - Mallory */}
          <div className="testimonials__card">
            <picture>
              <img
                src="/img/client2-x2.png"
                className="testimonials__card--img u-margin-bottom-small"
                alt={t("altPlaya")}
              />
            </picture>
            <h3 className="heading--3 u-margin-bottom-small">
              {t("testimonial2.name")}
            </h3>
            <p className="testimonials__card--text paragraph-1">
              {t("testimonial2.text")}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Modal */}
      {isOpen && (
        <div
          className="popup"
          style={{
            display: "flex",
            opacity: 1,
            visibility: "visible",
            position: "fixed",
            top: 0,
            left: 0,
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="popup__container popup__container--testimonials"
            style={{
              display: "flex",
              flexDirection: "column",
              opacity: 1,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="popup__close"
              onClick={() => setIsOpen(false)}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                color: "#212021",
                position: "absolute",
                top: "2rem",
                right: "2rem",
                fontSize: "4rem",
                lineHeight: 1,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F0C824")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#212021")}
            >
              &times;
            </button>
            <p>{popupsT("testimonial1Full.text")}</p>
          </div>
        </div>
      )}
    </>
  );
}
