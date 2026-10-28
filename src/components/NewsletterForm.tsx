"use client";

import React, { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setErr('Enter your email address.');
      return;
    }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setErr('That doesn’t look like an email address. Check for a missing @ or domain.');
      return;
    }

    setErr('');
    setStatus('submitting');

    try {
      const res = await fetch('https://formsubmit.co/ajax/hassanfullstackdev@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'The Photo Testers: Newsletter Signup',
          _honey: '',
          _captcha: 'false',
          email: trimmed,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErr('Unable to submit right now. Please try again.');
      }
    } catch {
      setStatus('error');
      setErr('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        style={{
          padding: '18px 20px',
          background: '#FFFFFF',
          border: '1px solid #DFE2DB',
          borderRadius: '4px',
        }}
      >
        <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '16px' }}>
          Thanks. Your signup request was sent.
        </p>
        <p style={{ margin: '0 0 10px', fontSize: '15px', color: '#4A4E49' }}>
          We’ve passed {email} to the editors, who will add it to our update list. You won’t receive an automatic confirmation email.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setEmail('');
            setErr('');
          }}
          style={{
            background: 'none',
            border: 0,
            padding: 0,
            color: '#2A4EC2',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          Use a different address
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label
        htmlFor="news-email"
        style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: 600,
          marginBottom: '8px',
        }}
      >
        Email address
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <input
          id="news-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (err) setErr('');
          }}
          aria-invalid={err ? 'true' : 'false'}
          aria-describedby="news-help"
          placeholder="you@studio.com"
          style={{
            flex: '1 1 220px',
            minWidth: 0,
            height: '48px',
            padding: '0 14px',
            border: `1px solid ${err ? '#B42318' : '#B9BDB4'}`,
            borderRadius: '4px',
            background: '#FFFFFF',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="pt-hover-btn-primary"
          style={{
            height: '48px',
            padding: '0 22px',
            background: '#20221F',
            color: '#FFFFFF',
            border: 0,
            borderRadius: '4px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '16px',
            opacity: status === 'submitting' ? 0.7 : 1,
          }}
        >
          {status === 'submitting' ? 'Submitting…' : 'Subscribe'}
        </button>
      </div>
      <p
        id="news-help"
        aria-live="polite"
        style={{
          margin: '8px 0 0',
          fontSize: '14px',
          color: err ? '#B42318' : '#60645F',
        }}
      >
        {err || 'Occasional updates. Request removal at any time by replying or emailing hello@thephototesters.com.'}
      </p>
    </form>
  );
}
