import '../styles/SensorCard.css'

function SensorCard({ sensor }) {
  const formatValue = (value, type) => {
    if (type?.toLowerCase() === 'temperatura') {
      return `${value.toFixed(1)}°C`
    } else if (type?.toLowerCase() === 'umidade') {
      return `${value.toFixed(1)}%`
    } else if (type?.toLowerCase() === 'pressao') {
      return `${value.toFixed(0)} hPa`
    }
    return value.toFixed(2)
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A'
    try {
      const date = new Date(timestamp)
      return date.toLocaleString('pt-BR')
    } catch {
      return timestamp
    }
  }

  return (
    <div className="sensor-card">
      <div className="card-header">
        <h3>{sensor.sensorId}</h3>
      </div>

      <div className="card-body">
        <div className="sensor-value">
          {formatValue(sensor.value, sensor.type)}
        </div>
        <div className="sensor-timestamp">
          {formatTimestamp(sensor.timestamp)}
        </div>
      </div>
    </div>
  )
}

export default SensorCard
