import { StyleDictionary } from 'pdfmake/interfaces';

export const subHeaderStyles: StyleDictionary = {
  subHeader: {
    alignment: 'center',
    margin: [20, 5, 60, 20]
  },
  tableSubHeader: {
    fontSize: 6,
    bold: true,
    lineHeight: 1.5,
    alignment: 'left',
  },
  tableSubHeaderPlazo: {
    fontSize: 6,
    bold: true,
    alignment: 'center'
  },
  tableSubHeaderNPay: {
    fontSize: 6,
    bold: true,
    lineHeight: 1.5,
    alignment: 'center'
  },
  tableContentSubHeader: {
    fontSize: 8,
    bold: false,
    color: '#444444',
    alignment: 'left'
  },
  tableContentSubHeaderNPay: {
    fontSize: 8,
    bold: false,
    color: '#444444',
    alignment: 'center'
  },
  tableSubHeaderAmountLetters: {
    fontSize: 6,
    bold: true,
    alignment: 'center'
  },
  tableContentSubHeaderAmountLetters: {
    fontSize: 6,
    bold: true,
    color: '#444444',
    alignment: 'left'
  },
  sinceTo: {
    fontSize: 4,
    bold: true,
  }
}