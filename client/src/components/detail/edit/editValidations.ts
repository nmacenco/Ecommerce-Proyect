import { Product, ProductForm } from "../../../redux/interface";

export default function editValidations(props: ProductForm, props2: Product): boolean {
    let bool: boolean = false,
        name: boolean = false,
        BrandId: boolean = false,
        SubcategoryId: boolean = false,
        image: boolean = false,
        price: boolean = false,
        description: boolean = false,
        weight: boolean = false,
        stock: boolean = false

    if (props.name !== "") {
        name = true;
    }
    if (props.BrandId > 0) {
        BrandId = true;
    }
    if (props.SubcategoryId > 0) {
        SubcategoryId = true;
    }
    if (props.image !== "") {
        image = true;
    }
    if (props.description !== "") {
        description = true;
    }
    if (props.weight > 0) {
        weight = true;
    }
    if (props.price > 0) {
        price = true;
    }
    if (props.stock > 0) {
        stock = true;
    }

    if (name && BrandId && description && image && price && SubcategoryId && weight && stock) bool = true;

    return bool
}