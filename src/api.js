import axios from 'axios'

const api = axios.create({ //cria configuração do axios e todas as requisições partem desse endereçoS
  baseURL: 'https://api.github.com'
})

export default api;