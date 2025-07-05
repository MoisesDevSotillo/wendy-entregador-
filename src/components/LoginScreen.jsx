import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Bike } from 'lucide-react'

const LoginScreen = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    vehicleType: 'moto',
    vehiclePlate: '',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulação de login - em produção seria uma chamada à API
    if (loginData.email && loginData.password) {
      onLogin({
        name: 'Carlos',
        email: loginData.email,
        vehicleType: 'Moto',
        vehiclePlate: 'ABC-1234',
        rating: 4.8
      })
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // Simulação de registro - em produção seria uma chamada à API
    if (registerData.name && registerData.email && registerData.password === registerData.confirmPassword) {
      onLogin({
        name: registerData.name,
        email: registerData.email,
        vehicleType: registerData.vehicleType,
        vehiclePlate: registerData.vehiclePlate,
        rating: 5.0
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#66CCFF] to-[#4DB8FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Bike className="h-10 w-10 text-[#66CCFF]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Wendy Entregador</h1>
          <p className="text-blue-100">Ganhe dinheiro fazendo entregas</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Bem-vindo</CardTitle>
            <CardDescription className="text-center">
              Entre na sua conta ou cadastre-se como entregador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#66CCFF] hover:bg-[#4DB8FF] text-white">
                    Entrar
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">E-mail</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(48) 99999-9999"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      type="text"
                      placeholder="000.000.000-00"
                      value={registerData.cpf}
                      onChange={(e) => setRegisterData({ ...registerData, cpf: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-plate">Placa do veículo</Label>
                    <Input
                      id="vehicle-plate"
                      type="text"
                      placeholder="ABC-1234"
                      value={registerData.vehiclePlate}
                      onChange={(e) => setRegisterData({ ...registerData, vehiclePlate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Sua senha"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#66CCFF] hover:bg-[#4DB8FF] text-white">
                    Criar conta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginScreen

