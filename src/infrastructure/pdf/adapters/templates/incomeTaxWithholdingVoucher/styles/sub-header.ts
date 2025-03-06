import { StyleDictionary } from 'pdfmake/interfaces';

export const subHeaderStyles: StyleDictionary = {
  subHeader: {
    alignment: 'left',
    margin: [20, 25, 60, 30],
    fontSize: 9
  },
  titleSubHeader: {
    bold: true,
    margin: [0, 20]
  },
  descriptionSubHeader: {
    bold: false,
    margin: [0, 0]
  }
}