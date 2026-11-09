import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/content";

export function FaqSection() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full divide-y divide-[#111111]/15 border-y border-[#111111]/15"
    >
      {faqItems.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`faq-${index}`}
          className="border-none transition-colors hover:bg-[#F9F9F7]/60"
        >
          <AccordionTrigger className="group py-6 sm:py-7 px-2 sm:px-4 text-left hover:no-underline cursor-pointer">
            <div className="flex items-start gap-4 sm:gap-6 w-full pr-4">
              <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-[#111111]/35 group-hover:text-[#111111] transition-colors shrink-0 mt-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tight text-[#111111] leading-snug">
                {item.question}
              </h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 pt-1 px-2 sm:px-4">
            <div className="pl-8 sm:pl-12 border-l border-[#111111]/15 ml-1 sm:ml-2">
              <p className="text-sm sm:text-base leading-relaxed text-[#555555] max-w-3xl">
                {item.answer}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
