import Link from "next/link";

const agents = [
  {
    id: 1,
    name: "Code Assistant",
    description: "AI-powered code completion and refactoring agent that helps write better code faster.",
    category: "Development",
    users: 5420,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Documentation Generator",
    description: "Automatically generates comprehensive documentation from your codebase.",
    category: "Development",
    users: 3210,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Bug Hunter",
    description: "Analyzes code to detect potential bugs and security vulnerabilities.",
    category: "Security",
    users: 4890,
    rating: 4.9,
  },
  {
    id: 4,
    name: "API Builder",
    description: "Quickly scaffold RESTful APIs with best practices and authentication.",
    category: "Development",
    users: 2340,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Test Generator",
    description: "Creates unit and integration tests based on your code structure.",
    category: "Testing",
    users: 3670,
    rating: 4.5,
  },
  {
    id: 6,
    name: "Database Designer",
    description: "Design and optimize database schemas with AI assistance.",
    category: "Database",
    users: 2890,
    rating: 4.6,
  },
  {
    id: 7,
    name: "Performance Optimizer",
    description: "Identifies performance bottlenecks and suggests optimizations.",
    category: "Performance",
    users: 4120,
    rating: 4.8,
  },
  {
    id: 8,
    name: "Code Reviewer",
    description: "Automated code review with style guide enforcement and best practice suggestions.",
    category: "Development",
    users: 5890,
    rating: 4.9,
  },
  {
    id: 9,
    name: "Deployment Manager",
    description: "Automates deployment pipelines and infrastructure provisioning.",
    category: "DevOps",
    users: 3450,
    rating: 4.7,
  },
];

const categories = ["All", "Development", "Security", "Testing", "Database", "Performance", "DevOps"];

export default function AgentsPage() {
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
              <Link href="/agents" className="text-white font-semibold transition">
                Browse Agents
              </Link>
              <Link href="/upload" className="text-gray-300 hover:text-[#00d4ff] transition">
                Upload
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-[#00d4ff] transition">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-jetbrains-mono)]">Browse Agents</h1>
        <p className="text-xl text-gray-300 max-w-3xl">
          Discover powerful AI agents built by developers around the world. Access all of them with a single subscription.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                category === "All"
                  ? "bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/50"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border border-[#00d4ff]/20 hover:border-[#00d4ff]/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Agents Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6 hover:bg-white/10 hover:border-[#00d4ff]/40 transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6] to-[#60a5fa] rounded-lg flex items-center justify-center shadow-lg shadow-[#3b82f6]/50">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="px-3 py-1 bg-[#3b82f6]/20 text-[#60a5fa] text-xs font-semibold rounded-full">
                  {agent.category}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">{agent.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{agent.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  <span>{agent.users.toLocaleString()} users</span>
                </div>
                <div className="flex items-center gap-1 text-[#00d4ff]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{agent.rating}</span>
                </div>
              </div>

              <Link
                href={`/agent/${agent.id}`}
                className="block w-full mt-4 bg-[#3b82f6] hover:bg-[#60a5fa] text-white py-2 rounded-lg transition font-medium shadow-lg shadow-[#3b82f6]/50 text-center"
              >
                Try Agent
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#00d4ff] rounded-2xl p-12 text-center shadow-2xl shadow-[#3b82f6]/50">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-jetbrains-mono)]">
            Want unlimited access?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe now and get access to all agents with no limits.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-[#3b82f6] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
