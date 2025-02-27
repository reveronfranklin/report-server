import { StyleDictionary } from 'pdfmake/interfaces';

export const footerStyles: StyleDictionary = {
  footer: {
    alignment: 'center',
    margin: [30, 0, 30, 30],
    fontSize: 8
  },
  footerTitle: {
    bold: true,
    alignment: 'center',
    decoration: 'underline'
  },
  footerSignature: {
    bold: true,
    alignment: 'left'
  },
  footerText: {
    fontSize: 10,
    color: '#444444',
    bold: false,
    alignment: 'center',
    margin: [0, 10, 0, 0]
  },
  footerCurrentPage: {
    fontSize: 8,
    color: '#444444',
    bold: false,
    alignment: 'right',
    margin: [0, 10, 0, 0]
  }
}