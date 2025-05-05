import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import useAuth from '../../context/useAuth.js'
import fetchWithAuth from '../../utils/fetchWithAuth.js'

const BarChart = () => {
  const [data, setData] = useState({})

  const { logout } = useAuth()
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    fetchWithAuth('/workout-logs/weekly-count', logout).then((res) => {
      res.result ? setData(res.result) : setData({})
    })
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    // cleanup previous chart
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Workout frequency',
            data: Object.values(data),
            backgroundColor: Object.values(data).map((value) => {
              if (value === 1) return '#ab3535'
              if (value === 2) return '#b84d27'
              if (value === 3) return '#c77f2c'
              if (value === 4) return '#bdb83c'
              if (value === 5) return '#719c54'
              if (value === 6) return '#44662c'
              if (value === 7) return '#1d4718'
            }),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 5 / 6,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 7,
            ticks: {
              stepSize: 1,
              color: '#FAF9F6', // y-axis label color
            },
            grid: {
              color: '#FAF9F650', // y-axis grid lines
            },
            title: {
              display: true,
              text: 'Sessions',
              color: '#FAF9F6',
              font: {
                size: 14,
              },
            },
          },
          x: {
            ticks: {
              color: '#FAF9F6', // x-axis label color
            },
            grid: {
              color: '#FAF9F650', // x-axis grid lines
            },
            title: {
              display: true,
              text: 'Calendar Week',
              color: '#FAF9F6',
              font: {
                size: 14,
              },
            },
          },
        },
      },
    })
  }, [data])

  return (
    <canvas ref={canvasRef} className="bg-[#40434E] p-5 rounded-2xl"></canvas>
  )
}

export default BarChart
