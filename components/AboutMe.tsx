import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AboutMe() {
  const t = useTranslations("about");
  const popupsT = useTranslations("popups");

  return (
    <>
      <section id="section-about-me" className="about-me">
        <picture>
          <source srcSet="/img/plate1-x2.jp2" type="image/jp2" />
          <img
            src="/img/plate1-x2.png"
            alt={t("altChefTulum")}
            className="about-me__plate"
          />
        </picture>
        <div className="about-me__background"></div>
        <div className="about-me__text-container">
          <div className="about-me__text-container--title u-margin-bottom-small">
            <img src="/img/title_line.png" alt={t("altChefTulum")} />
            <h2 className="heading--2">{t("title")}</h2>
          </div>
          <div className="about-me__text-container--description">
            <p className="paragraph-1 u-margin-bottom-medium">{t("intro")}</p>
            <p className="u-margin-bottom-small">{t("bio")}</p>
            <div className="btn-wrapper u-margin-bottom-medium">
              <a href="#popup-about-me" className="btn-line">
                {t("more")}
              </a>
            </div>
          </div>
          <div className="about-me__text-container--button">
            <Link href="/service" className="btn btn--primary">
              {t("getQuote")}
            </Link>
          </div>
        </div>
        <div className="about-me__img-container">
          <picture>
            <source
              srcSet="/img/alexphoto-x1.jp2"
              type="image/jp2"
              media="(max-width: 37.5em)"
            />
            <source srcSet="/img/alexphoto-x2.jp2" type="image/jp2" />
            <source
              srcSet="/img/alexphoto-x1.png"
              media="(max-width: 37.5em)"
            />
            <img
              src="/img/alexphoto-x2.png"
              alt={t("altPrivateChef")}
              className="about-me__img-container--img"
            />
          </picture>
        </div>
      </section>

      <div className="popup" id="popup-about-me">
        <div className="popup__container">
          <a href="#section-about-me" className="popup__close">
            &times;
          </a>
          <div className="popup__left">
            <h2 className="popup__heading heading--2 u-margin-bottom-big">
              {popupsT("aboutMe.title")}
            </h2>
            <p className="popup__text u-margin-bottom-big">
              {popupsT("aboutMe.text")}
            </p>
            <Link href="/service" className="btn btn--primary">
              {popupsT("aboutMe.button")}
            </Link>
          </div>
          <div className="popup__right">
            <picture>
              <source
                srcSet="/img/about-me-x1.jp2"
                type="image/jp2"
                media="(max-width: 37.5em)"
              />
              <source srcSet="/img/about-me-x2.jp2" type="image/jp2" />
              <source
                srcSet="/img/about-me-x1.jpg"
                media="(max-width: 37.5em)"
              />
              <img
                srcSet="/img/about-me-x1.jpg 1x, /img/about-me-x2.jpg 2x"
                className="popup__img--about-me"
                alt={popupsT("aboutMe.alt")}
              />
            </picture>
          </div>
        </div>
      </div>
    </>
  );
}
