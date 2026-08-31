"use client";

import React, { createContext, useContext, useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { sendGTMEvent } from "@next/third-parties/google";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-data";

function getHeallyUtmSource() {
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return `utm-${hostname}`;
}

const fieldEnter = "enter-fade-up-sm";

function staggerDelay(index: number) {
  return { animationDelay: `${50 + index * 100}ms` };
}

function validateName(value: string) {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2 || parts.some((part) => !/^[a-zA-Z'-]+$/.test(part))) {
    return "Please enter your first and last name.";
  }
  return null;
}

function validateEmail(value: string) {
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
    return "Please enter a valid email address.";
  }
  return null;
}

function validatePhone(value: string) {
  if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
    return "Please enter a valid phone number (e.g., 999-999-9999).";
  }
  return null;
}

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length > 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length > 3) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return digits;
}

type LeadErrors = {
  name?: string;
  email?: string;
  phone?: string;
  termsAccepted?: string;
};

export function LeadCaptureForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({ ...prev, name: validateName(value) ?? undefined }));
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) ?? undefined }));
  }

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setErrors((prev) => ({ ...prev, phone: validatePhone(formatted) ?? undefined }));
  }

  function handleTermsAcceptedChange(checked: boolean) {
    setTermsAccepted(checked);
    setErrors((prev) => ({
      ...prev,
      termsAccepted: checked ? undefined : prev.termsAccepted,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const termsAcceptedError = termsAccepted
      ? null
      : "Please accept the Terms and Conditions to continue.";

    setErrors({
      name: nameError ?? undefined,
      email: emailError ?? undefined,
      phone: phoneError ?? undefined,
      termsAccepted: termsAcceptedError ?? undefined,
    });

    if (nameError || emailError || phoneError || termsAcceptedError) {
      return;
    }

    setSubmitting(true);

    const heallyUtmSource = getHeallyUtmSource();
    const nameParts = name.trim().split(/\s+/);
    const payload = {
      first_name: nameParts[0],
      last_name: nameParts.slice(1).join(" "),
      email: email.trim().toLowerCase(),
      phone,
      state: "CA",
      state_of_evaluation: "CA",
      timezone: "PST",
      extra_data: {
        "contact[contact_type]": "Web Form",
        "product[name]": "Eva",
        utm_source: heallyUtmSource,
      },
    };

    const preset = btoa(JSON.stringify(payload))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    try {
      sendGTMEvent({
        event: "heallyValidatedSubmit",
        utm_source: heallyUtmSource,
      });
    } catch {
      // GTM fallback if script not initialized
    }

    window.location.href = `https://mymmj.getheally.com/patient_admin/prefill?redirect=sched&preset=${preset}&utm_source=${encodeURIComponent(heallyUtmSource)}`;
  }

  return (
    <form className="mt-5 flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit} noValidate>
      <div className={`grid gap-1.5 ${fieldEnter}`} style={staggerDelay(0)}>
        <Label htmlFor="leadName">Name (First &amp; Last)*</Label>
        <Input
          id="leadName"
          name="leadName"
          placeholder="Jane Doe"
          value={name}
          onChange={handleNameChange}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-xs text-destructive font-medium">{errors.name}</p>}
      </div>

      <div className={`grid gap-1.5 ${fieldEnter}`} style={staggerDelay(1)}>
        <Label htmlFor="leadEmail">Email*</Label>
        <Input
          id="leadEmail"
          name="leadEmail"
          type="email"
          placeholder="jane@example.com"
          value={email}
          onChange={handleEmailChange}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-xs text-destructive font-medium">{errors.email}</p>}
      </div>

      <div className={`grid gap-1.5 ${fieldEnter}`} style={staggerDelay(2)}>
        <Label htmlFor="leadPhone">Phone Number*</Label>
        <Input
          id="leadPhone"
          name="leadPhone"
          type="tel"
          placeholder="555-555-5555"
          value={phone}
          onChange={handlePhoneChange}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="text-xs text-destructive font-medium">{errors.phone}</p>}
      </div>

      <div className={`grid gap-1.5 ${fieldEnter}`} style={staggerDelay(3)}>
        <div className="flex items-start gap-2.5">
          <Checkbox
            id="leadTermsAccepted"
            name="leadTermsAccepted"
            className="mt-0.5"
            checked={termsAccepted}
            onCheckedChange={(checked) => handleTermsAcceptedChange(checked === true)}
            aria-invalid={!!errors.termsAccepted}
          />
          <Label htmlFor="leadTermsAccepted" className="text-xs font-normal text-muted-foreground leading-snug sm:text-sm">
            I accept the Terms and Conditions
          </Label>
        </div>
        {errors.termsAccepted && (
          <p className="text-xs text-destructive font-medium">{errors.termsAccepted}</p>
        )}
      </div>

      <div className={fieldEnter} style={staggerDelay(4)}>
        <Button
          type="submit"
          disabled={submitting}
          className="mt-2 h-12 w-full rounded-full text-base font-semibold tracking-wide text-white shadow-md transition-all hover:opacity-95 active:scale-[0.99]"
          style={{
            background:
              "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
          }}
        >
          {submitting ? "Processing..." : "Get Your Card"}
        </Button>
      </div>
    </form>
  );
}

// Modal Context & Custom Hook
type LeadModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const LeadModalContext = createContext<LeadModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function useLeadModal() {
  return useContext(LeadModalContext);
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("lead-modal-open");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("lead-modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("lead-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Global event delegation to intercept CTA button clicks (Book consultation, Start journey, Care in your State, etc.)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "button, a, [data-open-lead-modal]"
      );
      if (!target) return;

      const hasDataAttr = target.hasAttribute("data-open-lead-modal");
      const text = target.textContent?.trim().toLowerCase() || "";
      const href = target.getAttribute("href") || "";

      const isCtaButton =
        hasDataAttr ||
        text.includes("book my consultation") ||
        text.includes("book your evaluation") ||
        text.includes("start your journey") ||
        text.includes("care in your state") ||
        text.includes("start evaluation") ||
        text.includes("start your evaluation") ||
        text.includes("start consultation") ||
        text.includes("renew my card") ||
        href === "#lead-modal";

      if (isCtaButton) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };

    window.addEventListener("click", handleGlobalClick, true);
    return () => window.removeEventListener("click", handleGlobalClick, true);
  }, []);

  return (
    <LeadModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
          {/* Backdrop Click */}
          <div
            className="fixed inset-0"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] border border-border bg-card p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200 sm:p-8">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted/60 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus:outline-hidden sm:right-6 sm:top-6"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col items-start gap-2 pr-8">
              <div className="relative mb-1 h-8 w-28 sm:h-9 sm:w-32">
                <Image
                  src="/logo_marydoc.svg"
                  alt="Marydoc"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <h3 className="text-xl font-bold text-primary sm:text-2xl">
                Start Your Evaluation
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Complete your details below to connect with a state-licensed physician online.
              </p>
            </div>

            {/* Modal Form */}
            <LeadCaptureForm />
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}
