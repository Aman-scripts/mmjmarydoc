import Script from "next/script";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "MaryDoc",
    "alternateName": "MaryDoc Telehealth",
    "url": "https://marydoc.com",
    "logo": "https://marydoc.com/logo_marydoc.svg",
    "image": "https://marydoc.com/og.jpg",
    "description":
      "MaryDoc connects patients with state-licensed physicians for secure, HIPAA-compliant online medical marijuana evaluations and card renewals.",
    "medicalSpecialty": "Telemedicine",
    "priceRange": "$129 - $149",
    "areaServed": {
      "@type": "Country",
      "name": "United States",
    },
    "availableLanguage": ["English"],
    "openingHours": "Mo-Sun 08:00-20:00",
    "telephone": "+1-800-555-6279",
    "sameAs": [
      "https://facebook.com/marydoc",
      "https://instagram.com/marydoc",
      "https://twitter.com/marydoc"
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MaryDoc",
    "url": "https://marydoc.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://marydoc.com/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I get a medical marijuana card online with MaryDoc?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply fill out our quick online evaluation form, schedule a video consultation with a state-licensed physician, and receive your medical card approval directly online."
        }
      },
      {
        "@type": "Question",
        "name": "Is the online consultation HIPAA-compliant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all consultations conducted through MaryDoc's telehealth platform with state-licensed physicians are 100% confidential and HIPAA-compliant."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a medical card evaluation cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evaluations start at $149 for a new card evaluation and $129 for card renewals. If you are not approved, you receive a 100% refund."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
