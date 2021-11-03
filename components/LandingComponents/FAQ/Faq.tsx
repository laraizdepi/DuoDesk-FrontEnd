import React from 'react'
import { Accordion, Title, Text, ThemeIcon } from '@mantine/core'
import { FaRegHandshake, FaRegMoneyBillAlt } from 'react-icons/fa'
import { RiCriminalLine, RiNewspaperLine } from 'react-icons/ri'
import { CgCalculator } from 'react-icons/cg'
import { MdSupportAgent } from 'react-icons/md'
import { FiUserX } from 'react-icons/fi'

const Faq = () => {
    const data = [
        {
            question: '¿DuoDesk tiene algún costo?',
            answer: 'El uso en sí de la plataforma es gratuito y puedes navegar por ella sin ningún problema. Los unicos costos que se te cobran es a la hora de reservar tu oficina, donde sí tendrás que pagar para recibir el servicio',
            icon: <ThemeIcon color='indigo' variant='light' radius='xl'><FaRegMoneyBillAlt/></ThemeIcon>
        },
        {
            question: '¿La publicación de la oficina tiene algún costo o vigencia?',
            answer: 'No. Cuando registras una oficina no te cobramos y empezará a funcionar desde el día que escojas en el registro, hasta que decidas eliminarla de nuestra plataforma. Además, el unico costo será una comisión frente a la renta de la oficina',
            icon: <ThemeIcon><RiNewspaperLine/></ThemeIcon>
        },
        {
            question: '¿Cuanto es el valor de la comisión por publicar una oficina?',
            answer: 'Te cobraremos un 15% de cada renta que realices en la plataforma. Es decir, sí en algún momento un DuoUser renta una espacio en tu oficina por un valor de $100.000COP, nosotros te cobramos $15.000COP. Este descuento se hace automaticamente.',
            icon: <ThemeIcon><CgCalculator/></ThemeIcon>
        },
        {
            question: '¿Qué canales existen para el soporte?',
            answer: 'En nuestra plataforma podrás encontrar como medios directos un correo electronico y un número de celular. Sí necesitas otros medios, contaremos con Facebook(Messenger), Whatsapp, Instagram y Twitter.',
            icon: <ThemeIcon><MdSupportAgent/></ThemeIcon>
        },
        {
            question: '¿Es seguro el contacto con los DuoHosts?',
            answer: 'Efectivamente. Nuestro objetivo es mantener la seguridad en la plataforma, por eso constantemente buscamos mejorar los canales de comunicación e incluso tenemos contacto con los DuoHosts para cualquier caso.',
            icon: <ThemeIcon><FaRegHandshake/></ThemeIcon>
        },
        {
            question: '¿Qué debo hacer sí se presenta un fraude en la plataforma?',
            answer: 'Inmediatamente comunicate con nuestro soporte y te indicaremos los pasos a seguir. Sí es necesario, bloquearemos el servicio en la oficina que incurra en este hecho o la cuenta del usuario.',
            icon: <ThemeIcon><RiCriminalLine/></ThemeIcon>
        },
        {
            question: '¿Qué sucede al cancelar mi cuenta?',
            answer: 'Se perderan todos tus registros como pueden ser: Reservas, Oficinas a tu nombre, transacciones, etc. Esto implica que afectará también la parte economica que puede terminar en la perdida de dinero sin reembolso.',
            icon: <ThemeIcon><FiUserX/></ThemeIcon>
        }
    ]

    return (
        <div className='flex flex-col space-y-5 my-5'>
            <Text component={Title} align='center'>Preguntas y Respuestas frecuentes</Text>
            <Accordion  initialItem={-1} className='px-80'>
                {data.map((element) => {
                    return (
                        <Accordion.Item icon={element.icon} label={element.question} key={element.question}>
                            {element.answer}
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </div>
    )
}

export default Faq
