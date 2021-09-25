import Phrase from "../Phrase/Phrases";
import Leader from '../../Img/home/Leader.svg'
import science from '../../Img/home/science.svg'
import payment from '../../Img/home/payment.svg'
import ButtonTail from '../Button/ButtonTail'

const AllPhrases = () => {
    return (
        <div>
            <Phrase title='Relaciones' img={Leader.src} wordImp='Encuentra tu proximo cofundador' color = '#12b886'/>
            <Phrase title='Explora' img={science.src} wordImp='Trabaja donde quieras' color = "#e64980" />
            <Phrase title='Mas Economico' img={payment.src} wordImp='no contratos' color = '#4c6ef5' component = {<ButtonTail/>} />
        </div>
    )
}

export default AllPhrases