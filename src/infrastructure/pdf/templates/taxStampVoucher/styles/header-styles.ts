import { StyleDictionary } from 'pdfmake/interfaces';

export const headerStyles: StyleDictionary = {
  header: {
    alignment: 'center',
    margin: [30, 40, 30, 0]
  },
  title: {
    fontSize: 10,
    bold: true,
    alignment: 'center'
  },
  subTitle: {
    fontSize: 8,
    bold: true,
    alignment: 'left',
  }
}