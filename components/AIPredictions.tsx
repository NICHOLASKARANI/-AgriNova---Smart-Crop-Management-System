'use client'

import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'

interface Field {
  id: string
  name: string
  cropType: string
  plantingDate: string
  currentStage: string
  status: string
}

interface Prediction {
  fieldId: string
  fieldName: string
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  confidence: number
  recommendation: string
}

interface AIPredictionsProps {
  fields: Field[]
}

export default function AIPredictions({ fields }: AIPredictionsProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (fields.length > 0) {
      generatePredictions()
    }
  }, [fields])

  const generatePredictions = async () => {
    setLoading(true)
    
    // Simulate AI model predictions
    // In production, this would call a real ML model
    setTimeout(() => {
      const newPredictions = fields.map(field => {
        // Simple rule-based risk assessment
        let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW'
        let recommendation = ''
        
        const daysSincePlanting = Math.floor(
          (new Date().getTime() - new Date(field.plantingDate).getTime()) / 
          (1000 * 60 * 60 * 24)
        )
        
        // Risk logic
        if (field.status === 'AT_RISK') {
          riskLevel = 'HIGH'
          recommendation = 'Immediate attention required. Inspect for pests or diseases.'
        } else if (field.currentStage === 'READY' && daysSincePlanting > 120) {
          riskLevel = 'MEDIUM'
          recommendation = 'Field is ready for harvest. Schedule harvesting soon.'
        } else if (field.currentStage === 'GROWING' && daysSincePlanting < 30) {
          riskLevel = 'LOW'
          recommendation = 'Field progressing normally. Continue regular monitoring.'
        } else if (field.currentStage === 'PLANTED' && daysSincePlanting > 60) {
          riskLevel = 'MEDIUM'
          recommendation = 'Growth seems slow. Check soil moisture and nutrients.'
        } else {
          recommendation = 'Field is on track. Maintain current management practices.'
        }
        
        return {
          fieldId: field.id,
          fieldName: field.name,
          riskLevel,
          confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
          recommendation,
        }
      })
      
      setPredictions(newPredictions)
      setLoading(false)
    }, 1000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return 'bg-green-100 text-green-800'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800'
      case 'HIGH':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">AI Risk Predictions</h2>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-500">Analyzing field data...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div key={prediction.fieldId} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">
                  {prediction.fieldName}
                </h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(prediction.riskLevel)}`}>
                  {prediction.riskLevel} RISK
                </span>
              </div>
              
              <div className="mb-2">
                <div className="text-sm text-gray-600">
                  Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${prediction.confidence * 100}%` }}
                  />
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mt-2">
                {prediction.recommendation}
              </p>
            </div>
          ))}
          
          {predictions.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No predictions available
            </p>
          )}
        </div>
      )}
    </div>
  )
}