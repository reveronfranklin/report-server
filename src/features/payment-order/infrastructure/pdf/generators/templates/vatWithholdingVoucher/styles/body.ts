import { StyleDictionary } from 'pdfmake/interfaces';

export const bodyStyles: StyleDictionary = {
  body: {
    alignment: 'center',
    margin: [0, 0, 0, 0],
    fontSize: 6.5
  },
  titleBody: {
    bold: true,
    margin: [0, 10]
  },
  descriptionBodyText: {
    bold: false,
    alignment: 'center'
  },
  descriptionBodyAmount: {
    bold: false,
    alignment: 'right'
  },
  totalHeader: {
    bold: true,
    alignment: 'center',
    margin: [0, 10]
  },
  totalAmount: {
    bold: true,
    alignment: 'right',
    margin: [0, 10]
  }
}