import { StyleDictionary } from 'pdfmake/interfaces';

export const footerStyles: StyleDictionary = {
  footer: {
    alignment: 'center',
    margin: [40, 10, 80, 0]
  },
  footerSignature: {
    fontSize: 7,
    bold: true,
    alignment: 'center',
  }
}