

const DisplayPriceInRupees = (price) => {
  const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
}).format(price)

  return currencyFormatter
}

export default DisplayPriceInRupees