import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Package,
  Clock,
  MapPin
} from 'lucide-react'

const EarningsScreen = ({ user }) => {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('today')

  // Dados simulados de ganhos
  const earningsData = {
    today: {
      total: 156.50,
      deliveries: 8,
      hours: 6.5,
      avgPerDelivery: 19.56,
      details: [
        { id: 1, time: '14:30', type: 'Wendy Shop', amount: 18.50, distance: '3.8 km', customer: 'João Santos' },
        { id: 2, time: '13:45', type: 'Moto Entregador', amount: 12.00, distance: '2.5 km', customer: 'Maria Silva' },
        { id: 3, time: '12:20', type: 'Wendy Shop', amount: 25.00, distance: '5.2 km', customer: 'Pedro Costa' },
        { id: 4, time: '11:15', type: 'Moto Entregador', amount: 8.00, distance: '1.2 km', customer: 'Ana Lima' },
        { id: 5, time: '10:30', type: 'Wendy Shop', amount: 32.00, distance: '6.8 km', customer: 'Carlos Oliveira' },
        { id: 6, time: '09:45', type: 'Moto Entregador', amount: 15.00, distance: '3.1 km', customer: 'Lucia Santos' },
        { id: 7, time: '09:00', type: 'Wendy Shop', amount: 22.00, distance: '4.5 km', customer: 'Roberto Silva' },
        { id: 8, time: '08:30', type: 'Moto Entregador', amount: 24.00, distance: '7.2 km', customer: 'Fernanda Costa' }
      ]
    },
    week: {
      total: 892.30,
      deliveries: 45,
      hours: 38.5,
      avgPerDelivery: 19.83
    },
    month: {
      total: 3456.80,
      deliveries: 178,
      hours: 152.3,
      avgPerDelivery: 19.42
    }
  }

  const currentData = earningsData[selectedPeriod]

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'today': return 'Hoje'
      case 'week': return 'Esta Semana'
      case 'month': return 'Este Mês'
      default: return 'Hoje'
    }
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
        <h1 className="text-xl font-semibold">Meus Ganhos</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Period Selector */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Hoje</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mês</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-4 mt-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">R$ {currentData.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Total {getPeriodLabel().toLowerCase()}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Package className="h-8 w-8 text-[#66CCFF] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{currentData.deliveries}</p>
                  <p className="text-sm text-gray-600">Entregas</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{currentData.hours}h</p>
                  <p className="text-sm text-gray-600">Horas trabalhadas</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">R$ {currentData.avgPerDelivery.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Média por entrega</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed List (only for today) */}
            {selectedPeriod === 'today' && currentData.details && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Entregas de Hoje</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentData.details.map((delivery) => (
                      <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant={delivery.type === 'Moto Entregador' ? 'default' : 'secondary'}>
                              {delivery.type}
                            </Badge>
                            <span className="text-sm text-gray-600">{delivery.time}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-800">{delivery.customer}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{delivery.distance}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">R$ {delivery.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Weekly/Monthly Summary */}
            {selectedPeriod !== 'today' && (
              <Card>
                <CardHeader>
                  <CardTitle>Resumo {getPeriodLabel()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-800">Total de Ganhos</span>
                      <span className="text-xl font-bold text-green-600">R$ {currentData.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-[#66CCFF]">{currentData.deliveries}</p>
                        <p className="text-sm text-gray-600">Entregas realizadas</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-500">{currentData.hours}h</p>
                        <p className="text-sm text-gray-600">Horas trabalhadas</p>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                      <p className="text-lg font-bold text-purple-600">R$ {currentData.avgPerDelivery.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Média por entrega</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-lg font-bold text-gray-800">R$ {(currentData.total / currentData.hours).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Ganho por hora</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default EarningsScreen

