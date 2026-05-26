import type { StyleDictionary } from 'pdfmake/interfaces';

const bodyStyles: StyleDictionary = {
  departmentTitle: {
    fontSize: 8,
    bold: true,
    alignment: 'center'
  },
  departmentLabel: {
    fontSize: 8,
    bold: true,
    alignment: 'center'
  },
  tableHeader: {
    fontSize: 7,
    bold: true,
    alignment: 'center'
  },
  tableCell: {
    fontSize: 7,
    margin: [2, 4, 2, 2]
  },
  tableCellCenter: {
    fontSize: 7,
    alignment: 'center',
    margin: [2, 4, 2, 2]
  },
  tableCellRight: {
    fontSize: 7,
    alignment: 'right',
    margin: [2, 4, 2, 2]
  }
}

export default bodyStyles;
