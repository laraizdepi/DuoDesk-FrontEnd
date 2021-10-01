export class ProductService {
    getProductsSmall() {
        return fetch('data/office-info.json')
        .then(res => res.json())
        .then(d => d.data);
    }
}
