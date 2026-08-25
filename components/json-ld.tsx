import Script from "next/script";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://marydoc.com/#organization",
    name: "MaryDoc",
    alternateName: "MaryDoc Telehealth",
    url: "https://marydoc.com",
    logo: "https://marydoc.com/logo_marydoc.svg",
    image: "https://marydoc.com/cta-section.png",
    description:
      "MaryDoc connects patients with state-licensed physicians for secure, HIPAA-compliant online medical marijuana evaluations and card renewals.",
    sameAs: [
      "https://facebook.com/marydoc",
      "https://instagram.com/marydoc",
      "https://twitter.com/marydoc",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@marydoc.com",
      availableLanguage: ["English"],
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://marydoc.com/#localbusiness",
    name: "MaryDoc - Medical Card Evaluations",
    image: "https://marydoc.com/cta-section.png",
    url: "https://marydoc.com",
    telephone: "+1-800-555-6279",
    priceRange: "$$",
    description:
      "Complete a HIPAA-compliant online medical card evaluation with a state-licensed physician and guided support throughout the process.",
    medicalSpecialty: "Telemedicine",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://marydoc.com/#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://marydoc.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Medical Card Evaluations",
        item: "https://marydoc.com/#pricing",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I get a medical marijuana card online with MaryDoc?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply fill out our quick online evaluation form, schedule a video consultation with a state-licensed physician, and receive your medical card approval directly online.",
        },
      },
      {
        "@type": "Question",
        name: "Is the online consultation HIPAA-compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all consultations conducted through MaryDoc's telehealth platform with state-licensed physicians are 100% confidential and HIPAA-compliant.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a medical card evaluation cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evaluations start at $149 for a new card evaluation and $129 for card renewals. If you are not approved, you receive a 100% refund.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
