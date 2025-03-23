import Link from "next/link";

export default function Home() {
  return (
    <main >
      <h2>    hellow world meysam
      </h2>
      <Link href={{
        pathname:"/about",
        query:{name:"meysam"}
      }}>درباره من</Link>
    </main>
  )
}
