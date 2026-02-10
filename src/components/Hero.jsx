import React from 'react'

export default function Hero({ onBook, onDemo }) {
  return (
    <section className="rounded-lg p-8 text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Build Your Business on Autopilot with AI</h1>
      <p className="mb-6 text-sm md:text-base">Websites, Automation, AI Chatbots & Voice Agents — custom-built to grow your brand 24×7</p>
      <div className="flex justify-center gap-4">
        <button onClick={onBook} className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded">🚀 Book Free AI Consultation</button>
        <button onClick={onDemo} className="border border-white px-4 py-2 rounded">🤖 Try Live AI Demo</button>
      </div>
    </section>
  )
}
