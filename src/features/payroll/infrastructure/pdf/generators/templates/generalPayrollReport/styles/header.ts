import { StyleDictionary } from 'pdfmake/interfaces';

const headerStyles: StyleDictionary = {
  header: {
    alignment: 'center',
    margin: [0, 10, 0, 10],
  },
  title: {
    fontSize: 12,
    bold: true,
    alignment: 'left',
    fillColor: '#EAEAEA'
  },
  titleVariant: {
    fontSize: 12,
    bold: true,
    alignment: 'right',
    fillColor: '#EAEAEA'
  },
  subTitle: {
    fontSize: 12,
    bold: true,
    alignment: 'right',
  },
  titleFirstColumn:{
    fontSize: 12,
    bold: true,
    alignment: 'center',
    fillColor: '#EAEAEA'
  },
  firstColumn: {
    fontSize: 10,
    bold: true,
    alignment: 'center',
  },
  description: {
    fontSize: 10,
    bold: true,
    alignment: 'left',
  },
  descriptionVariant: {
    fontSize: 10,
    bold: true,
    alignment: 'right',
  }
}

export default headerStyles