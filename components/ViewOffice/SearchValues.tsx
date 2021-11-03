import { useRouter } from 'next/router'
import { FC } from 'react'
import { Button } from '@mantine/core'

interface SearchProps {
    space: any
}
const SearchValues: FC<SearchProps> = (props) => {

    const space = props.space
    const router = useRouter()
    const periodComplete = `${router.query.period}Price`
    const subtotal = Number(router.query.cuantity) * space[periodComplete]
    // const subtotalUgly = (subtotal)
    const subtotalUgly = (subtotal + subtotal * 15 / 100)

    const total = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(subtotalUgly)
    // console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total));
    // console.log('router', router.query)
    // console.log(space.hourPrice)

    console.log('subtotal',);

    if (subtotal > 0) {
        console.log('type of number', typeof subtotal);
        console.log('there are a number', subtotalUgly);
        return (
            <div>
                <p>$ {total}</p>
            </div>
        )
    } else {
        console.log('total', total);
        return (
            <div>
                <p>HAS TU BUSQUEDA</p>
            </div>
        )
    }
}

export default SearchValues