import { Badge } from "@mantine/core"
import { FC, useState, useEffect } from "react"
import { string } from "yup/lib/locale"
import style from "./stepTwo.module.sass"
import axios from 'axios'

interface AmenidadesProps {
    id?: string,
    color?: string
}
// const Amenidades: FC<AmenidadesProps> = (props) => {
const Amenidades = () => {
    const [products, setProducts] = useState([]);
    // console.log(getProductsSmall()); 

    const getData = () => {
        axios.get("data/office-info.json")
            // .then(data => console.log(data.data.data))
            .then(data => setProducts(data.data.data));
    }
    // getData()
    useEffect(getData, [])
    return (
        products.map((product: any) => {
            return (
                <Badge
                    color="pink"
                    variant="filled"
                    size="md"
                    radius='md'
                    className={style.Badge}>
                    {product.amenidades[0]}
                    {/* <h1>***</h1> */}
                    {/* <h1>Hello World</h1> */}
                </Badge>
            )
        }))
}
export default Amenidades