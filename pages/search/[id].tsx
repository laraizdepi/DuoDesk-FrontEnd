import Test from "../../components/test"
import ViewOffice from "../../components/ViewOffice/ViewOffice"
import Navbar from "../../components/NavBar/Navbar"
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
            <Navbar/>
            <ViewOffice office = {oficina}/>
        </div>
    )
}
export default Details
