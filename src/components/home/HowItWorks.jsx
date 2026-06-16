import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Phone, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Search Your Area",
    description: "Enter your city and college name to find nearby accommodations."
  },
  {
    icon: Filter,
    title: "Filter & Compare",
    description: "Apply filters for budget, type, facilities, and sharing options."
  },
  {
    icon: Phone,
    title: "Contact Directly",
    description: "Reach property owners via phone or WhatsApp instantly."
  },
  {
    icon: CheckCircle,
    title: "Move In",
    description: "Visit the property, finalize, and settle into your new home."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Simple Process</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">How RoomRadar Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative inline-flex mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-lg">
                  {i + 1}
                </div>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}