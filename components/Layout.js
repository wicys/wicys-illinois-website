import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ title, description, children }) {
  const pageTitle = title ? `${title} | WiCyS Illinois` : "WiCyS Illinois";
  return <><Head><title>{pageTitle}</title><meta name="description" content={description || "Women in CyberSecurity at the University of Illinois Urbana-Champaign."} /><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="icon" href="/favicon.ico" /></Head><Header /><main>{children}</main><Footer /></>;
}
