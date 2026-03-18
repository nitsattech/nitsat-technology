"use client"

import { motion } from "framer-motion"
import { CheckCircle2, HeartPulse } from "lucide-react"

const hmsCapabilities = [
  "OPD Management",
  "IPD & Ward Management",
  "Patient Registration (ABHA linked)",
  "Digital Health Records",
  "Billing & Invoicing",
  "Discharge Summary",
  "Lab & Pharmacy Integration",
  "ABDM Integration (HIP & HIU)",
]

export function HealthcareHmsSolution() {
  return (
    <section id="hms-solution" className="mt-16 sm:mt-24 py-20 sm:py-24 lg:py-28 bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-500/10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-xs font-medium rounded-full border border-sky-400/40 bg-gradient-to-r from-sky-500/20 to-emerald-500/20 text-sky-200">
            <HeartPulse className="w-4 h-4" /> Healthcare HMS Solution
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-balance">
            Designed for Hospital Workflows and India&apos;s Digital Health Stack
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
            Our HMS platform is purpose-built for hospitals, clinics, and diagnostic centers that need streamlined
            operations, ABHA-ready patient onboarding, and ABDM-aligned interoperability.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hmsCapabilities.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-4"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-400" />
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
