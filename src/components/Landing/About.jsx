import { Link } from 'react-router-dom'
import { GiStethoscope } from 'react-icons/gi'
import { LiaRibbonSolid } from 'react-icons/lia'

//texto sobre traumatologia y ortopedia
const data = [
  {
    icon: <GiStethoscope />,
    img: 'https://picsum.photos/200',
    title: 'Traumatologia',
    text: 'La traumatología trata lesiones del sistema musculoesquelético, como fracturas y esguinces, utilizando métodos quirúrgicos y no quirúrgicos para restaurar la función y aliviar el dolor.',
    link: '/daily-care'
  },
  {
    icon: <LiaRibbonSolid />,
    img: 'https://picsum.photos/200',
    title: 'Ortopedia',
    text: 'La ortopedia es la especialidad médica que previene, diagnostica y trata trastornos del sistema musculoesquelético, como deformidades, enfermedades y lesiones en huesos, músculos y articulaciones.',
    link: '/daily-care'
  }
]

export const About = () => {
  const print = () => {
    return data.map((item, index) => {
      return <_SingleCard element={item} key={index} />
    })
  }
  return (
    <div className='w-10/12 mx-auto flex flex-wrap'>
      <section className='xl:w-4/12 mb-5'>
        <div>
          <h2 className='text-meditiva text-xl lg:text-4xl mb-3'>
            Acerca de nosotros
          </h2>
          <h3 className='text-3xl lg:text-6xl font-bold mb-3'>
            Meditiva Medical es una empresa 100% Mexicana
          </h3>
          <p className='text-justify mb-3 lg:text-2xl text-slate-700'>
            Nos encargamos proporcionar la mejor tecnología e innovación en
            equipo médico de Traumatologia y Ortopedia, Neuro, Material de
            Curación e Instrumental Quirúrgico de la más alta calidad para
            satisfacer las necesidades del mercado.
          </p>
        </div>
        <div>
          <h3 className='text-2xl font-bold mb-3'>División Corporativa</h3>
          <ul className='flex flex-wrap gap-3'>
            <li
              className={`
                w-5/12 ps-5
                relative
                text-xl
                before:content-["\\2713"] before:text-white before:flex 
                before:justify-center before:items-center
                before:absolute
                before:w-5 before:h-5
                before:bg-meditiva
                before:rounded-full
                before:-left-1
                before:top-1
              `}
            >
              Columna
            </li>
            <li
              className={`
                w-5/12 ps-5
                relative
                text-xl
                before:content-["\\2713"] before:text-white before:flex 
                before:justify-center before:items-center
                before:absolute
                before:w-5 before:h-5
                before:bg-meditiva
                before:rounded-full
                before:-left-1
                before:top-1
              `}
            >
              Cadera
            </li>
            <li
              className={`
                w-5/12 ps-5
                relative
                text-xl
                before:content-["\\2713"] before:text-white before:flex 
                before:justify-center before:items-center
                before:absolute
                before:w-5 before:h-5
                before:bg-meditiva
                before:rounded-full
                before:-left-1
                before:top-1
              `}
            >
              Trauma
            </li>
            <li
              className={`
                w-5/12 ps-5
                relative
                text-xl
                before:content-["\\2713"] before:text-white before:flex 
                before:justify-center before:items-center
                before:absolute
                before:w-5 before:h-5
                before:bg-meditiva
                before:rounded-full
                before:-left-1
                before:top-1
              `}
            >
              Maxilofacial
            </li>
          </ul>
        </div>
      </section>
      <section className='w-full xl:w-8/12 flex flex-wrap gap-10 justify-center'>
        {print()}
      </section>
    </div>
  )
}

const _SingleCard = ({ element }) => {
  return (
    <article className='w-full lg:w-5/12  border border-meditiva'>
      <div className='h-1/2 w-full'>
        <img src={element.img} alt='' className='object-cover h-full w-full' />
      </div>
      <div className='relative px-5 pt-12 h-1/2 flex flex-col justify-center'>
        <div className='absolute -top-10 left-0 flex justify-center w-full  text-3xl'>
          <div className='w-10/12 flex bg-white p-3 gap-3 justify-center items-center shadow-lg'>
            <span className='text-meditiva text-6xl'>{element.icon}</span>
            <h3>{element.title}</h3>
          </div>
        </div>
        <p className='text-justify mb-3'>{element.text}</p>
        <div className='flex justify-center mb-5'>
          <Link
            to={element.link}
            className='bg-meditiva text-white px-8 py-4 rounded-3xl'
          >
            <span>Leer más</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
