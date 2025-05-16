import { StyleDictionary } from 'pdfmake/interfaces';

export const bodyStyles: StyleDictionary = {
  body: {
    alignment: 'center',
    margin: [0, 0, 0, 0],
    fontSize: 8
  },
  titleBody: {
    bold: true,
    alignment: 'center',
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
  paymentConcept: {
    bold: false,
    alignment: 'left'
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