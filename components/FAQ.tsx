import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { FAQ_DATA } from "../constants";
import AnimateOnScroll from "./AnimateOnScroll";
import BrandGhosts from "./BrandGhosts";

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const midPoint = Math.ceil(FAQ_DATA.length / 2);
  const firstCol = FAQ_DATA.slice(0, midPoint);
  const secondCol = FAQ_DATA.slice(midPoint);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="section-domu tone-mist relative overflow-hidden"
    >
      <BrandGhosts variant="default" />

      <div className="mx-auto w-full max-w-[92rem] page-pad-x relative z-10">
        <AnimateOnScroll>
          <div className="text-center section-head-domu">
            <span className="tag-domu mb-3 block">
              PLATAFORMA DOMU
            </span>
            <h2 className="h2-domu text-gradient">Perguntas Frequentes</h2>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-x-8">
          <div className="space-y-4">
            {firstCol.map((item, i) => {
              const id = `faq-${i}`;
              return (
                <AnimateOnScroll key={id} delay={i * 60}>
                  <FAQItem
                    id={id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openId === id}
                    onToggle={toggle}
                  />
                </AnimateOnScroll>
              );
            })}
          </div>
          <div className="space-y-4">
            {secondCol.map((item, i) => {
              const id = `faq-${midPoint + i}`;
              return (
                <AnimateOnScroll key={id} delay={i * 60 + 40}>
                  <FAQItem
                    id={id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openId === id}
                    onToggle={toggle}
                  />
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}> = ({ id, question, answer, isOpen, onToggle }) => {
  return (
    <div className="bg-[var(--domu-surface-1)] border border-[var(--domu-border)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[var(--domu-accent)]/25 hover:shadow-[0_12px_32px_-16px_rgba(10,10,11,0.18)] group">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="faq-question text-[var(--domu-primary)] group-hover:text-[var(--domu-accent)] transition-colors pr-8">
          {question}
        </span>

        <div
          className={`icon-tile w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <CaretDown className="w-4 h-4" weight="bold" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 type-card-desc border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ;
