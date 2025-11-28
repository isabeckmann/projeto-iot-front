# Dashboard IoT - Frontend React

Um dashboard moderno e responsivo para monitoramento de sensores IoT em tempo real, construído com React e Vite.

## 🎨 Funcionalidades

- **Dashboard em Tempo Real**: Atualiza automaticamente a cada 5 segundos
- **Organização por Tipo**: Os sensores são agrupados automaticamente pelo seu tipo
- **Cards Visuais**: Cada sensor possui um card com ícone, valor e timestamp
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Temas de Cores**: Cores dinâmicas baseadas no tipo de sensor
- **Animações Suaves**: Transições elegantes para melhor UX

## 📦 Tipos de Sensores Suportados

O dashboard reconhece automaticamente os seguintes tipos de sensores:

- 🌡️ **Temperatura** (°C)
- 💧 **Umidade** (%)
- 🔷 **Pressão** (hPa)
- 💡 **Luminosidade** (lux)
- 📍 **Movimento**
- ⚠️ **Gás**
- 🌊 **Água**
- 💨 **Ar**
- 🔊 **Som**
- 📏 **Distância** (cm)

## 🚀 Instalação

### Pré-requisitos

- Node.js (v16+)
- npm ou yarn

### Passos

1. **Instale as dependências**:

```bash
npm install
```

2. **Configure o servidor backend**:

O frontend espera que o backend rode em `http://localhost:8000`. Caso contrário, modifique o arquivo `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://seu-servidor:porta',
      changeOrigin: true,
    }
  }
}
```

3. **Inicie o servidor de desenvolvimento**:

```bash
npm run dev
```

O dashboard abrirá em `http://localhost:3000`

## 🛠️ Comandos

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📡 Estrutura de Dados

O frontend espera dados no seguinte formato da API:

```json
{
  "id": 1,
  "sensorId": "sensor-001",
  "type": "temperatura",
  "value": 25.5,
  "timestamp": "2025-11-27T10:30:00"
}
```

### Endpoints Utilizados

- `GET /api/sensor/data/latest` - Obtém os últimos dados de cada sensor

## 🎯 Componentes Principais

### Dashboard
- Busca e agrupa dados dos sensores
- Gerencia estado geral da aplicação
- Atualiza dados em tempo real

### SensorCard
- Exibe informações individuais do sensor
- Aplica formatação e ícones baseado no tipo
- Mostra status do sensor

### App
- Componente raiz
- Gerencia carregamento e erros

## 🎨 Personalização

### Adicionar Novo Tipo de Sensor

Edite o arquivo `src/components/SensorCard.jsx`:

```javascript
const getIconByType = (type) => {
  const icons = {
    'seu-tipo': '🎯',
    // ...
  }
}

const getColorByType = (type) => {
  const colors = {
    'seu-tipo': '#sua-cor',
    // ...
  }
}

const formatValue = (value, type) => {
  if (type.toLowerCase() === 'seu-tipo') return value.toFixed(2) + ' unidade'
  // ...
}
```

## 📱 Responsividade

O dashboard é totalmente responsivo com breakpoints em:
- Desktop: Grid de 3 colunas
- Tablet: Grid de 2 colunas
- Mobile: Grid de 1 coluna

## 🔄 Intervalo de Atualização

O dashboard atualiza os dados a cada 5 segundos. Para modificar, edite `src/components/Dashboard.jsx`:

```javascript
const interval = setInterval(fetchSensorData, 5000) // em milissegundos
```

## 🌐 Deployment

### Build para produção

```bash
npm run build
```

Os arquivos estáticos estarão em `dist/`

### Deploy em plataformas populares

- **Vercel**: Conecte o repositório e faça deploy automático
- **Netlify**: Faça upload da pasta `dist/`
- **GitHub Pages**: Configure com GitHub Actions

## 📚 Tecnologias

- **React 18.2**: Biblioteca de UI
- **Vite 5.0**: Build tool rápida
- **Axios**: Cliente HTTP
- **CSS3**: Estilos e animações

## 🐛 Troubleshooting

### CORS Error
Se receber erro de CORS, certifique-se de que o backend está configurado para aceitar requisições de `http://localhost:3000`

### Sem dados disponíveis
- Verifique se o backend está rodando
- Confirm que há dados no banco de dados
- Verifique o console do navegador (F12) para erros

### Backend respondendo lentamente
O dashboard atualiza a cada 5 segundos. Se quiser aumentar o intervalo, modifique em Dashboard.jsx

## 📝 Licença

Este projeto é parte do projeto IoT da comunidade.

## 👨‍💻 Desenvolvimento

Para contribuir com melhorias:

1. Crie uma branch
2. Faça seus commits
3. Abra um Pull Request

---

**Desenvolvido com ❤️ para monitoramento IoT**
