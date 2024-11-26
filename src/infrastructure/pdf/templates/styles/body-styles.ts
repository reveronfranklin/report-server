import { StyleDictionary } from 'pdfmake/interfaces';

export const bodyStyles: StyleDictionary = {
  body: {
    alignment: 'center',
    margin: [0, 0, 0, 0]
  },
  headerTableBody: {
    fontSize: 7,
    bold: true,
    fillColor: '#d1d1d1',
    alignment: 'center'
  },
  subHeaderTableBody: {
    fontSize: 7,
    bold: true,
    alignment: 'center'
  },
  tableBodyDescription: {
    fontSize: 7,
    alignment: 'left'
  },
  tableBody: {
    fontSize: 7,
    alignment: 'center'
  },
  tableBodyAmount: {
    fontSize: 7,
    alignment: 'right',
  }
}