import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  User,
  LogOut,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Package,
  Navigation,
  Phone
} from 'lucide-react'

const HomeScreen = ({ user, onLogout, isOnline, setIsOnline }) => {
  const navigate = useNavigate()
  const [availableDeliveries, setAvailableDeliveries] = useState([])
  const [todayEarnings, setTodayEarnings] = useState(0)
  const [completedDeliveries, setCompletedDeliveries] = useState(0)
  const [currentLocation, setCurrentLocation] = useState(null)

  // Dados simulados de entregas disponíveis
  const mockDeliveries = [
    {
      id: 1,
      type: 'moto_entregador',
      pickup: 'Rua das Flores, 123',
      delivery: 'Av. Central, 456',
      distance: '2.5 km',
      estimatedTime: '15 min',
      payment: 'R$ 12,00',
      paymentMethod: 'Pix',
      customerName: 'Maria Silva',
      customerPhone: '(48) 99999-1234',
      items: 'Documentos'
    },
    {
      id: 2,
      type: 'wendy_shop',
      pickup: 'TechStore - Shopping Center',
      delivery: 'Rua dos Pinheiros, 789',
      distance: '3.8 km',
      estimatedTime: '20 min',
      payment: 'R$ 18,50',
      paymentMethod: 'Cartão',
      customerName: 'João Santos',
      customerPhone: '(48) 99999-5678',
      items: 'Smartphone Samsung Galaxy'
    },
    {
      id: 3,
      type: 'moto_entregador',
      pickup: 'Farmácia Central',
      delivery: 'Bairro Novo, 321',
      distance: '1.2 km',
      estimatedTime: '8 min',
      payment: 'R$ 8,00',
      paymentMethod: 'Dinheiro',
      customerName: 'Ana Costa',
      customerPhone: '(48) 99999-9012',
      items: 'Medicamentos'
    }
  ]

  useEffect(() => {
    if (isOnline) {
      setAvailableDeliveries(mockDeliveries)
    } else {
      setAvailableDeliveries([])
    }
  }, [isOnline])

  // Efeito para obter e enviar a localização do entregador
  useEffect(() => {
    let watchId

    const sendLocation = async (position) => {
      const { latitude, longitude, accuracy, speed, heading } = position.coords
      setCurrentLocation({ latitude, longitude })

      try {
        // Em um ambiente real, o token do usuário seria enviado no cabeçalho Authorization
        const response = await fetch('https://main.d3qsbefcpv5hbl.amplifyapp.com/api/geolocation/update-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({
            latitude,
            longitude,
            accuracy,
            speed,
            heading,
          }),
        })
        if (!response.ok) {
          console.error('Erro ao enviar localização:', await response.json())
        }
      } catch (error) {
        console.error('Erro de conexão ao enviar localização:', error)
      }
    }

    const handleError = (error) => {
      console.error('Erro de geolocalização:', error)
      // Em caso de erro, usar localização simulada como fallback
      const lat = -23.5505 + (Math.random() * 0.01 - 0.005)
      const lon = -46.6333 + (Math.random() * 0.01 - 0.005)
      sendLocation({ coords: { latitude: lat, longitude: lon, accuracy: 10, speed: 20, heading: 90 } })
    }

    if (isOnline) {
      // Usar localização real do GPS
      if (navigator.geolocation) {
        // Obter localização inicial
        navigator.geolocation.getCurrentPosition(sendLocation, handleError, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        })

        // Monitorar mudanças de localização em tempo real
        watchId = navigator.geolocation.watchPosition(sendLocation, handleError, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000,
        })
      } else {
        console.error('Geolocalização não é suportada neste navegador')
        // Fallback para localização simulada se GPS não estiver disponível
        const simulateLocation = () => {
          const lat = -23.5505 + (Math.random() * 0.01 - 0.005)
          const lon = -46.6333 + (Math.random() * 0.01 - 0.005)
          sendLocation({ coords: { latitude: lat, longitude: lon, accuracy: 10, speed: 20, heading: 90 } })
        }
        simulateLocation()
        const intervalId = setInterval(simulateLocation, 30000) // A cada 30 segundos
        return () => clearInterval(intervalId)
      }
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [isOnline])

  const handleAcceptDelivery = (deliveryId) => {
    navigate(`/delivery/${deliveryId}`)
  }

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#66CCFF] text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile')}
              className="text-white hover:bg-[#4DB8FF] p-0"
            >
              <div className="bg-white p-2 rounded-full">
                <User className="h-6 w-6 text-[#66CCFF]" />
              </div>
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{user?.name}</h1>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{user?.rating}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-white hover:bg-[#4DB8FF]"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Online/Offline Toggle */}
        <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
          <div>
            <h2 className="text-lg font-medium">Status</h2>
            <p className="text-sm text-blue-100">
              {isOnline ? 'Você está online e pode receber pedidos' : 'Você está offline'}
            </p>
            {isOnline && currentLocation && (
              <p className="text-xs text-blue-100 mt-1">
                Localização: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm">{isOnline ? 'Online' : 'Offline'}</span>
            <Switch
              checked={isOnline}
              onCheckedChange={handleToggleOnline}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">R$ {todayEarnings.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Ganhos hoje</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="h-8 w-8 text-[#66CCFF] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{completedDeliveries}</p>
              <p className="text-sm text-gray-600">Entregas hoje</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            onClick={() => navigate('/earnings')}
            variant="outline"
            className="flex-1"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Ver Ganhos
          </Button>
        </div>

        {/* Available Deliveries */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {isOnline ? 'Pedidos Disponíveis' : 'Fique online para receber pedidos'}
          </h3>
          
          {!isOnline && (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-gray-400 mb-4">
                  <Package className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600">Ative o status online para começar a receber pedidos</p>
              </CardContent>
            </Card>
          )}

          {isOnline && availableDeliveries.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-gray-400 mb-4">
                  <Package className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600">Nenhum pedido disponível no momento</p>
                <p className="text-sm text-gray-500 mt-2">Aguarde novos pedidos...</p>
              </CardContent>
            </Card>
          )}

          {isOnline && availableDeliveries.map((delivery) => (
            <Card key={delivery.id} className="mb-3">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {delivery.type === 'moto_entregador' ? 'Moto Entregador' : 'Wendy Shop'}
                    </CardTitle>
                    <Badge variant={delivery.type === 'moto_entregador' ? 'default' : 'secondary'}>
                      {delivery.items}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#66CCFF]">{delivery.payment}</p>
                    <p className="text-sm text-gray-600">{delivery.paymentMethod}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Coleta</p>
                      <p className="text-sm text-gray-600">{delivery.pickup}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Navigation className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Entrega</p>
                      <p className="text-sm text-gray-600">{delivery.delivery}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{delivery.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{delivery.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{delivery.customerName}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAcceptDelivery(delivery.id)}
                    className="w-full bg-[#66CCFF] hover:bg-[#4DB8FF] text-white"
                  >
                    Aceitar Pedido
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeScreen


