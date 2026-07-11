import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";

// Placeholder testimonials — edit freely.
const testimonials = [
  {
    author: {
      name: "Thandi M.",
      handle: "Boutique Owner, Johannesburg",
    },
    text: "Buk Digital built our online store and booking system in weeks. Sales enquiries doubled in the first two months.",
  },
  {
    author: {
      name: "Pieter V.",
      handle: "Logistics Manager, Pretoria",
    },
    text: "The custom dashboard they built replaced three spreadsheets and hours of admin every week. Worth every rand.",
  },
  {
    author: {
      name: "Naledi K.",
      handle: "Practice Manager, Cape Town",
    },
    text: "Professional, responsive and honest about what we actually needed. Our new website finally looks like the business we are.",
  },
  {
    author: {
      name: "Sipho D.",
      handle: "Founder, Durban",
    },
    text: "The consultation alone saved us from a costly mistake. They scoped a simpler solution that did exactly what we needed.",
  },
  {
    author: {
      name: "Annelie B.",
      handle: "Salon Owner, Bloemfontein",
    },
    text: "Hosting and maintenance is completely hands-off for us. The site just works, and support is a WhatsApp away.",
  },
];

export function HomeTestimonials() {
  return (
    <TestimonialsSection
      title="Trusted by growing businesses"
      description="From single-page sites to full custom platforms — here's what our clients say."
      testimonials={testimonials}
    />
  );
}
