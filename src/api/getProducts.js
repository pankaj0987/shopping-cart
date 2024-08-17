// function to get product list
async function getProducts() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=10`)
        const data =await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }

}

export { getProducts}