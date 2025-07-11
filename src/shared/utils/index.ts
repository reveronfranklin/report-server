/* Dependencies */
import moment from 'moment-timezone';

/* Functions */
const calculateTaxableIncome = (taxBase: number, totalGrossAmount: number, totalTaxExempt: number, totalAmountVat: number): number => {
  if (taxBase !== 0) {
    return taxBase
  } else if (totalGrossAmount === totalTaxExempt) {
    return totalGrossAmount
  } else {
    return (totalGrossAmount - totalAmountVat)
  }
}

const formatDate = (date: any): any => {
  const formattedDate = moment(date)
  return formattedDate.tz('UTC').format('DD/MM/YYYY')
}

const twoDigitFormatDate = (date: any): any => {
  const formattedDate = moment(date)
  return formattedDate.tz('UTC').format('DD/MM/YY')
}

const formatFiscalPeriod = (date: any): any => {
  const formattedDate = moment(date)
  const year          = formattedDate.tz('UTC').format('YYYY')
  const month         = formattedDate.tz('UTC').format('MM')
  return `Año: ${year} Mes: ${month}`
}

const formatPercentageRetention = (percentage: number | string): any => {
  // Asegurarse de que estamos trabajando con un número
  const numericPercentage = typeof percentage === 'string' ? parseFloat(percentage) : percentage

  // Verificar si el valor es un número válido
  if (isNaN(numericPercentage)) {
    console.log(`Valor inválido para formatPercentageRetention: ${percentage}`)
    return '0.00'
  }

  // Convertir el número a una cadena con 2 decimales
  let formattedNumber = numericPercentage.toFixed(2)

  // Separar la parte entera y decimal
  let [integerPart, decimalPart] = formattedNumber.split('.')

  // Formatear la parte entera con separadores de miles
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Reconstruir el número con la parte decimal
  formattedNumber = `${integerPart}.${decimalPart}`

  // Eliminar espacios en blanco al inicio y al final
  return formattedNumber.trim()
}

const formatPrice = (price: number, currency: string) => {
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);

  // Eliminar 'VES' si aparece al final, con o sin espacio
  return formattedPrice.replace(/\s*VES$/, '').trim();
}

const formatRIF = (rif: any): any => {
  if (!rif) {
    return null
  }
  // Eliminar cualquier guión existente en el RIF
  const cleanRIF = rif.replace(/-/g, '')

  // Obtener el primer carácter
  const firstChar = cleanRIF.charAt(0)

  // Obtener el resto de los caracteres, rellenando con ceros a la izquierda si es necesario
  const restOfRIF = cleanRIF.slice(1).padStart(9, '0')
  return `${firstChar}-${restOfRIF}`
}

const isValidDate =(date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime())
}

const rpad = (str: string, length: number): string => {
  if (str === undefined || str === null) {
    return null
  }
  // Convierte el valor a una cadena si no lo es
  let result = String(str)

  // Si la longitud de la cadena es menor que la longitud deseada, se rellena con espacios
  while (result.length < length) {
    result += ' '
  }

  // Si la longitud de la cadena es mayor que la longitud deseada, se trunca
  return result.substring(0, length)
}

const getCurrentDate = (): string => {
    const targetTimezone = 'America/Caracas'
    const formattedDate = moment.tz(targetTimezone).format('DD/MM/YYYY hh:mm:ss A')

    return formattedDate
}

export {
  calculateTaxableIncome,
  formatDate,
  formatFiscalPeriod,
  formatPercentageRetention,
  formatPrice,
  formatRIF,
  getCurrentDate,
  isValidDate,
  rpad,
  twoDigitFormatDate
}