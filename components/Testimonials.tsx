import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const popupsT = useTranslations("popups");

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
              <a href="#popup-testimonial-1" className="btn-line">
                {t("testimonial1.more")}
              </a>
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

      {/* Testimonial Popup */}
      <div className="popup" id="popup-testimonial-1">
        <div className="popup__container popup__container--testimonials">
          <a href="#section-testimonials" className="popup__close">
            &times;
          </a>
          <p>{popupsT("testimonial1Full.text")}</p>
        </div>
      </div>
    </>
  );
}
