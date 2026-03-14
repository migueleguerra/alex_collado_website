import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: {
    mode: "as-needed", // No /en prefix for English, /es for Spanish
  },
});
