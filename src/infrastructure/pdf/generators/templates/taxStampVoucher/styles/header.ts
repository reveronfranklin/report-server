import { StyleDictionary } from 'pdfmake/interfaces';

export const headerStyles: StyleDictionary = {
  header: {
    alignment: 'center',
    margin: [25, 25, 25, 0]
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