import type { Content } from 'pdfmake/interfaces';

const getLogoSection = (): Content => {
  const logo = {
    image: 'src/assets/logoLeft.jpeg',
    alignment: 'left',
    fit: [130, 70],
    margin: [4, 4, 10, 0]
  }

  return logo as unknown as Content
}

export default getLogoSection