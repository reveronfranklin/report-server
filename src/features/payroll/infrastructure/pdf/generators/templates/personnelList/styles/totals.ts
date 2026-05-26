import type { StyleDictionary } from 'pdfmake/interfaces';

const totalStyles: StyleDictionary = {
  departmentTotal: {
    fontSize: 7,
    bold: true,
    alignment: 'right',
    margin: [2, 4, 2, 2]
  },
  grandTotal: {
    fontSize: 8,
    bold: true,
    alignment: 'right',
    margin: [2, 5, 2, 3]
  }
}

export default totalStyles;
