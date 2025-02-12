import { StyleDictionary } from 'pdfmake/interfaces';

export const footerStyles: StyleDictionary = {
  footer: {
    alignment: 'center',
    margin: [40, 10, 80, 0]
  },
  footerSignature: {
    fontSize: 10,
    bold: true,
    alignment: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#444444',
    bold: false,
    alignment: 'center',
    margin: [0, 14, 0, 0],
  }
}