import { StyleDictionary } from 'pdfmake/interfaces';

const StaticHeaderStyles: StyleDictionary = {
  staticHeader: {
    alignment: 'center',
    margin: [20, 10, 20, 10]
  },
  headerCurrentPage: {
    fontSize: 10,
    bold: false,
    alignment: 'right'
  },
  headerTitle: {
    fontSize: 12,
    bold: true,
    alignment: 'center'
  },
  headerText: {
    fontSize: 10,
    bold: false,
    alignment: 'center'
  }
}

export default StaticHeaderStyles;