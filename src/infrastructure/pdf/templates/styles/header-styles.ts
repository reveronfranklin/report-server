import { StyleDictionary } from 'pdfmake/interfaces';

export const headerStyles: StyleDictionary = {
  header: {
    alignment: 'center',
    margin: [20, 25, 60, 5]
  },
  orderTitle: {
    fontSize: 13,
    bold: true,
    alignment: 'right',
    margin: [0, -25, 10, 0]
  },
  orderTitleVariable: {
    fontSize: 13,
    bold: true,
    alignment: 'right',
    margin: [0, -35, 10, 0]
  },
  orderTitleTwo: {
    fontSize: 13,
    bold: true,
    alignment: 'right',
    margin: [0, 0, 30, 0]
  },
  tableHeader: {
    fontSize: 7,
    bold: true,
    margin: [0, 15, 0, 0],
    alignment: 'center'
  },
  tableContent: {
    fontSize: 9,
    bold: false,
    color: '#444444',
    margin: [0, 15, 0, 0],
    alignment: 'center'
  }
}