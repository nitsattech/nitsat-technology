import { Button } from "@/components/ui/button"

export const metadata = {
  title: "AI Chatbot Development | NITSAT Technologies",
  description:
    "Custom AI chatbots for lead generation and customer support.",
}

export default function ChatbotServicePage() {
  return (
    <section className="container py-24 space-y-20">

      {/* HERO */}
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold">
          AI Chatbot Development
        </h1>
        <p className="text-xl text-muted-foreground mt-6">
          Smart chatbots that automate support, capture leads,
          and boost conversions.
        </p>

        <div className="flex gap-4 mt-8">
          <Button size="lg">Get Free Consultation</Button>
          <Button size="lg" variant="outline">
            Chat with AI
          </Button>
        </div>
      </div>

      {/* PROBLEMS */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">Problems We Solve</h2>
        <ul className="grid md:grid-cols-2 gap-4 text-muted-foreground">
          <li>❌ Missed leads after hours</li>
          <li>❌ High support workload</li>
          <li>❌ Manual responses</li>
          <li>❌ No automation</li>
        </ul>
      </div>

      {/* SOLUTION */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">Our Solution</h2>
        <p className="text-muted-foreground max-w-3xl">
          We build AI-powered chatbots using OpenAI, Next.js,
          and Supabase that integrate seamlessly into your business.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6">
          Want a chatbot for your business?
        </h2>
        <Button size="lg">Start Your Project</Button>
      </div>
    </section>
  )
}
