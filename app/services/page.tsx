import Link from "next/link"

export default function ServicesPage() {
  return (
    <section className="container py-24">
      <h1 className="text-5xl font-bold mb-12">Our Services</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <ServiceCard
          title="Web Development"
          href="/services/web-development"
          desc="Modern, fast, scalable websites & apps"
        />
        <ServiceCard
          title="AI Solutions"
          href="/services/ai-solutions"
          desc="AI automation & intelligence for business"
        />
        <ServiceCard
          title="Chatbot Development"
          href="/services/chatbot-development"
          desc="AI chatbots for support & lead generation"
        />
      </div>
    </section>
  )
}

function ServiceCard({ title, desc, href }: any) {
  return (
    <Link
      href={href}
      className="p-6 rounded-xl border border-white/10 hover:border-purple-500 transition"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-2">{desc}</p>
    </Link>
  )
}
