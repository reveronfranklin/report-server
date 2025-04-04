const getWatermark = (status: string) => {
  const config = {
    text: (status === 'annulled') ? 'ANULADA' : null,
    color: 'red',
    opacity: 0.3,
    bold: true,
    italics: false,
    angle: null,
    fontSize: 170
  }

  return (status === 'annulled') ? config : null
}

export default getWatermark