import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { Heebo, Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

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
      "private chef, playa del carmen, tulum, riviera maya, cooking classes, mezcal experience",
    authors: [{ name: "Alex Collado" }],
    icons: {
      icon: "/img/favicons/favicon.ico",
    },
    alternates: {
      languages: {
        en: "/",
        es: "/es",
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
