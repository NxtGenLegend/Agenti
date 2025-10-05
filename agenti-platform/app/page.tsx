import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1e3a5f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#00d4ff]/20 bg-[#0a1628]/80 backdrop-blur-sm">
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

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center justify-center">

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 font-[family-name:var(--font-jetbrains-mono)] animate-[fadeInUp_0.8s_ease-out]">
            Deploy AI Agents,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#00d4ff]">
              Access Them Anywhere
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            Host your AI agents in the cloud and get instant access to a marketplace of powerful developer tools.
            One subscription, unlimited possibilities.
          </p>
          <div className="flex gap-4 justify-center animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <Link
              href="/signup"
              className="bg-[#3b82f6] hover:bg-[#60a5fa] text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg shadow-[#3b82f6]/50"
            >
              Start Free Trial
            </Link>
            <Link
              href="/agents"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold border border-[#00d4ff]/30 hover:border-[#00d4ff] transition"
            >
              Browse Agents
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-[#00d4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-8 hover:border-[#00d4ff]/40 transition">
            <div className="w-12 h-12 bg-[#3b82f6] rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#3b82f6]/50">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 font-[family-name:var(--font-jetbrains-mono)]">Deploy Instantly</h3>
            <p className="text-gray-400">
              Upload your agents and get them running in the cloud within minutes. No infrastructure management required.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-8 hover:border-[#00d4ff]/40 transition">
            <div className="w-12 h-12 bg-[#00d4ff] rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#00d4ff]/50">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 font-[family-name:var(--font-jetbrains-mono)]">Access Everything</h3>
            <p className="text-gray-400">
              One subscription gives you unlimited access to all agents in the marketplace. Use what you need, when you need it.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-8 hover:border-[#00d4ff]/40 transition">
            <div className="w-12 h-12 bg-[#60a5fa] rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#60a5fa]/50">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 font-[family-name:var(--font-jetbrains-mono)]">Secure & Reliable</h3>
            <p className="text-gray-400">
              Enterprise-grade security with 99.9% uptime. Your agents run in isolated environments with full monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#60a5fa] mb-2">500+</div>
            <div className="text-gray-400">Active Agents</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#00d4ff] mb-2">10k+</div>
            <div className="text-gray-400">Developers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#3b82f6] mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#00d4ff] rounded-2xl p-12 text-center shadow-2xl shadow-[#3b82f6]/50">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-jetbrains-mono)]">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of developers using agenti to power their applications.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[#3b82f6] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00d4ff]/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4 font-[family-name:var(--font-jetbrains-mono)]">agenti</h3>
              <p className="text-gray-400 text-sm">
                The platform for hosting and accessing AI agents.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/agents" className="hover:text-[#00d4ff] transition">Browse Agents</Link></li>
                <li><Link href="/pricing" className="hover:text-[#00d4ff] transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-[#00d4ff] transition">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-[#00d4ff] transition">About</Link></li>
                <li><Link href="#" className="hover:text-[#00d4ff] transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-[#00d4ff] transition">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-[#00d4ff] transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-[#00d4ff] transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#00d4ff]/20 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 agenti. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
