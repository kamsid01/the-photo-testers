import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-bg">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-ink">
          <Link href="/">
            <img src="/logo.svg" alt="The Photo Testers" className="h-6 w-auto grayscale opacity-80" />
          </Link>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted">
          <Link href="/blog" className="hover:text-accent transition-colors">All Articles</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          <Link href="/how-we-review" className="hover:text-accent transition-colors">How we review</Link>
          <Link href="/affiliate-disclosure" className="hover:text-accent transition-colors">Affiliate disclosure</Link>
          <Link href="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
