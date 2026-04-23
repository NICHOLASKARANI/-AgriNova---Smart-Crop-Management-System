'use client'

import { useState } from 'react'

const plans = [
  {
    name: 'Freemium',
    price: '$0',
    period: 'forever',
    features: [
      'Basic AI predictions',
      '3 fields monitoring',
      'Weekly reports',
      'Email support',
      'Basic analytics'
    ],
    color: 'from-gray-500 to-gray-600',
    recommended: false
  },
  {
    name: 'Premium',
    price: '$29',
    period: 'per month',
    features: [
      'Advanced AI predictions',
      'Unlimited fields',
      'Real-time alerts',
      'Priority support',
      'Advanced analytics',
      'API access',
      'Team collaboration',
      'Custom reports'
    ],
    color: 'from-green-500 to-blue-500',
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    features: [
      'Everything in Premium',
      'Dedicated account manager',
      'Custom AI models',
      'On-premise deployment',
      '24/7 phone support',
      'SLA guarantee',
      'White-label solution'
    ],
    color: 'from-purple-500 to-pink-500',
    recommended: false
  }
]

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-gray-600">Start free, upgrade when you're ready</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all transform hover:-translate-y-2 ${plan.recommended ? 'ring-2 ring-green-500 scale-105' : ''}`}>
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1 text-sm">
                  Recommended
                </div>
              )}
              <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500">?</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-green-500'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
