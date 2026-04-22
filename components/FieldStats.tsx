'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface FieldStatsProps {
  stats: {
    total: number
    byStage: {
      PLANTED: number
      GROWING: number
      READY: number
      HARVESTED: number
    }
    byStatus: {
      ACTIVE: number
      AT_RISK: number
      COMPLETED: number
    }
  }
}

export default function FieldStats({ stats }: FieldStatsProps) {
  const stageData = {
    labels: ['Planted', 'Growing', 'Ready', 'Harvested'],
    datasets: [
      {
        label: 'Fields by Stage',
        data: [
          stats.byStage.PLANTED,
          stats.byStage.GROWING,
          stats.byStage.READY,
          stats.byStage.HARVESTED,
        ],
        backgroundColor: 'rgba(76, 175, 80, 0.5)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="card">
        <h3 className="text-sm font-medium text-gray-500">Total Fields</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
      </div>
      
      <div className="card">
        <h3 className="text-sm font-medium text-gray-500">Active Fields</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {stats.byStatus.ACTIVE}
        </p>
      </div>
      
      <div className="card">
        <h3 className="text-sm font-medium text-gray-500">At Risk</h3>
        <p className="text-3xl font-bold text-red-600 mt-2">
          {stats.byStatus.AT_RISK}
        </p>
      </div>
      
      <div className="card">
        <h3 className="text-sm font-medium text-gray-500">Completed</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          {stats.byStatus.COMPLETED}
        </p>
      </div>
      
      <div className="md:col-span-4 card">
        <h3 className="text-lg font-semibold mb-4">Field Stage Distribution</h3>
        <Bar data={stageData} options={options} />
      </div>
    </div>
  )
}