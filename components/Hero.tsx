import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("header");

  return (
    <header className="header">
      <div className="header__background"></div>
      <div className="header__text-container">
        <div className="header__container">
          <h1 className="heading--1 header__text-container--h1 u-margin-bottom-medium">
            {t("title")}
          </h1>
          <p className="paragraph-1 paragraph-1--primary header__text-container--p u-margin-bottom-medium">
            {t("description")}
          </p>
          <div className="header__text-container--buttons">
            <Link href="/service" className="btn btn--primary">
              {t("getService")}
            </Link>
            <a href="#section-form" className="btn btn--secondary btn-contact">
              {t("contactMe")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
