import { StyleDictionary } from 'pdfmake/interfaces';

const bodyStyles: StyleDictionary = {
  body: {
    alignment: 'center',
    margin: [0, 0, 0, 0]
  },
  titleBody: {
    fontSize: 12,
    bold: true,
    alignment: 'center',
    fillColor: '#EAEAEA'
  },
  titleBodyVariant: {
    fontSize: 12,
    bold: true,
    alignment: 'left',
    fillColor: '#EAEAEA'
  },
  titleBodyAmount: {
    fontSize: 12,
    bold: true,
    alignment: 'right',
    fillColor: '#EAEAEA'
  },
  titleBodyWithoutFill: {
    fontSize: 12,
    bold: true,
    alignment: 'right',
  },
  descriptionBody: {
    fontSize: 10,
    bold: false,
    alignment: 'center'
  },
  descriptionBodyVariant: {
    fontSize: 10,
    bold: false,
    alignment: 'left'
  },
  descriptionBodyAmount: {
    fontSize: 10,
    bold: false,
    alignment: 'right'
  }
}

export default bodyStyles