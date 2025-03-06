import * as os from 'os';

// Función para obtener la IP del servidor
const getServerIp = (environment: string): string => {
  // Verificar si estamos en un entorno de desarrollo
  if (environment === 'development') {
    return '127.0.0.1'
  }

  const networkInterfaces = os.networkInterfaces()

  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName]

    for (const address of addresses) {
      // Filtrar direcciones IPv4 y no de loopback
      if (address.family === 'IPv4' && !address.internal) {
        return address.address // Retornar la primera IP válida encontrada
      }
    }
  }

  return 'localhost'
}

export default getServerIp