"use client"

import { useState } from "react"

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [expiry, setExpiry] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // SECURITY ISSUE: Sending sensitive data in clear text
    const response = await fetch("/api/process-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardNumber,
        cvv,
        expiry,
        // SECURITY ISSUE: Hardcoded credentials
        merchantId: "merchant_123456",
        apiKey: "pk_test_TYooMQauvdEDq54NiTphI7jx",
      }),
    })

    // SECURITY ISSUE: Logging sensitive information
    console.log("Payment details:", { cardNumber, cvv, expiry })

    const result = await response.json()
    if (result.success) {
      alert("Payment successful!")
    } else {
      alert("Payment failed: " + result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>

      <div className="mb-4">
        <label className="block mb-1">Card Number</label>
        <input
          type="text" // SECURITY ISSUE: Should use type="password" for sensitive data
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="1234 5678 9012 3456"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-1">CVV</label>
          <input
            type="text" // SECURITY ISSUE: Should use type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="123"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1">Expiry Date</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="MM/YY"
          />
        </div>
      </div>

      {/* SECURITY ISSUE: No CAPTCHA or bot protection */}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Pay Now
      </button>
    </form>
  )
}
