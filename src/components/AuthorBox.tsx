import React from 'react';

export function AuthorBox({ authorName }: { authorName: string }) {
  return (
    <div className="mt-16 pt-10 border-t border-border">
      <div className="bg-surface rounded-xl p-6 md:p-8 border border-border shadow-sm flex flex-col md:flex-row gap-6 items-start">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-accent-tint rounded-full flex-shrink-0 flex items-center justify-center text-accent text-2xl font-bold">
          {authorName.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-ink mb-2">Tested by {authorName}</h3>
          <p className="text-muted text-base leading-relaxed mb-4">
            {authorName} is a professional wedding and portrait photographer. Every software tool reviewed on The Photo Testers is installed, configured, and tested with real client galleries, high-volume RAW files, and actual workflow conditions. We do not accept sponsored placements.
          </p>
          <div className="bg-bg p-4 rounded-lg border border-border text-sm text-ink space-y-2">
            <p><strong>Testing Environment:</strong> Mac Studio (M2 Max), macOS 14</p>
            <p><strong>Test Data:</strong> 2,000+ Sony A7IV RAW files</p>
            <p><strong>Review Policy:</strong> Independent hands-on testing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
