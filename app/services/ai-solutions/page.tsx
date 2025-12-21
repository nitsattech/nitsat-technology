import { Button } from "@/components/ui/button"

export const metadata = {
  title: "AI Solutions & Automation | NITSAT Technologies",
  description:
    "AI-powered solutions to automate operations, enhance decision-making, and scale businesses intelligently.",
}

export default function AISolutionsPage() {
  return (
    <section className="container py-24 space-y-20">

      {/* HERO */}
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold">
          AI Solutions & Automation
        </h1>
        <p className="text-xl text-muted-foreground mt-6">
          Transform your business with AI-driven automation, analytics,
          and intelligent systems tailored to your needs.
        </p>

        <div className="flex gap-4 mt-8">
          <Button size="lg">Get AI Consultation</Button>
          <Button size="lg" variant="outline">Talk to AI Expert</Button>
        </div>
      </div>

      {/* PROBLEMS */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">
          Business Challenges We Solve
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 text-muted-foreground">
          <li>❌ Manual and repetitive tasks</li>
          <li>❌ High operational costs</li>
          <li>❌ Data without insights</li>
          <li>❌ Slow decision-making</li>
        </ul>
      </div>

      {/* SOLUTION */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">
          Our AI-Driven Solutions
        </h2>
        <p className="text-muted-foreground max-w-3xl">
          We design and deploy AI solutions that integrate seamlessly
          with your existing systems, helping you automate workflows,
          improve customer experience, and make data-driven decisions.
        </p>
      </div>

      {/* AI SERVICES */}
      <div>
        <h2 className="text-3xl font-semibold mb-6">
          AI Services We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard title="AI Chatbots & Assistants" />
          <ServiceCard title="Business Process Automation" />
          <ServiceCard title="AI Analytics & Insights" />
          <ServiceCard title="Custom AI Models" />
          <ServiceCard title="Recommendation Systems" />
          <ServiceCard title="AI Integrations" />
        </div>
      </div>

      {/* TECH STACK */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">
          Technology Stack
        </h2>
        <p className="text-muted-foreground">
          OpenAI · LangChain · Python · Next.js · Supabase ·
          Vector Databases · Cloud APIs
        </p>
      </div>

      {/* PROCESS */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">
          Our AI Implementation Process
        </h2>
        <ol className="list-decimal ml-6 text-muted-foreground space-y-2">
          <li>Business analysis & AI opportunity mapping</li>
          <li>Solution design & model selection</li>
          <li>Development & integration</li>
          <li>Testing & optimization</li>
          <li>Monitoring & continuous improvement</li>
        </ol>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to leverage AI for your business?
        </h2>
        <Button size="lg">Start Your AI Journey</Button>
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
