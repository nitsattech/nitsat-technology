import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Web Development Services | NITSAT Technologies",
  description:
    "High-performance, scalable, and modern web development solutions for startups and businesses.",
}

export default function WebDevelopmentPage() {
  return (
    <section className="container py-24 space-y-20">

      {/* HERO */}
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold">
          Web Development Services
        </h1>
        <p className="text-xl text-muted-foreground mt-6">
          We build fast, secure, and scalable websites & web applications
          that drive growth and deliver real business value.
        </p>

        <div className="flex gap-4 mt-8">
          <Button size="lg">Get Free Consultation</Button>
          <Button size="lg" variant="outline">View Portfolio</Button>
        </div>
      </div>

      {/* PROBLEMS */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">
          Problems We Solve
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 text-muted-foreground">
          <li>❌ Slow website performance</li>
          <li>❌ Poor mobile experience</li>
          <li>❌ Outdated design & UX</li>
          <li>❌ Hard to scale with business growth</li>
        </ul>
      </div>

      {/* SOLUTION */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">
          Our Web Development Approach
        </h2>
        <p className="text-muted-foreground max-w-3xl">
          At NITSAT Technologies, we create custom web solutions using
          modern frameworks and best practices. Our focus is on
          performance, security, scalability, and user experience.
        </p>
      </div>

      {/* SERVICES */}
      <div>
        <h2 className="text-3xl font-semibold mb-6">
          What We Build
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard title="Business Websites" />
          <ServiceCard title="Web Applications" />
          <ServiceCard title="E-commerce Platforms" />
          <ServiceCard title="Landing Pages" />
          <ServiceCard title="Admin Dashboards" />
          <ServiceCard title="API Integrations" />
        </div>
      </div>

      {/* TECH STACK */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">
          Technology Stack
        </h2>
        <p className="text-muted-foreground">
          Next.js · React · TypeScript · Tailwind CSS · Supabase ·
          Node.js · REST APIs
        </p>
      </div>

      {/* PROCESS */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">
          Our Development Process
        </h2>
        <ol className="list-decimal ml-6 text-muted-foreground space-y-2">
          <li>Requirement analysis & planning</li>
          <li>UI/UX design</li>
          <li>Development & testing</li>
          <li>Deployment & optimization</li>
          <li>Ongoing support & maintenance</li>
        </ol>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to build a powerful website?
        </h2>
        <Button size="lg">Start Your Project</Button>
      </div>
    </section>
  )
}

function ServiceCard({ title }: { title: string }) {
  return (
    <div className="p-6 rounded-xl border border-white/10">
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  )
}
