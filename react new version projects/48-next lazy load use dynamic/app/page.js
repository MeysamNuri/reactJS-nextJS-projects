import Link from "next/link";

export default function Home() {
  return (
    <main >
      <h2 className="text-center underline">    تست فونت وزیر
      </h2>
      <Link href={{
        pathname:"/about",
        query:{name:"meysam"}
      }}>درباره من</Link>

<h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </main>
  )
}
