import { StyleDictionary } from 'pdfmake/interfaces';

export const headerStyles: StyleDictionary = {
  header: {
    alignment: 'center',
    margin: [20, 20, 60, 10],
  },
  title: {
    fontSize: 10,
    bold: true,
    margin: [0, 20]
  },
  subTitle: {
    fontSize: 6,
    bold: false,
    alignment: 'left',
    margin: [0, 0]
  }
}