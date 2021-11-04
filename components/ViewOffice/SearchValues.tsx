import { useRouter } from 'next/router'
import { FC } from 'react'
import { Text } from '@mantine/core'

interface SearchProps {
    space: any
}
const SearchValues: FC<SearchProps> = (props) => {
    const space = props.space
    const router = useRouter()
    const periodComplete = `${router.query.period}Price`
    const subtotal = Number(router.query.cuantity) * space[periodComplete]
    const subtotalUgly = (subtotal + subtotal * 15 / 100)
    const total = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(subtotalUgly)
    if (subtotal > 0) {
        return (
            <div>
                <Text>$ {total}</Text>
            </div>
        )
    } else {
        console.log('total', total);
        return (
            <div>
                <Text>Haz tu busqueda</Text>
            </div>
        )
    }
}

export default SearchValues