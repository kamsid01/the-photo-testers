"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/hassanfullstackdev@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-md text-green-800 my-8">
        Thanks, we'll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-8 max-w-lg font-sans">
      <input type="text" name="_honey" style={{ display: "none" }} />
      <input type="hidden" name="_captcha" value="false" />
      
      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-ink">Name</label>
        <input 
          id="name"
          name="name" 
          type="text" 
          required 
          className="px-4 py-3 rounded-md border border-[#E5E5E2] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg text-ink shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-ink">Email</label>
        <input 
          id="email"
          name="email" 
          type="email" 
          required 
          className="px-4 py-3 rounded-md border border-[#E5E5E2] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg text-ink shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink">Message</label>
        <textarea 
          id="message"
          name="message" 
          required 
          rows={5}
          className="px-4 py-3 rounded-md border border-[#E5E5E2] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg text-ink shadow-sm resize-y"
        />
      </div>

      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="mt-2 px-6 py-3 bg-[#2563EB] text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 self-start"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
