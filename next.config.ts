import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old English service flow URLs → new wizard
      {
        source: "/templates/service-flow/:path*",
        destination: "/service",
        permanent: true,
      },
      // Old English contact form
      {
        source: "/templates/contact-form.html",
        destination: "/contact",
        permanent: true,
      },
      // Old English success/error
      {
        source: "/templates/success.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/templates/error.html",
        destination: "/",
        permanent: true,
      },
      // Old Spanish service flow URLs → new wizard
      {
        source: "/es/templates/flujo-de-servicio/:path*",
        destination: "/es/service",
        permanent: true,
      },
      // Old Spanish contact form
      {
        source: "/es/templates/forma-de-contacto.html",
        destination: "/es/contact",
        permanent: true,
      },
      // Old Spanish success/error
      {
        source: "/es/templates/exito.html",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/es/templates/error.html",
        destination: "/es",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
