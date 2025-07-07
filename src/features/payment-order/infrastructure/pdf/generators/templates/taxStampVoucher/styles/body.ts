import { StyleDictionary } from 'pdfmake/interfaces';

export const bodyStyles: StyleDictionary = {
  body: {
    alignment: 'center',
    margin: [0, 10],
    fontSize: 8
  },
  titleBody: {
    bold: true
  },
  descriptionBodyText: {
    bold: false,
    alignment: 'center'
  },
  descriptionBodyAmount: {
    bold: false,
    alignment: 'right'
  }
}