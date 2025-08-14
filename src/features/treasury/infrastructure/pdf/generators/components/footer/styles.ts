import { StyleDictionary } from 'pdfmake/interfaces';

const footerStyles: StyleDictionary = {
  footer: {
    alignment: 'center',
    margin: [35, 10, 75, 10],
    fontSize: 7
  },
  footerSignature: {
    bold: true,
    alignment: 'center'
  },
  footerNamePresident: {
    color: '#999999',
    bold: false,
    alignment: 'center'
  },
  footerSoftText: {
    color: '#555555',
    bold: false,
    alignment: 'center',
    margin: [0, 10, 0, 0]
  },
  footerCurrentPage: {
    alignment: 'right'
  },
  footerCurrentDate: {
    alignment: 'left'
  }
}

export default footerStyles;