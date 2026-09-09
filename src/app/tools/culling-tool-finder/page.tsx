import { Metadata } from 'next';
import Link from 'next/link';
import { CullingToolFinder } from '../../../components/CullingToolFinder';

export const metadata: Metadata = {
  title: 'Which AI Culling Tool Is Right For You?',
  description: 'Take our free quiz to find the perfect AI photo culling software for your workflow, whether you need maximum speed, creative control, or offline access.',
};

export default function CullingToolFinderPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
          Which AI Culling Tool Is Right For You?
        </h1>
        <p className="text-lg text-muted">
          With so many AI culling options on the market, it can be tough to know where to start. Answer 5 quick questions about your workflow, and we'll match you with the software that best fits your needs and budget.
        </p>
      </header>

      <CullingToolFinder />

      <article className="prose prose-lg prose-headings:text-ink prose-a:text-accent hover:prose-a:text-accent-dark max-w-3xl mx-auto mt-20 pt-12 border-t border-border">
        <h2>How to choose a culling tool</h2>
        <p>
          Choosing the right culling software depends entirely on how you work. If you shoot high volume weddings and need everything done for you in one fell swoop, an all-in-one AI tool that handles both selecting and editing is often the most cost-effective route. But if you prefer absolute control over which images make the final cut, you might prefer a tool that simply flags blinking eyes and blurred faces but leaves the final decision in your hands.
        </p>
        <p>
          It is also important to consider your internet connection. Many modern AI tools rely on cloud processing, which means you cannot cull on a plane or in a remote cabin without Wi-Fi. If offline capability is a strict requirement for your workflow, you will need to look closely at tools like Photo Mechanic or software that runs AI models entirely on your local machine.
        </p>
        
        <h3 className="mt-12">Dive deeper into our reviews:</h3>
        <ul>
          <li>
            <Link href="/best-ai-culling-editing-software">Best AI Culling & Editing Software</Link> - Read our deep dive into the top all-in-one platforms like Aftershoot and Imagen AI.
          </li>
          <li>
            <Link href="/best-photo-culling-software">Best Photo Culling Software</Link> - Explore options like Narrative Select and Photo Mechanic for blazing fast, dedicated culling.
          </li>
          <li>
            <Link href="/filterpixel-alternatives">FilterPixel Alternatives</Link> - See how budget friendly options stack up against the premium competition.
          </li>
        </ul>
      </article>
    </div>
  );
}
