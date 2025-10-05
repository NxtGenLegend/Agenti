import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out agenti",
    features: [
      "Access to 5 basic agents",
      "1,000 API calls per month",
      "Community support",
      "Public agent hosting",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For professional developers",
    features: [
      "Unlimited access to all agents",
      "100,000 API calls per month",
      "Priority support",
      "Private agent hosting",
      "Custom agent deployment",
      "Analytics dashboard",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Unlimited API calls",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
      "Team collaboration",
      "Advanced security",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1e3a5f]">
      {/* Navigation */}
      <nav className="border-b border-[#00d4ff]/20 bg-[#0a1628]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white font-[family-name:var(--font-jetbrains-mono)]">
                agenti
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/agents" className="text-gray-300 hover:text-[#00d4ff] transition">
                Browse Agents
              </Link>
              <Link href="/pricing" className="text-white font-semibold transition">
                Pricing
              </Link>
              <Link href="/signin" className="text-gray-300 hover:text-[#00d4ff] transition">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[#3b82f6] hover:bg-[#60a5fa] text-white px-4 py-2 rounded-lg transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-jetbrains-mono)]">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Choose the plan that fits your needs. All plans include access to our agent marketplace.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-[#3b82f6] to-[#00d4ff] transform scale-105 shadow-2xl shadow-[#3b82f6]/50"
                  : "bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 hover:border-[#00d4ff]/40 transition"
              }`}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period !== "contact us" && (
                    <span className="text-gray-300 ml-2">/ {plan.period.split(" ")[1] || "month"}</span>
                  )}
                </div>
                <p className={plan.highlighted ? "text-white/90" : "text-gray-400"}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? "text-white" : "text-[#00d4ff]"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={plan.highlighted ? "text-white" : "text-gray-300"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? "bg-white text-[#3b82f6] hover:bg-gray-100"
                    : "bg-[#3b82f6] text-white hover:bg-[#60a5fa] shadow-lg shadow-[#3b82f6]/50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12 font-[family-name:var(--font-jetbrains-mono)]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6 hover:border-[#00d4ff]/40 transition">
            <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              Can I switch plans anytime?
            </h3>
            <p className="text-gray-400">
              Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6 hover:border-[#00d4ff]/40 transition">
            <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              What happens if I exceed my API call limit?
            </h3>
            <p className="text-gray-400">
              Your agents will continue to work, but you&apos;ll be charged $0.01 per 100 additional API calls. You can also upgrade your plan for higher limits.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6 hover:border-[#00d4ff]/40 transition">
            <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              Do you offer a free trial?
            </h3>
            <p className="text-gray-400">
              Yes! All new Pro plan subscriptions come with a 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6 hover:border-[#00d4ff]/40 transition">
            <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              Can I host my own agents?
            </h3>
            <p className="text-gray-400">
              Pro and Enterprise plans include the ability to deploy and host your custom agents on our platform. Free plan users can only access public agents.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#00d4ff] rounded-2xl p-12 text-center shadow-2xl shadow-[#3b82f6]/50">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-jetbrains-mono)]">
            Ready to supercharge your development?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of developers already using agenti.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[#3b82f6] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
