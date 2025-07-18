import type { Content } from 'pdfmake/interfaces';
import { ReportHeaderDto } from '../../../../../../application/dtos/debitNoteThirdParties/report-header.dto';
import getLogoSection from '../../../components/logo';

const getHeaderSection = (options: ReportHeaderDto): Content => {
  const {
    checkNumber,
    checkDate,
    name,
    accountNumber
  } = options

  const logo = getLogoSection()

  const formattedTitle = {
    text: 'NOTA DE DÉBITO',
    style: 'orderTitle'
  }

  const fifthRowBorder = [false, false]
  const sixthRowBorder = [false, false, true, false]

  const contentHeader: Content = {
    style: 'header',
    table: {
      widths: ['*', '*', 20, 20, '*', '*'],
      heights: [35, 10, 10, 10],
      body: [
        [
          {
            stack: [
              logo,
              formattedTitle
            ],
            rowSpan: 4,
            colSpan: 3
          },
          {}, {},
          {
            rowSpan: 4,
            text: null,
            border: [true, true, false, true]
          },
          {
            text: null,
            border: [false, true, false, false]
          },
          {
            text: [
              { text: `${ checkNumber ?? '' }\n`, style: 'tableHeader' },
              { text: 'N° NOTA DE DÉBITO:', style: 'tableHeader' }
            ],
            margin: [0, 10, 10, 0],
            border: [false, true, true, false]
          }
        ],
        [
          {}, {}, {}, {},
          {
            text: 'Fecha:',
            style: 'tableHeader',
            border: fifthRowBorder
          },
          {
            text: `${ checkDate ?? '' }`,
            style: 'tableContent',
            border: sixthRowBorder
          }
        ],
        [
          {}, {}, {}, {},
          {
            text: 'Banco:', style: 'tableHeader',
            border: fifthRowBorder
          },
          {
            text: `${ name ?? '' }`,
            style: 'tableContent',
            border: sixthRowBorder
          }
        ],
        [
          {}, {}, {}, {},
          {
            text: 'N° de Cuenta:',
            style: 'tableHeader',
            border: [false, false, false, true],
            margin: [0, 0, 0, 10]
          },
          {
            text: `${ accountNumber ?? '' }`,
            style: 'tableContent',
            border: [false, false, true, true],
            margin: [0, 0, 0, 10]
          }
        ]
      ]
    }
  }

  return contentHeader
}

export default getHeaderSection;