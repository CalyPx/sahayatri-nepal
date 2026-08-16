export type Locale = "en" | "ne";

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    projects: string;
    gallery: string;
    contact: string;
    donate: string;
  };
  hero: {
    eyebrow: string;
    headlineLines: string[][];
    paragraph: string;
    donate: string;
    story: string;
  };
}

export const dictionary: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      projects: "Projects",
      gallery: "Gallery",
      contact: "Contact",
      donate: "Donate",
    },
    hero: {
      eyebrow: "Deaf Education · Karnali Province, Nepal",
      headlineLines: [["Every", "child"], ["deserves", "a"], ["language."]],
      paragraph:
        "Sahayatri Nepal provides education, safe housing and life skills for deaf children in remote Karnali Province.",
      donate: "Donate Now",
      story: "Read Our Story",
    },
  },
  ne: {
    nav: {
      home: "गृहपृष्ठ",
      about: "हाम्रो बारे",
      projects: "परियोजनाहरू",
      gallery: "ग्यालरी",
      contact: "सम्पर्क",
      donate: "दान गर्नुहोस्",
    },
    hero: {
      eyebrow: "बहिरा शिक्षा · कर्णाली प्रदेश, नेपाल",
      headlineLines: [["हरेक", "बालबालिकाले"], ["भाषा", "पाउनु"], ["पर्छ।"]],
      paragraph:
        "सहयात्री नेपालले कर्णाली प्रदेशका दूरदराजका बहिरा बालबालिकाहरूलाई शिक्षा, सुरक्षित आवास र जीवन उपयोगी सीपहरू प्रदान गर्दछ।",
      donate: "अहिले दान गर्नुहोस्",
      story: "हाम्रो कथा पढ्नुहोस्",
    },
  },
};
