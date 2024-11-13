export function GET(request) {
    const searchQuery = request.nextUrl.searchParams

    const query = searchQuery.get("toplearn")
    console.log(query, "query");
    return new Response(`new query is: ${query}`)
}