import Link from "next/link";

export default function Home() {

  const id = '6639c2371d02725774765f0b'
  return (
    <div>
      <Link href={`/board/${id}`}>К доске</Link>
    </div>
  );
}
