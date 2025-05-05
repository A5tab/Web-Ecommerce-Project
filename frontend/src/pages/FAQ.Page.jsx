

function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-gray-900 text-gray-200 py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto bg-indigo-900/40 border border-indigo-700 rounded-2xl p-10 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-indigo-500 mb-10">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6 text-indigo-100 text-lg">
          <div>
            <p className="font-bold text-yellow-400">❓ How can I track my order?</p>
            <p>You’ll receive a tracking link via email once your order is shipped.</p>
          </div>
          <div>
            <p className="font-bold text-yellow-400">❓ What payment methods are accepted?</p>
            <p>We accept all major credit/debit cards, PayPal, and COD.</p>
          </div>
          <div>
            <p className="font-bold text-yellow-400">❓ Can I return or exchange an item?</p>
            <p>Yes, within 7 days of delivery. See our returns policy for details.</p>
          </div>
          <div>
            <p className="font-bold text-yellow-400">❓ Do you ship internationally?</p>
            <p>Currently, we ship only within Pakistan. Global shipping coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ;