import { StyleDictionary } from 'pdfmake/interfaces';

const footerStyles: StyleDictionary = {
  footer: {
    alignment: 'center',
    margin: [0, 0, 0, 0]
  },
  footerTitle: {
    fontSize: 12,
    bold: true,
    alignment: 'center',
    fillColor: '#EAEAEA'
  },
  footerTitleVariant: {
    fontSize: 12,
    bold: true,
    alignment: 'left',
  },
  footerText: {
    fontSize: 10,
    bold: false,
    alignment: 'left'
  },
  footerSignature: {
    fontSize: 10,
    bold: true,
    alignment: 'center'
  }
}

export default footerStyles