import { FC } from "react"

interface TestProps {
    name ?: string,
    id : string,
    openDate ?: string
    office : any[]
}

const Test: FC<TestProps> = (props) => {
    const office = props.office
    return (
        <div>
            <h1>
                {office.name}
            </h1>
            <h1>
                {office.openDate}
            </h1>
            <h1>
                {office.name}
            </h1>
        </div>
    )
}

export default Test