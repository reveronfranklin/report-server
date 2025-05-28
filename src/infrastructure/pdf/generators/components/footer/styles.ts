import { StyleDictionary } from 'pdfmake/interfaces';

export const footerStyles: StyleDictionary = {
  footer: {
    alignment: 'center',
    margin: [40, 40, 80, 0],
    fontSize: 8
  },
  footerSignature: {
    bold: true,
    alignment: 'center'
  },
  footerText: {
    color: '#444444',
    bold: false,
    alignment: 'center',
    margin: [0, 14, 0, 0]
  },
  footerCurrentPage: {
    color: '#444444',
    bold: false,
    alignment: 'right',
    margin: [0, 10, 0, 0]
  }
}