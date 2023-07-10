import Link from 'next/link'

const HomePage = () => {
  return (
    <div>
      <h1>V2 Pre</h1>
      <Link href="/v2-pre/battlesuits">Battlesuits</Link>
      <Link href="/v2-pre/weapons">Weapons</Link>
      <Link href="/v2-pre/stigmata">Stigmata</Link>
    </div>
  )
}

export default HomePage
