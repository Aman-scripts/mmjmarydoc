import Script from "next/script";

export function JsonLd() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://marydoc.com/#website",
        "url": "https://marydoc.com/",
        "name": "MaryDoc",
        "description":
          "MaryDoc connects patients with licensed physicians for HIPAA-compliant online medical marijuana card evaluations.",
        "inLanguage": "en-US",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "@id": "https://marydoc.com/#primaryimage",
          "url": "https://marydoc.com/features-section-center.png",
          "contentUrl": "https://marydoc.com/features-section-center.png",
          "caption": "MaryDoc Online Medical Marijuana Card Evaluation",
        },
        "publisher": {
          "@id": "https://marydoc.com/#organization",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://marydoc.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://marydoc.com/",
          },
        ],
      },
      {
        "@type": "MedicalBusiness",
        "@id": "https://marydoc.com/#organization",
        "name": "MaryDoc",
        "alternateName": "MaryDoc Telehealth",
        "url": "https://marydoc.com/",
        "logo": "https://marydoc.com/marydoc-logo.webp",
        "image": "https://marydoc.com/features-section-center.png",
        "description":
          "MaryDoc connects patients with licensed physicians for HIPAA-compliant online medical marijuana card evaluations.",
        "medicalSpecialty": "Telemedicine",
        "priceRange": "$$",
        "telephone": "+1-800-555-6279",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US",
        },
        "sameAs": [
          "https://facebook.com/marydoc",
          "https://instagram.com/marydoc",
          "https://twitter.com/marydoc",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://marydoc.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I get a medical marijuana card online with MaryDoc?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Simply fill out our quick online evaluation form, schedule a video consultation with a state-licensed physician, and receive your medical card approval directly online.",
            },
          },
          {
            "@type": "Question",
            "name": "Is the online consultation HIPAA-compliant?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes, all consultations conducted through MaryDoc's telehealth platform with state-licensed physicians are 100% confidential and HIPAA-compliant.",
            },
          },
          {
            "@type": "Question",
            "name": "How much does a medical card evaluation cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Evaluations start at $149 for a new card evaluation and $129 for card renewals. If you are not approved, you receive a 100% refund.",
            },
          },
        ],
      },
    ],
  };

  return (
    <Script
      id="schema-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
