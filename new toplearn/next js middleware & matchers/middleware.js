import {NextResponse} from 'next/server'

// export function middleware(request){
//     return NextResponse.redirect(new URL("/quiz",request.url))
//     return NextResponse.rewrite(new URL("/under-construction", request.url));

//     //or
//     if(request.nextUrl.pathname.startsWith("/about")){
//         return NextResponse.redirect(new URL("/quiz",request.url))
//     }

// }

// export const config = {
//     matcher: "/about/:path*",
// };

// export const config = {
//     matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
// };
export function middleware(request) {
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-hello-from-middleware1", "hello");

    // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
    // Getting cookies from the request using the `RequestCookies` API
    let cookie = request.cookies.get("nextjs");
    console.log(cookie,"ccccccccc"); // => { name: 'nextjs', value: 'fast', Path: '/' }
    const allCookies = request.cookies.getAll();
    console.log(allCookies,"alllllllll"); // => [{ name: 'nextjs', value: 'fast' }]

   let check= request.cookies.has("nextjs"); // => true
   console.log(check,"check");
    request.cookies.delete("nextjs");
    request.cookies.has("nextjs"); // => false

    // Setting cookies on the response using the `ResponseCookies` API
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
    // Set a new response header `x-hello-from-middleware2`
    response.headers.set("x-hello-from-middleware2", "hellowwww");

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
