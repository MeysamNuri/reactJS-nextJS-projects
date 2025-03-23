import {NextResponse} from 'next/server'

// export function middleware(request){
//     // if(request.nextUrl.pathname.startsWith("/about")){
//     //     return NextResponse.redirect(new URL("/quiz",request.url))
//     // }
//      return NextResponse.redirect(new URL("/quiz",request.url))
 
//     // return NextResponse.rewrite(new URL("/under-construction",request.url))
// }
// export const config={
//     matcher:["/about/:path*","/api/:path*"]
//     // matcher:'/((?!api|_next/static|favicon.ico|about).*)', //you can find this regex in google by search(regex ignore pages in next)
// }

export function middleware(request) {
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-hello-from-middleware1", "hello");

    // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
    // Getting cookies from the request using the `RequestCookies` API
    let cookie = request.cookies.get("nextjs");
    console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
    const allCookies = request.cookies.getAll();
    console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

    request.cookies.has("nextjs"); // => true
    request.cookies.delete("nextjs");
    request.cookies.has("nextjs"); // => false

    // Setting cookies on the response using the `ResponseCookies` API
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
    // Set a new response header `x-hello-from-middleware2`
    response.headers.set("x-hello-from-middleware2", "hello");

    response.cookies.set("vercel", "fast");
    response.cookies.set({
        name: "vercel",
        value: "fast",
        path: "/",
    });
    cookie = response.cookies.get("vercel");
    console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
    // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

    return response;
}