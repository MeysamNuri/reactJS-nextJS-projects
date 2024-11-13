import { NextResponse } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en-us", "en", "fa-ir", "fa"];

function getLocale(request) {
    const negotiatorHeader = {};
    request.headers.forEach((value, key) => (negotiatorHeader[key] = value));
    // console.log(`negotiatorHeader: ${negotiatorHeader}`);
    const languages = new Negotiator({ headers: negotiatorHeader }).languages();
    // console.log(`Languages: ${languages}`);

    const defaultLocale = "fa-ir";
    const locale = match(languages, locales, defaultLocale);
    // console.log(`Locale: ${locale}`);

    return locale;
}

export function middleware(request) {
    const {pathname}=request.nextUrl
    console.log(pathname,"pathname");
    const pathnameHasLocal=locales.some((local)=>pathname.startsWith(`/${local}`)||pathname===`/${local}`)

    if(pathnameHasLocal) return;
    const locale = getLocale(request);
  console.log(locale,"locale");
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/")?"":"/"}${pathname}`,request.url))

}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
