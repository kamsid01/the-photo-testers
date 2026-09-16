import React from 'react';

export function AuthorBox() {
  return (
    <div className="mt-16 pt-10 border-t border-border">
      <div className="bg-surface rounded-xl p-6 md:p-8 border border-border shadow-sm flex flex-col md:flex-row gap-6 items-start">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-accent-tint rounded-full flex-shrink-0 flex items-center justify-center text-accent text-2xl font-bold">
          <img src="/logo.svg" alt="The Photo Testers" className="h-8 w-auto grayscale opacity-80" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-ink mb-2">Tested by The Photo Testers Team</h3>
          <p className="text-muted text-base leading-relaxed mb-4">
            Every software tool reviewed on The Photo Testers is installed, configured, and tested with real photography workflows. We evaluate usability, speed, and real-world value. We do not accept sponsored placements or paid reviews.
          </p>
          <div className="bg-bg p-4 rounded-lg border border-border text-sm text-ink space-y-2">
            <p><strong>Methodology:</strong> Independent hands-on testing</p>
            <p><strong>Pricing:</strong> Verified at time of publishing</p>
            <p><strong>Commitment:</strong> Honest, photographer-first recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
