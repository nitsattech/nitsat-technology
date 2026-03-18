"use client"

import { motion } from "framer-motion"

const trustSignals = ["ABDM Ready", "ABHA Integration Supported", "Secure Health Data Handling"]

export function OurProduct() {
  return (
    <section id="product" className="py-20 sm:py-24 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto rounded-2xl border border-sky-400/20 bg-card/70 backdrop-blur-xl p-8 sm:p-10 shadow-xl shadow-sky-500/10"
        >
          <div className="inline-block px-4 py-2 mb-4 text-xs font-semibold rounded-full border border-sky-400/40 bg-gradient-to-r from-sky-500/20 to-emerald-500/20 text-sky-200">
            Our Product
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-balance">
            Nitsat Health Management System (HMS)
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Nitsat HMS is a scalable and ABDM-compliant hospital management system designed to digitize healthcare
            workflows including OPD, IPD, billing, and patient health records. It supports ABHA integration and secure
            health data exchange.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {trustSignals.map((signal) => (
              <span
                key={signal}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-sky-500/20 to-emerald-500/20 text-foreground border border-sky-400/30"
              >
                {signal}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
