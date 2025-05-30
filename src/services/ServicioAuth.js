import http from "./axios/http-axios"

const ServicioAuth = {
  async login(email, password) {
    try {
      const { data } = await http.get(`/users?email=${email}`)
      if (data.length === 0) {
        throw new Error("Usuario no encontrado")
      }

      const doctor = data[0]
      if (doctor.password !== password) {
        throw new Error("Contraseña incorrecta")
      }

      return doctor
    } catch (error) {
      throw error
    }
  }
}

export default ServicioAuth
