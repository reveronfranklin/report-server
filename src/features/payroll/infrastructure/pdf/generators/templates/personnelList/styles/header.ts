import type { StyleDictionary } from 'pdfmake/interfaces';

const headerStyles: StyleDictionary = {
  reportHeader: {
    fontSize: 8,
    bold: true
  },
  reportHeaderTitle: {
    fontSize: 10,
    bold: true,
    alignment: 'center'
  },
  reportHeaderMeta: {
    fontSize: 8,
    bold: true,
    alignment: 'right'
  }
}

export default headerStyles;
