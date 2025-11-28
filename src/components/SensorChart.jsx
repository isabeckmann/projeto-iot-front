import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import '../styles/SensorChart.css'

const SENSOR_NAMES = {
  'T010': 'Temperatura',
  'H010': 'Umidade',
  'L010': 'Luminosidade',
  'M010': 'Movimento'
}

const SENSOR_COLORS = {
  'temperature': '#FF6B6B',
  'humidity': '#4ECDC4',
  'luminosity': '#FFE66D',
  'motion': '#95E1D3'
}

const SENSOR_UNITS = {
  'temperature': '°C',
  'humidity': '%',
  'luminosity': 'lux',
  'motion': ''
}

function SensorChart({ sensorId, type, readings }) {
  const sensorName = SENSOR_NAMES[sensorId] || sensorId
  const color = SENSOR_COLORS[type] || '#8884d8'
  const unit = SENSOR_UNITS[type] || ''

  // Preparar dados para o gráfico
  const chartData = readings.map((reading, index) => {
    const date = new Date(reading.timestamp)
    return {
      name: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      value: reading.value,
      fullDate: date.toLocaleString('pt-BR')
    }
  }).reverse() // Mais antigo para mais recente

  // Pegar última leitura
  const latestReading = readings[0]
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const displayValue = type === 'motion' 
        ? (payload[0].value === 1 ? 'Movimento Detectado' : 'Sem Movimento')
        : `${payload[0].value.toFixed(2)} ${unit}`
      
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.fullDate}</p>
          <p className="tooltip-value" style={{ color }}>
            {displayValue}
          </p>
        </div>
      )
    }
    return null
  }

  // Determinar valor atual formatado
  const currentDisplayValue = type === 'motion'
    ? (latestReading.value === 1 ? '🟢 Movimento Detectado' : '⚪ Sem Movimento')
    : `${latestReading.value.toFixed(2)} ${unit}`

  return (
    <div className="sensor-chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{sensorName}</h3>
        <div className="current-value" style={{ color: type === 'motion' ? (latestReading.value === 1 ? '#4CAF50' : '#999') : color }}>
          {currentDisplayValue}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={250}>
        {type === 'motion' ? (
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666"
              fontSize={12}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              domain={[0, 1]}
              ticks={[0, 1]}
              tickFormatter={(value) => value === 1 ? 'Sim' : 'Não'}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={() => sensorName} />
            <Bar 
              dataKey="value" 
              fill={color}
              radius={[8, 8, 0, 0]}
              name={sensorName}
            />
          </BarChart>
        ) : (
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666"
              fontSize={12}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
              name={sensorName}
            />
          </LineChart>
        )}
      </ResponsiveContainer>

      <div className="chart-footer">
        <span className="readings-count">{readings.length} leituras</span>
        <span className="last-update">
          Última atualização: {new Date(latestReading.timestamp).toLocaleTimeString('pt-BR')}
        </span>
      </div>
    </div>
  )
}

export default SensorChart
