interface ProductType {
    id: string,
    catid: string,
    brandid: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    discount: number,
    status: number,
    created_at: Date,
    updated_at: Date,
    product_detail: {
        color: string,
        size: string,
        quantity: number
    }[],
    first_image: {
        image: string;
        id: string;
    } | null;
}
export default ProductType;