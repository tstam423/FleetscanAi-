import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-[var(--color-primary)] mb-4">
          FleetScan AI
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] mb-2">
          Smart Inspections. Safer Roads.
        </p>
        <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8">
          AI-powered DOT trailer inspection assistant. Point your camera at the
          trailer, and FleetScan AI detects visible damage and compliance issues
          in seconds.
        </p>
        <Link
          href="/scan"
          className="inline-block bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg"
        >
          Start Inspection Scan
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <FeatureCard
          icon="📷"
          title="AI Visual Detection"
          description="Point your camera at the trailer. AI identifies damage, wear, and DOT compliance issues automatically."
        />
        <FeatureCard
          icon="📋"
          title="Digital Checklist"
          description="Step-by-step inspection form mirroring official DOT requirements. Auto-filled from AI findings."
        />
        <FeatureCard
          icon="🏷️"
          title="Instant Labels"
          description="Generate printable J.J. Keller-style inspection stickers on standard Avery labels."
        />
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: "1", text: "Capture photo or video of the trailer" },
            { step: "2", text: "AI analyzes for damage and compliance issues" },
            { step: "3", text: "Review findings and complete inspection form" },
            { step: "4", text: "Generate report with signature and label" },
          ].map((item) => (
            <div
              key={item.step}
              className="text-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                {item.step}
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
    </div>
  );
}
