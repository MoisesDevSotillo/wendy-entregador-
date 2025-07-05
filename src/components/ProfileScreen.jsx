import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, User, Mail, Phone, MapPin, Edit, Save, X, Car, Star, Award } from 'lucide-react'

const ProfileScreen = ({ user, onBack, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || 'Carlos Silva',
    email: user?.email || 'carlos@email.com',
    phone: user?.phone || '(48) 99999-9999',
    cpf: user?.cpf || '123.456.789-00',
    vehiclePlate: user?.vehiclePlate || 'ABC-1234',
    vehicleModel: user?.vehicleModel || 'Honda CG 160',
    address: user?.address || 'Rua dos Entregadores, 456 - Centro'
  })

  const handleSave = () => {
    onUpdateProfile(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || 'Carlos Silva',
      email: user?.email || 'carlos@email.com',
      phone: user?.phone || '(48) 99999-9999',
      cpf: user?.cpf || '123.456.789-00',
      vehiclePlate: user?.vehiclePlate || 'ABC-1234',
      vehicleModel: user?.vehicleModel || 'Honda CG 160',
      address: user?.address || 'Rua dos Entregadores, 456 - Centro'
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#66CCFF] text-white p-4 rounded-b-3xl">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-[#4DB8FF] p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Meu Perfil</h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6 space-y-4">
        {/* Profile Info Card */}
        <Card className="shadow-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-[#66CCFF]/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-[#66CCFF]" />
            </div>
            <CardTitle className="text-xl text-gray-800">
              {isEditing ? 'Editar Perfil' : 'Informações Pessoais'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 inline mr-2" />
                  Nome
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded border">{formData.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded border">{formData.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Telefone
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded border">{formData.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 inline mr-2" />
                  CPF
                </Label>
                {isEditing ? (
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded border">{formData.cpf}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Endereço
                </Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 p-2 bg-gray-50 rounded border">{formData.address}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              {isEditing ? (
                <>
                  <Button 
                    onClick={handleSave}
                    className="flex-1 bg-[#66CCFF] hover:bg-[#4DB8FF] text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-[#66CCFF] hover:bg-[#4DB8FF] text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Info Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center">
              <Car className="h-5 w-5 mr-2 text-[#66CCFF]" />
              Informações do Veículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="vehiclePlate" className="text-sm font-medium text-gray-700">
                Placa
              </Label>
              {isEditing ? (
                <Input
                  id="vehiclePlate"
                  value={formData.vehiclePlate}
                  onChange={(e) => setFormData({...formData, vehiclePlate: e.target.value})}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded border">{formData.vehiclePlate}</p>
              )}
            </div>

            <div>
              <Label htmlFor="vehicleModel" className="text-sm font-medium text-gray-700">
                Modelo
              </Label>
              {isEditing ? (
                <Input
                  id="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded border">{formData.vehicleModel}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center">
              <Award className="h-5 w-5 mr-2 text-[#66CCFF]" />
              Estatísticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-2xl font-bold text-gray-800">{user?.rating || '4.8'}</span>
                </div>
                <p className="text-sm text-gray-600">Avaliação</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{user?.totalDeliveries || '247'}</p>
                <p className="text-sm text-gray-600">Entregas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfileScreen

