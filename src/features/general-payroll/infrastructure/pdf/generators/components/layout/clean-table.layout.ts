import { CustomTableLayout } from 'pdfmake/interfaces';

export const getCleanTableLayout = (): CustomTableLayout => {
  return {
    hLineWidth: (i, node) => (i === 0 || i === node.table.headerRows) ? 1 : 0.5,
    hLineColor: () => '#d3d3d3',
    vLineWidth: () => 0,
    paddingTop: (i) => i === 0 ? 1.5 : 4,
    paddingBottom: (i) => i === 0 ? 1.5 : 4,
    paddingLeft: () => 5,
    paddingRight: () => 5
  }
}