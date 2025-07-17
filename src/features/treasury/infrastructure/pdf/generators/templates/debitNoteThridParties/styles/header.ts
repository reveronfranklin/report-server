import { StyleDictionary } from 'pdfmake/interfaces';

const headerStyles: StyleDictionary = {
  header: {
    alignment: 'center',
    margin: [0, 0, 0, 10]
  },
  orderTitle: {
    fontSize: 13,
    bold: true,
    alignment: 'right',
    margin: [0, -25, 10, 0]
  },
  tableHeader: {
    fontSize: 10,
    bold: true,
    alignment: 'right'
  },
  tableContent: {
    fontSize: 8,
    bold: true,
    alignment: 'center'
  }
}

export default headerStyles;