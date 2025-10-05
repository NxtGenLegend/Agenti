'use client';

import Link from "next/link";
import { useState } from "react";

export default function AgentPage({ params }: { params: { id: string } }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock agent data - in real app this would come from API
  const agent = {
    id: params.id,
    name: "Python to JavaScript Converter",
    description: "Convert Python code to JavaScript with AI-powered syntax transformation",
    category: "Development",
    author: "agenti",
    rating: 4.8,
    users: 5420
  };

  const handleRun = async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    setOutput('');

    // Simulate processing
    setTimeout(() => {
      // Realistic conversion output
      const mockOutput = `/**
 * Generate Fibonacci sequence up to n terms
 * @param {number} n - Number of terms to generate
 * @returns {number[]} - Array of Fibonacci numbers
 */
function calculateFibonacci(n) {
  const sequence = [];
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    sequence.push(a);
    [a, b] = [b, a + b];
  }

  return sequence;
}

/**
 * Filter even numbers from a list
 * @param {number[]} numbers - Array of numbers to filter
 * @returns {number[]} - Array containing only even numbers
 */
function filterEvenNumbers(numbers) {
  return numbers.filter(num => num % 2 === 0);
}

// Main execution
const fibNumbers = calculateFibonacci(10);
console.log("Fibonacci sequence:", fibNumbers);

const evenFibs = filterEvenNumbers(fibNumbers);
console.log("Even Fibonacci numbers:", evenFibs);`;

      setOutput(mockOutput);
      setIsProcessing(false);
    }, 2800);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

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

      {/* Agent Header */}
      <section className="border-b border-[#00d4ff]/20 bg-[#0a1628]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6] to-[#60a5fa] rounded-lg flex items-center justify-center shadow-lg shadow-[#3b82f6]/50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
                  {agent.name}
                </h1>
                <p className="text-gray-400 mb-3">{agent.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-[#3b82f6]/20 text-[#60a5fa] rounded-full">
                    {agent.category}
                  </span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Interface */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Box */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-jetbrains-mono)]">
                Input (Python)
              </h2>
              <button
                onClick={handleClear}
                className="text-sm text-gray-400 hover:text-[#00d4ff] transition"
              >
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="# Paste your Python code here
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))"
              className="flex-1 min-h-[500px] bg-[#0a1628] border border-[#00d4ff]/20 rounded-lg p-4 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent placeholder-gray-600"
            />
          </div>

          {/* Output Box */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-jetbrains-mono)]">
                Output (JavaScript)
              </h2>
              {output && (
                <button
                  onClick={handleCopy}
                  className="text-sm text-gray-400 hover:text-[#00d4ff] transition flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              )}
            </div>
            <div className="flex-1 min-h-[500px] bg-[#0a1628] border border-[#00d4ff]/20 rounded-lg p-4 relative">
              {isProcessing ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className="absolute inset-0 border-4 border-[#00d4ff]/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-[#00d4ff] rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-[#00d4ff] font-semibold">Converting code...</p>
                  </div>
                </div>
              ) : output ? (
                <pre className="text-white font-mono text-sm whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-600 text-center">
                    Your converted code will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleRun}
            disabled={isProcessing || !input.trim()}
            className={`px-8 py-3 rounded-lg font-semibold transition shadow-lg flex items-center gap-2 ${
              isProcessing || !input.trim()
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-[#3b82f6] hover:bg-[#60a5fa] shadow-[#3b82f6]/50'
            } text-white`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Run Agent
              </>
            )}
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              How it works
            </h3>
            <p className="text-gray-400 text-sm">
              This agent uses advanced AI to analyze your Python code and convert it to equivalent JavaScript syntax while preserving functionality.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              Supported Features
            </h3>
            <p className="text-gray-400 text-sm">
              Functions, classes, loops, conditionals, list comprehensions, and most Python standard library features.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-jetbrains-mono)]">
              API Access
            </h3>
            <p className="text-gray-400 text-sm">
              Integrate this agent into your workflow via REST API. Pro plan required for API access.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
