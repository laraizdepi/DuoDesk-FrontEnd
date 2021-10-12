import { FC } from "react"

interface TestProps {
    name ?: string,
    id ?: string,
    openDate ?: string
}

const Test: FC<TestProps> = (props) => {
    const getStaticProps = async (props: { id: any }) => {
        // const id = context.params.id
        const res = await fetch(`http://localhost:5000/offices/61623ddbf450eae837f9a7b1`)
        const data = await res.json()
        console.log(`data : ${data}`);
        console.log(`res : ${res}`);
        console.log({res});
        
    }
    getStaticProps(props.id)
    
    return (
        <div>
            <h1>
                {props.name}
            </h1>
            <h1>
                {props.openDate}
            </h1>
            <h1>
                {props.name}
            </h1>
        </div>
    )
}

export default Test