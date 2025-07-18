import { StyleDictionary } from 'pdfmake/interfaces';

export const subHeaderStyles: StyleDictionary = {
  subHeader: {
    alignment: 'center',
    margin: [25, 5],
    fontSize: 8
  },
  titleSubHeader: {
    bold: true,
    decoration: 'underline',
    alignment: 'left'
  },
  descriptionSubHeader: {
    bold: false,
    decoration: 'underline',
    alignment: 'left'
  }
}