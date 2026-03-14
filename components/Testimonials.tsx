import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const popupsT = useTranslations("popups");

  return (
    <>
      <section className="testimonials">
        <h2 className="heading--2 u-margin-bottom-small">{t("title")}</h2>
        <p className="paragraph-1 u-margin-bottom-big">{t("subtitle")}</p>
        <div className="testimonials__cards">
          {/* Testimonial 1 - Ambika */}
          <div className="testimonials__cards--container">
            <picture>
              <source
                srcSet="/img/client1-x1.jp2"
                type="image/jp2"
                media="(max-width: 37.5em)"
              />
              <source srcSet="/img/client1-x2.jp2" type="image/jp2" />
              <img
                src="/img/client1-x2.jpg"
                alt={t("altTulum")}
                className="testimonials__cards--container__img"
              />
            </picture>
            <h3 className="heading--3 u-margin-bottom-small">
              {t("testimonial1.name")}
            </h3>
            <p className="paragraph-1 u-margin-bottom-small">
              {t("testimonial1.text")}
            </p>
            <div className="btn-wrapper">
              <a href="#popup-testimonial-1" className="btn-line">
                {t("testimonial1.more")}
              </a>
            </div>
          </div>

          {/* Testimonial 2 - Mallory */}
          <div className="testimonials__cards--container">
            <img
              src="/img/client2-x2.png"
              alt={t("altPlaya")}
              className="testimonials__cards--container__img"
            />
            <h3 className="heading--3 u-margin-bottom-small">
              {t("testimonial2.name")}
            </h3>
            <p className="paragraph-1">{t("testimonial2.text")}</p>
          </div>
        </div>
      </section>

      {/* Testimonial Popup */}
      <div className="popup" id="popup-testimonial-1">
        <div className="popup__container popup__container--testimonials">
          <a href="#section-about-me" className="popup__close">
            &times;
          </a>
          <p className="popup__text">{popupsT("testimonial1Full.text")}</p>
        </div>
      </div>
    </>
  );
}
