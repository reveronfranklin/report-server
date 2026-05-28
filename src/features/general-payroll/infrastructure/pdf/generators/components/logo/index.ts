import type { Content } from 'pdfmake/interfaces';

const getLogoSection = (): Content => {
  const logo: Content = {
    image: 'src/assets/logoLeft.jpeg',
    alignment: 'left',
    fit: [60, 40],
    margin: [0, 0]
  }

  return logo
}

export default getLogoSection