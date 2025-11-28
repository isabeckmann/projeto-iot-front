const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_TOKEN = import.meta.env.VITE_API_TOKEN

export const fetchGroupedSensorData = async () => {
  try {
    console.log('API_BASE_URL:', API_BASE_URL)
    console.log('API_TOKEN:', API_TOKEN)
    
    const response = await fetch(`${API_BASE_URL}/sensor/data/grouped`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar dados dos sensores:', error)
    throw error
  }
}
