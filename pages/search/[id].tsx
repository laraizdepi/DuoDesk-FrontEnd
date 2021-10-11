import Test from "../../components/test"

export const getStaticPaths = async () =>{
    const res = await fetch('http://localhost:5000/offices')
    const data = await res.json()

    const paths = data.map((oficina : any) =>{
        console.log(oficina.id);
        
        return {
            params : {id: oficina.id.toString()}
        }
    })
    return {
        paths, 
        fallback : false
    }
}
export const getStaticProps = async (context: { params: { id: any; }; }) =>{
    const id = context.params.id
    const res = await fetch(`http://localhost:5000/offices/${id}`)
    const data = await res.json()
    return{
        props : {oficina:data}
    }
}

const Details = ({oficina}) => {
    return (
        <div>
            <h1>
                {oficina.name}
            </h1>
            <h1>
                {oficina.openDate}
            </h1>
            <h1>
                {oficina.name}
            </h1>
            <Test />
            <h1>
                hello world
            </h1>
        </div>
    )
}
export default Details
