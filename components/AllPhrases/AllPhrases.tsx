import Phrase from "../Phrase/Phrases";
import Leader from '../../Img/home/Leader.svg'
import science from '../../Img/home/science.svg'
import payment from '../../Img/home/payment.svg'

const AllPhrases = () => {
    return (
        <div>
            <Phrase title='Relaciones' img={Leader.src} wordImp='re' />
            <Phrase title='Explora' img={science.src} wordImp='ex' />
            <Phrase title='Mas Economico' img={payment.src} wordImp='ex' />
        </div>
    )
}

export default AllPhrases