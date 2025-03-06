import { StyleDictionary } from 'pdfmake/interfaces';

export const totalStyles: StyleDictionary = {
  total: {
    alignment: 'center',
    margin: [0, 10],
    fontSize: 8
  },
  totalHeader: {
    bold: true,
    decoration: 'underline',
    alignment: 'left'
  },
  totalTitle: {
    bold: true,
    alignment: 'left'
  },
  totalTitleLast: {
    bold: true,
    alignment: 'right',
    margin: [35, 0]
  },
  totalAmount: {
    bold: true,
    alignment: 'center'
  }
}