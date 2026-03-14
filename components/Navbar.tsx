"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const checkboxRef = useRef<HTMLInputElement>(null);

  const closeMenu = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <nav className="nav">
      <input
        type="checkbox"
        className="nav__checkbox"
        id="nav-toggle"
        ref={checkboxRef}
      />
      <label htmlFor="nav-toggle" className="nav__button">
        <div className="nav__icon">&nbsp;</div>
      </label>
      <div className="nav__background">&nbsp;</div>
      <div className="nav__container">
        <ul className="nav__links">
          <li className="nav__item">
            <a
              href="#section-about-me"
              className="nav__link"
              onClick={closeMenu}
            >
              {t("about")}
            </a>
          </li>
          <li className="nav__item">
            <a
              href="#section-service"
              className="nav__link"
              onClick={closeMenu}
            >
              {t("services")}
            </a>
          </li>
          <li className="nav__item">
            <Link href="/contact" className="nav__link" onClick={closeMenu}>
              {t("contact")}
            </Link>
          </li>
          <li className="nav__item">
            <a
              rel="noopener"
              href="https://medium.com/@alex.chefco"
              target="_blank"
              className="nav__link"
              onClick={closeMenu}
            >
              {t("blog")}
            </a>
          </li>
          <li className="nav__languages">
            <Link
              href={pathname}
              locale="en"
              className={`nav__link${locale === "en" ? " nav__link--selected" : ""}`}
              onClick={closeMenu}
            >
              {t("english")}
            </Link>
            <Link
              href={pathname}
              locale="es"
              className={`nav__link${locale === "es" ? " nav__link--selected" : ""}`}
              onClick={closeMenu}
            >
              {t("spanish")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
