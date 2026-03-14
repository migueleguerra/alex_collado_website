import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Services() {
  const t = useTranslations("services");
  const popupsT = useTranslations("popups");

  return (
    <>
      <section id="section-service" className="services">
        <div className="services__title">
          <img src="/img/title_line.png" alt={t("altImage")} />
          <h2 className="heading--2 u-margin-bottom-small">{t("title")}</h2>
          <p className="paragraph-1 u-margin-bottom-big">{t("subtitle")}</p>
        </div>
        <div className="services__cards u-margin-bottom-medium">
          {/* Private Chef */}
          <a
            href="#popup-private-chef"
            className="services__cards--container"
          >
            <div className="services__cards--container__background"></div>
            <picture>
              <source
                srcSet="/img/private-chef-x1.jp2"
                type="image/jp2"
                media="(max-width: 37.5em)"
              />
              <source srcSet="/img/private-chef-x2.jp2" type="image/jp2" />
              <source
                srcSet="/img/private-chef-x1.png"
                media="(max-width: 37.5em)"
              />
              <img
                src="/img/private-chef-x2.png"
                className="services__cards--container__private-chef-img"
                alt={t("privateChef.alt")}
              />
            </picture>
            <div className="services__cards--container__text">
              <h3 className="heading--3 u-margin-bottom-small">
                {t("privateChef.title")}
              </h3>
              <p className="paragraph-1">{t("privateChef.description")}</p>
            </div>
          </a>

          {/* Cooking Experience */}
          <a
            href="#popup-cooking-classes"
            className="services__cards--container"
          >
            <div className="services__cards--container__background"></div>
            <picture>
              <source
                srcSet="/img/cooking-classes-x1.jp2"
                type="image/jp2"
                media="(max-width: 37.5em)"
              />
              <source
                srcSet="/img/cooking-classes-x2.jp2"
                type="image/jp2"
              />
              <source
                srcSet="/img/cooking-classes-x1.jpg"
                media="(max-width: 37.5em)"
              />
              <img
                srcSet="/img/cooking-classes-x1.jpg 1x, /img/cooking-classes-x2.jpg 2x"
                className="services__cards--container__cooking-classes-img"
                alt={t("cookingExperience.alt")}
              />
            </picture>
            <div className="services__cards--container__text">
              <h3 className="heading--3 u-margin-bottom-small">
                {t("cookingExperience.title")}
              </h3>
              <p className="paragraph-1">
                {t("cookingExperience.description")}
              </p>
            </div>
          </a>

          {/* Mezcal Experience */}
          <a
            href="#popup-mezcal-experience"
            className="services__cards--container"
          >
            <div className="services__cards--container__background"></div>
            <picture>
              <source
                srcSet="/img/mezcal-experience-x1.jp2"
                type="image/jp2"
                media="(max-width: 37.5em)"
              />
              <source
                srcSet="/img/mezcal-experience-x2.jp2"
                type="image/jp2"
              />
              <source
                srcSet="/img/mezcal-experience-x1.png"
                media="(max-width: 37.5em)"
              />
              <img
                src="/img/mezcal-experience-x2.png"
                className="services__cards--container__mezcal-experience-img"
                alt={t("mezcalExperience.alt")}
              />
            </picture>
            <div className="services__cards--container__text">
              <h3 className="heading--3 u-margin-bottom-small">
                {t("mezcalExperience.title")}
              </h3>
              <p className="paragraph-1">
                {t("mezcalExperience.description")}
              </p>
            </div>
          </a>
        </div>
        <div className="services__button">
          <Link href="/service" className="btn btn--primary">
            {t("getService")}
          </Link>
        </div>
      </section>

      {/* Private Chef Popup */}
      <div className="popup" id="popup-private-chef">
        <div className="popup__container">
          <a href="#section-service" className="popup__close">
            &times;
          </a>
          <div className="popup__left">
            <h2 className="popup__heading heading--2 u-margin-bottom-medium">
              {popupsT("privateChef.title")}
            </h2>
            <p className="popup__text paragraph-1 u-margin-bottom-big">
              {popupsT("privateChef.text")}
            </p>
            <Link href="/service" className="btn btn--primary">
              {popupsT("privateChef.button")}
            </Link>
          </div>
          <div className="popup__right">
            <div className="popup__right--container">
              <div className="popup__img-chef--1"></div>
              <div className="popup__img-chef--2"></div>
              <div className="popup__img-chef--3"></div>
              <div className="popup__img-chef--4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cooking Classes Popup */}
      <div className="popup" id="popup-cooking-classes">
        <div className="popup__container">
          <a href="#section-service" className="popup__close">
            &times;
          </a>
          <div className="popup__left">
            <h2 className="popup__heading heading--2 u-margin-bottom-medium">
              {popupsT("cookingExperience.title")}
            </h2>
            <p className="popup__text paragraph-1 u-margin-bottom-big">
              {popupsT("cookingExperience.text")}
            </p>
            <p className="paragraph-1--tertiary u-margin-bottom-big">
              {popupsT("cookingExperience.duration")}
            </p>
            <Link href="/service" className="btn btn--primary">
              {popupsT("cookingExperience.button")}
            </Link>
          </div>
          <div className="popup__right">
            <div className="popup__right--container">
              <div className="popup__img-cooking--1"></div>
              <div className="popup__img-cooking--2"></div>
              <div className="popup__img-cooking--3"></div>
              <div className="popup__img-cooking--4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mezcal Experience Popup */}
      <div className="popup" id="popup-mezcal-experience">
        <div className="popup__container">
          <a href="#section-service" className="popup__close">
            &times;
          </a>
          <div className="popup__left">
            <h2 className="popup__heading heading--2 u-margin-bottom-medium">
              {popupsT("mezcalExperience.title")}
            </h2>
            <p className="popup__text paragraph-1 u-margin-bottom-big">
              {popupsT("mezcalExperience.text")}
            </p>
            <p className="paragraph-1--tertiary u-margin-bottom-big">
              {popupsT("mezcalExperience.duration")}
            </p>
            <Link href="/service" className="btn btn--primary">
              {popupsT("mezcalExperience.button")}
            </Link>
          </div>
          <div className="popup__right">
            <div className="popup__right--container">
              <div className="popup__img-mezcal--1"></div>
              <div className="popup__img-mezcal--2"></div>
              <div className="popup__img-mezcal--3"></div>
              <div className="popup__img-mezcal--4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
