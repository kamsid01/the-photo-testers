import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-border py-4 bg-bg">
      <div className="container mx-auto px-6 flex justify-between items-center max-w-5xl">
        <Link href="/">
          <img src="/logo.svg" alt="The Photo Testers" className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-ink">
          <Link href="/blog" className="hover:text-accent transition-colors">All Articles</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          <Link href="/how-we-review" className="hover:text-accent transition-colors">How we review</Link>
        </nav>
      </div>
    </header>
  );
}
