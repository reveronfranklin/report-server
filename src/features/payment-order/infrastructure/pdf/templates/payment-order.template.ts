import { TDocumentDefinitions } from 'pdfmake/interfaces';

export function createPaymentOrderTemplate(data: any): TDocumentDefinitions {
  return {
    content: [
      { text: 'ORDEN DE PAGO', style: 'header' },
      // ... (resto de la definición del documento)
    ],
    styles: {
      // ... (estilos del documento)
    }
  };
}