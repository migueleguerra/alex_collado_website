import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { locales } from "@/i18n/config";
import { Heebo, Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-heebo",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-roboto",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords:
      "Alex Collado, Chef, Private Chef, Cooking Classes, Mezcal Experience, Playa del Carmen, Tulum, Riviera Maya, Puerto Morelos, Mexico",
    authors: [{ name: "Alex Collado" }],
    icons: {
      icon: "/img/favicon-chef.png",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: locale === "es" ? "https://www.alexchefco.com.mx/es" : "https://www.alexchefco.com.mx",
      siteName: "Alex Collado",
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: locale === "es" ? "https://www.alexchefco.com.mx/es" : "https://www.alexchefco.com.mx",
      languages: {
        en: "https://www.alexchefco.com.mx",
        es: "https://www.alexchefco.com.mx/es",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${heebo.variable} ${roboto.variable}`}>
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="container" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
