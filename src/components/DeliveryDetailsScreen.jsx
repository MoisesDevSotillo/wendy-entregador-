import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Navigation,
  Package,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Star
} from 'lucide-react'

const DeliveryDetailsScreen = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [delivery, setDelivery] = useState(null)
  const [status, setStatus] = useState('accepted') // accepted, pickup, in_transit, delivered
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmittingRating, setIsSubmittingRating] = useState(false)

  // Dados simulados da entrega
  const mockDelivery = {
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
    items: 'Documentos',
    customer_id: 1, // Simula o ID do cliente para o chat e avaliação
    instructions: 'Entregar no apartamento 302, interfone 302',
  }

  useEffect(() => {
    // Simular carregamento dos dados da entrega
    setDelivery(mockDelivery)
  }, [id])

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus)
  }

  const handleCompleteDelivery = () => {
    // Simular conclusão da entrega
    setShowRatingModal(true) // Mostrar modal de avaliação
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleSubmitRating = async () => {
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação em estrelas.')
      return
    }

    setIsSubmittingRating(true)
    try {
      const API_BASE_URL = 'https://vgh0i1cjw858.manus.space/api/ratings'
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${user.token}` // Adicionar token de autenticação real
        },
        body: JSON.stringify({
          rater_id: user.id, // ID do entregador
          rated_id: delivery.customer_id, // ID do cliente
          order_id: parseInt(id),
          rating: rating,
          comment: comment,
          rating_type: 'customer_service' // Tipo de avaliação
        }),
      })
      const data = await response.json()
      if (response.ok) {
        alert('Avaliação enviada com sucesso!')
        navigate('/') // Voltar para a tela inicial
      } else {
        alert(`Erro ao enviar avaliação: ${data.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      alert(`Erro de conexão: ${error.message}`)
    } finally {
      setIsSubmittingRating(false)
      setShowRatingModal(false)
    }
  }

  const handleCancelDelivery = () => {
    if (confirm('Tem certeza que deseja cancelar esta entrega?')) {
      navigate('/')
    }
  }

  const handleCallCustomer = () => {
    if (delivery?.customerPhone) {
      window.open(`tel:${delivery.customerPhone}`)
    }
  }

  const handleOpenMaps = (address) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
  }

  const getStatusInfo = () => {
    switch (status) {
      case 'accepted':
        return {
          title: 'Pedido Aceito',
          description: 'Dirija-se ao local de coleta',
          color: 'bg-blue-500',
          icon: Package
        }
      case 'pickup':
        return {
          title: 'No Local de Coleta',
          description: 'Colete o item e confirme',
          color: 'bg-yellow-500',
          icon: MapPin
        }
      case 'in_transit':
        return {
          title: 'A Caminho',
          description: 'Dirija-se ao local de entrega',
          color: 'bg-orange-500',
          icon: Navigation
        }
      case 'delivered':
        return {
          title: 'Entregue',
          description: 'Entrega concluída com sucesso',
          color: 'bg-green-500',
          icon: CheckCircle
        }
      default:
        return {
          title: 'Status Desconhecido',
          description: '',
          color: 'bg-gray-500',
          icon: AlertCircle
        }
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  // Verificar se os dados da entrega estão carregados
  if (!delivery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66CCFF] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes da entrega...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#66CCFF] text-white p-4 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="text-white hover:bg-[#4DB8FF]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Detalhes da Entrega</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${statusInfo.color}`}>
                <StatusIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{statusInfo.title}</h3>
                <p className="text-sm text-gray-600">{statusInfo.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{delivery.type === 'moto_entregador' ? 'Moto Entregador' : 'Wendy Shop'}</span>
              <Badge variant={delivery.type === 'moto_entregador' ? 'default' : 'secondary'}>
                {delivery.items}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Payment Info */}
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Pagamento</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">{delivery.payment}</p>
                  <p className="text-sm text-gray-600">{delivery.paymentMethod}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{delivery.customerName}</p>
                  <p className="text-sm text-gray-600">{delivery.customerPhone}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleCallCustomer}
                    size="sm"
                    variant="outline"
                    className="border-[#66CCFF] text-[#66CCFF] hover:bg-[#66CCFF] hover:text-white"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  {delivery.customer_id && (
                    <Button
                      onClick={() => navigate(`/chat/${delivery.customer_id}`)}
                      size="sm"
                      variant="outline"
                      className="border-[#66CCFF] text-[#66CCFF] hover:bg-[#66CCFF] hover:text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Pickup Location */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Local de Coleta</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 flex-1">{delivery.pickup}</p>
                  <Button
                    onClick={() => handleOpenMaps(delivery.pickup)}
                    size="sm"
                    variant="outline"
                  >
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Delivery Location */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Local de Entrega</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 flex-1">{delivery.delivery}</p>
                  <Button
                    onClick={() => handleOpenMaps(delivery.delivery)}
                    size="sm"
                    variant="outline"
                  >
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              {delivery.instructions && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">Instruções</span>
                  </div>
                  <p className="text-gray-700 bg-orange-50 p-3 rounded-lg">{delivery.instructions}</p>
                </div>
              )}

              {/* Time and Distance */}
              <div className="flex justify-between text-sm text-gray-600 pt-2 border-t">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{delivery.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{delivery.distance}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {status === 'accepted' && (
            <Button
              onClick={() => handleStatusUpdate('pickup')}
              className="w-full bg-[#66CCFF] hover:bg-[#4DB8FF] text-white"
            >
              Cheguei no Local de Coleta
            </Button>
          )}

          {status === 'pickup' && (
            <Button
              onClick={() => handleStatusUpdate('in_transit')}
              className="w-full bg-[#66CCFF] hover:bg-[#4DB8FF] text-white"
            >
              Item Coletado - A Caminho
            </Button>
          )}

          {status === 'in_transit' && (
            <Button
              onClick={() => handleStatusUpdate('delivered')}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Confirmar Entrega
            </Button>
          )}

          {status === 'delivered' && (
            <Button
              onClick={handleCompleteDelivery}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Finalizar e Avaliar Cliente
            </Button>
          )}

          {status !== 'delivered' && (
            <Button
              onClick={handleCancelDelivery}
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Cancelar Entrega
            </Button>
          )}
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Avalie o Cliente</h3>
              <div className="flex justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-10 w-10 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => handleRatingChange(star)}
                    fill={star <= rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
                rows="4"
                placeholder="Deixe um comentário opcional sobre o cliente..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <Button
                onClick={handleSubmitRating}
                className="w-full bg-[#66CCFF] hover:bg-[#4DB8FF] text-white mt-4"
                disabled={isSubmittingRating}
              >
                {isSubmittingRating ? 'Enviando...' : 'Enviar Avaliação'}
              </Button>
              <Button
                onClick={() => setShowRatingModal(false)}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 mt-2"
              >
                Cancelar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default DeliveryDetailsScreen
