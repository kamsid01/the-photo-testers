'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type TopicKey = 'correction' | 'suggestion' | 'general';

interface TopicOption {
  id: TopicKey;
  label: string;
  help: string;
}

const TOPICS: TopicOption[] = [
  { id: 'correction', label: 'Correction', help: 'Something out of date or wrong in an article' },
  { id: 'suggestion', label: 'Suggest a tool', help: 'Software you’d like us to cover' },
  { id: 'general', label: 'General question', help: 'Anything else, including affiliate questions' },
];

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialTopic = (searchParams.get('topic') as TopicKey) || 'general';

  const [topic, setTopic] = useState<TopicKey>(
    ['correction', 'suggestion', 'general'].includes(initialTopic) ? initialTopic : 'general'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get('topic') as TopicKey;
    if (t && ['correction', 'suggestion', 'general'].includes(t)) {
      setTopic(t);
    }
  }, [searchParams]);

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errs.name = 'Enter your name.';
    if (!email.trim()) {
      errs.email = 'Enter your email address so we can reply.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Enter an email address like name@example.com.';
    }
    if (message.trim().length < 10) {
      errs.message = 'Write a message of at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors(null);
    setSubmitting(true);

    const topicLabel = TOPICS.find((t) => t.id === topic)?.label || topic;
    const subject = `The Photo Testers: Contact Form [${topicLabel}]`;

    try {
      const res = await fetch('https://formsubmit.co/ajax/hassanfullstackdev@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          topic: topicLabel,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      setSent(true);
    } catch (err) {
      setSendError(
        'Your message could not be sent right now. Please check your connection and try submitting the form again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors(null);
    setSent(false);
    setSendError(null);
  };

  const firstName = name.trim().split(' ')[0] || 'there';
  const topicNoun = { correction: 'correction', suggestion: 'tool suggestion', general: 'message' }[topic];
  const msgHelp =
    topic === 'correction'
      ? 'Include the article and what needs changing. A link to the source helps.'
      : topic === 'suggestion'
      ? 'Tell us the tool and what you’d use it for.'
      : 'How can we help?';

  if (sent) {
    return (
      <div
        role="status"
        tabIndex={-1}
        className="bg-white border border-[#DFE2DB] border-t-2 border-t-[#1F6B3A] rounded p-7 outline-none"
      >
        <p className="m-0 mb-2 font-serif text-[28px] leading-[1.2] text-[#20221F]">
          Thanks, {firstName}.
        </p>
        <p className="m-0 mb-1.5 text-[16px] leading-[1.55] text-[#20221F]">
          Your {topicNoun} has been received by our editorial inbox.
        </p>
        <p className="m-0 mb-4 text-[16px] leading-[1.55] text-[#4A4E49]">
          We review incoming messages regularly and will reply directly to {email} if your inquiry requires a response.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="h-11 px-4 border border-[#B9BDB4] bg-white rounded font-semibold text-[15px] text-[#20221F] hover:border-[#20221F] cursor-pointer"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-[#DFE2DB] rounded p-5 sm:p-8"
    >
      {errors && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          tabIndex={-1}
          className="m-0 mb-5 p-3.5 px-4 border border-[#F1B8B2] bg-[#FDF2F1] rounded text-[15px] text-[#7A1D14] outline-none"
        >
          <strong>Please check the fields marked below.</strong>
        </div>
      )}

      {sendError && (
        <div
          role="alert"
          className="m-0 mb-5 p-3.5 px-4 border border-[#F1B8B2] bg-[#FDF2F1] rounded text-[15px] text-[#7A1D14]"
        >
          <strong>{sendError}</strong>
        </div>
      )}

      <fieldset className="border-0 m-0 mb-5 p-0">
        <legend className="text-[15px] font-semibold text-[#20221F] mb-2.5 p-0">
          What is this about?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {TOPICS.map((t) => {
            const isChecked = topic === t.id;
            return (
              <label
                key={t.id}
                className={`block p-3 border rounded cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-[#3159D7] bg-[#EEF2FC]'
                    : 'border-[#DFE2DB] bg-white hover:border-[#3159D7]'
                }`}
              >
                <span className="flex items-center gap-2.5 font-semibold text-[15px] text-[#20221F]">
                  <input
                    type="radio"
                    name="topic"
                    value={t.id}
                    checked={isChecked}
                    onChange={() => setTopic(t.id)}
                    className="m-0 w-4 h-4 accent-[#3159D7]"
                  />
                  {t.label}
                </span>
                <span className="block mt-1 pl-6 text-[13.5px] leading-[1.4] text-[#60645F]">
                  {t.help}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-name" className="block text-[15px] font-semibold text-[#20221F] mb-1.5">
            Name
          </label>
          <input
            id="c-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors?.name ? 'true' : 'false'}
            aria-describedby={errors?.name ? 'c-name-err' : undefined}
            className={`w-full h-11 px-3 border rounded text-[16px] bg-white outline-none focus:border-[#3159D7] ${
              errors?.name ? 'border-[#B42318]' : 'border-[#B9BDB4]'
            }`}
          />
          {errors?.name && (
            <p id="c-name-err" className="mt-1.5 text-[14px] text-[#B42318]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-email" className="block text-[15px] font-semibold text-[#20221F] mb-1.5">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors?.email ? 'true' : 'false'}
            aria-describedby={errors?.email ? 'c-email-err' : undefined}
            className={`w-full h-11 px-3 border rounded text-[16px] bg-white outline-none focus:border-[#3159D7] ${
              errors?.email ? 'border-[#B42318]' : 'border-[#B9BDB4]'
            }`}
          />
          {errors?.email && (
            <p id="c-email-err" className="mt-1.5 text-[14px] text-[#B42318]">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="c-msg" className="block text-[15px] font-semibold text-[#20221F] mb-1">
          Message
        </label>
        <p id="c-msg-help" className="m-0 mb-1.5 text-[14px] text-[#60645F]">
          {msgHelp}
        </p>
        <textarea
          id="c-msg"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={errors?.message ? 'true' : 'false'}
          aria-describedby={`c-msg-help ${errors?.message ? 'c-msg-err' : ''}`}
          className={`w-full p-3 border rounded text-[16px] leading-[1.5] bg-white resize-y outline-none focus:border-[#3159D7] ${
            errors?.message ? 'border-[#B42318]' : 'border-[#B9BDB4]'
          }`}
        />
        {errors?.message && (
          <p id="c-msg-err" className="mt-1.5 text-[14px] text-[#B42318]">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-5">
        <button
          type="submit"
          disabled={submitting}
          className="h-12 px-6 bg-[#3159D7] text-white rounded font-semibold text-[16px] hover:bg-[#2547B5] cursor-pointer disabled:opacity-60 transition-colors"
        >
          {submitting ? 'Sending...' : 'Send message'}
        </button>
        <p className="m-0 text-[14px] text-[#60645F]">
          Delivered straight to the editorial team.
        </p>
      </div>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="p-8 bg-white border border-[#DFE2DB] rounded">Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
