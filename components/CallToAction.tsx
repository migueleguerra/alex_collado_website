import { useTranslations } from "next-intl";

export default function CallToAction() {
  const t = useTranslations("cta");

  return (
    <section className="form" id="section-form">
      <div className="form__container">
        <picture>
          <source srcSet="/img/plate3-x2.jp2" type="image/jp2" />
          <img
            srcSet="/img/plate3-x1.png 1x, /img/plate3-x2.png 2x"
            className="u-margin-bottom-medium"
            alt={t("altImage")}
          />
        </picture>
        <h2 className="heading--3 u-margin-bottom-medium">{t("heading")}</h2>
        <a href="#section-service" className="btn btn--primary">
          {t("button")}
        </a>
      </div>
    </section>
  );
}
