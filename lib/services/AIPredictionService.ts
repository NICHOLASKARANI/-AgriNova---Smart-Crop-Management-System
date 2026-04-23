// AI Prediction Service for SmartSeason Monitoring

export interface PredictionResult {
  yieldForecast: number
  harvestWindow: { start: Date; end: Date }
  riskScore: number
  recommendations: string[]
  weatherImpact: string
}

export class AIPredictionService {
  static calculateHealthScore(
    soilData: any,
    weatherData: any,
    stage: string,
    daysSincePlanting: number
  ): number {
    let score = 85 // Base score
    
    // Soil health factors
    if (soilData.pH < 5.5 || soilData.pH > 7.5) score -= 10
    if (soilData.moisture < 40) score -= 15
    if (soilData.moisture > 80) score -= 10
    
    // Nutrient balance
    const avgNutrients = (soilData.nutrients.nitrogen + soilData.nutrients.phosphorus + soilData.nutrients.potassium) / 3
    if (avgNutrients < 40) score -= 20
    if (avgNutrients > 80) score -= 10
    
    // Stage progression
    const expectedProgress = this.getExpectedProgress(stage, daysSincePlanting)
    if (daysSincePlanting > expectedProgress + 14) score -= 15
    
    return Math.max(0, Math.min(100, score))
  }
  
  static predictYield(
    cropType: string,
    healthScore: number,
    size: number,
    seasonType: string
  ): number {
    const baseYield = this.getBaseYield(cropType)
    const seasonMultiplier = this.getSeasonMultiplier(seasonType)
    const healthMultiplier = healthScore / 100
    
    return Math.round(baseYield * size * seasonMultiplier * healthMultiplier)
  }
  
  static generateRiskFactors(
    healthScore: number,
    weatherForecast: any[],
    soilData: any
  ): Array<{ factor: string; severity: string; recommendation: string }> {
    const risks = []
    
    if (healthScore < 50) {
      risks.push({
        factor: 'Poor crop health',
        severity: 'HIGH',
        recommendation: 'Immediate intervention required. Check for pests and diseases.'
      })
    } else if (healthScore < 70) {
      risks.push({
        factor: 'Declining crop health',
        severity: 'MEDIUM',
        recommendation: 'Increase monitoring and consider fertilizer application.'
      })
    }
    
    if (soilData.moisture < 30) {
      risks.push({
        factor: 'Drought stress',
        severity: 'HIGH',
        recommendation: 'Irrigation needed immediately.'
      })
    }
    
    // Check weather forecast for extreme conditions
    const hasExtremeWeather = weatherForecast.some(w => w.tempHigh > 35 || w.rainfall > 50)
    if (hasExtremeWeather) {
      risks.push({
        factor: 'Extreme weather forecast',
        severity: 'HIGH',
        recommendation: 'Prepare protective measures for upcoming weather events.'
      })
    }
    
    return risks
  }
  
  static getExpectedProgress(stage: string, days: number): number {
    const stages = {
      'PLANTED': 0,
      'GROWING': 30,
      'FLOWERING': 60,
      'MATURING': 90,
      'READY': 120,
      'HARVESTED': 150
    }
    return (stages as any)[stage] || days
  }
  
  static getBaseYield(cropType: string): number {
    const yields: any = {
      'Corn': 8.5,
      'Wheat': 3.5,
      'Soybeans': 3.0,
      'Tomatoes': 25,
      'Potatoes': 20,
      'Rice': 4.5
    }
    return yields[cropType] || 5
  }
  
  static getSeasonMultiplier(seasonType: string): number {
    const multipliers: any = {
      'LONG_RAINS': 1.2,
      'SHORT_RAINS': 1.0,
      'DRY': 0.7,
      'IRRIGATED': 1.1
    }
    return multipliers[seasonType] || 1.0
  }
  
  static generateAlerts(
    healthScore: number,
    risks: any[],
    stage: string,
    daysSincePlanting: number
  ): Array<{ type: string; message: string; severity: string }> {
    const alerts = []
    
    if (healthScore < 60) {
      alerts.push({
        type: 'PEST',
        message: 'Crop health critical. Immediate inspection required.',
        severity: 'CRITICAL'
      })
    }
    
    if (risks.some(r => r.severity === 'HIGH')) {
      alerts.push({
        type: 'IRRIGATION',
        message: 'High risk factors detected. Take immediate action.',
        severity: 'WARNING'
      })
    }
    
    if (stage === 'READY' && daysSincePlanting > 110) {
      alerts.push({
        type: 'HARVEST',
        message: 'Optimal harvest window approaching. Prepare for harvest.',
        severity: 'INFO'
      })
    }
    
    return alerts
  }
}
