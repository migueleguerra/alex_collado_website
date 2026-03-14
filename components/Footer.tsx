import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__contact">
          <div className="footer__contact--phone">
            <svg className="footer__contact--icon">
              <use xlinkHref="/icons/sprite.svg#icon-phone"></use>
            </svg>
            <a
              className="footer__contact--a paragraph-1"
              href="tel:+529841796461"
            >
              {t("phone1")}
            </a>
          </div>
          <div className="footer__contact--phone">
            <svg className="footer__contact--icon">
              <use xlinkHref="/icons/sprite.svg#icon-phone"></use>
            </svg>
            <a
              className="footer__contact--a paragraph-1"
              href="tel:+16508622105"
            >
              {t("phone2")}
            </a>
          </div>
          <div className="footer__contact--email">
            <svg className="footer__contact--icon">
              <use xlinkHref="/icons/sprite.svg#icon-envelope"></use>
            </svg>
            <a
              className="footer__contact--a paragraph-1"
              href="mailto:alex.chefco@gmail.com"
            >
              {t("email")}
            </a>
          </div>
        </div>
        <div className="footer__copyright">
          <p>
            {t.rich("copyright", {
              link: (chunks) => (
                <a
                  href="https://miguelguerra.mx"
                  target="_blank"
                  rel="noopener"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
        <div className="footer__social">
          <a
            href="https://www.instagram.com/alexchef.co/"
            target="_blank"
            rel="noopener"
          >
            <svg className="footer__social--icon">
              <use xlinkHref="/icons/sprite.svg#icon-instagram"></use>
            </svg>
          </a>
          <a
            href="https://medium.com/@alex.chefco"
            target="_blank"
            rel="noopener"
          >
            <svg className="footer__social--icon--medium">
              <use xlinkHref="/icons/sprite.svg#icon-medium"></use>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/Alex-ChefCo-101088847993358"
            target="_blank"
            rel="noopener"
          >
            <svg className="footer__social--icon footer__social--icon--facebook">
              <use xlinkHref="/icons/sprite.svg#icon-facebook"></use>
            </svg>
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=+529841796461"
            target="_blank"
            rel="noopener"
          >
            <svg className="footer__social--icon">
              <use xlinkHref="/icons/sprite.svg#icon-whatsapp"></use>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
