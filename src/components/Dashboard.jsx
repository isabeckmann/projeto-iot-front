import { useState, useEffect } from 'react'
import SensorChart from './SensorChart'
import { fetchGroupedSensorData } from '../services/api'
import '../styles/Dashboard.css'

function Dashboard() {
  const [sensorData, setSensorData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSensorData = async () => {
      try {
        setLoading(true)
        const data = await fetchGroupedSensorData()
        setSensorData(data)
        setError(null)
      } catch (err) {
        setError('Erro ao carregar dados dos sensores')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadSensorData()
    
    // Atualizar dados a cada 30 segundos
    const interval = setInterval(loadSensorData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Carregando dados dos sensores...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard de Sensores IoT</h1>
      
      {Object.keys(sensorData).length === 0 ? (
        <div className="no-data">Nenhum dado de sensor disponível</div>
      ) : (
        <div className="charts-grid">
          {Object.entries(sensorData).map(([sensorId, readings]) => {
            // Pegar o tipo do primeiro reading
            const type = readings[0]?.type || 'unknown'
            return (
              <SensorChart 
                key={sensorId} 
                sensorId={sensorId}
                type={type}
                readings={readings}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dashboard
