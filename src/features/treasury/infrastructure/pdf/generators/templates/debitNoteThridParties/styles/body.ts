import { StyleDictionary } from 'pdfmake/interfaces';

const bodyStyles: StyleDictionary = {
  body: {
    alignment: 'center',
    margin: [0, 0, 0, 0]
  },
  tableBody: {
    margin: [5, 5]
  },
  tableBodyTitle: {
    fontSize: 13,
    bold: true,
    lineHeight: 1.5,
    alignment: 'left'
  },
  tableBodyContent: {
    fontSize: 9,
    bold: false,
    alignment: 'justify'
  },
  tableBodyAmountTitle: {
    fontSize: 13,
    bold: true,
    alignment: 'right'
  },
  tableBodyAmountDescription: {
    fontSize: 9,
    bold: true,
    alignment: 'right'
  },
  titleAmount: {
    fontSize: 7,
    bold: true,
    alignment: 'left'
  },
  amount: {
    fontSize: 7,
    lineHeight: 2.5,
    bold: true,
    alignment: 'right'
  }
}

export default bodyStyles;