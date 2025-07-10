import { log } from 'console';
import type { Content } from 'pdfmake/interfaces';

const getLogoSection = (): Content => {
  const logo: Content = {
    image: 'src/assets/logoLeft.jpeg',
    width: 120,
    height: 60,
    alignment: 'left',
    fit: [130, 70],
    margin: [4, 4, 10, 0]
  }

  return logo
}

export default getLogoSection