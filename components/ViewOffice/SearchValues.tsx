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
    const subtotal = router.query.cuantity * space[periodComplete]
    const subtotalUgly = (subtotal + subtotal * 15 / 100)
    const total = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(subtotalUgly)
    // console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total));
    console.log('router', router.query)
    console.log(space.hourPrice)
    return (
        <div>
            <p>$ {total}</p>
        </div>
    )
}

export default SearchValues