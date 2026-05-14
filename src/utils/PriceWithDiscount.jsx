

const PriceWithDiscount = (price,dis = 1)=>{
    price = Number(price)
    dis = Number(dis)

    const discountAmount = Math.ceil(price * dis / 100)
    const actualPrice = price - discountAmount
    return actualPrice
}

export default PriceWithDiscount