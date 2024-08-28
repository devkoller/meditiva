import React from 'react'
import { GiCrossedBones } from 'react-icons/gi'

import columna from '@/assets/imgs/productos/columna.png'
import cadera from '@/assets/imgs/productos/cadera.png'
import trauma from '@/assets/imgs/productos/trauma.png'
import maxilo from '@/assets/imgs/productos/maxilo.png'

const data = [
  {
    icon: columna,
    title: 'Columna',
    text: 'Comprometidos en brindar servicios neuroquirúrgicos  con soluciones inmediatas, proponiendo el uso de alta tecnología médica y biológicos Vanguardistas, mejorando y prolongando la calidad de vida de las personas.',
    list: [
      'Neuro',
      'Columna minima invasión',
      'Columna cervical',
      'Columna lumbar',
      'Biológicos'
    ]
  },
  {
    icon: cadera,
    title: 'Cadera y rodilla',
    text: 'Dedicados al reemplazo articular, ofreciendo soluciones en artroplastia total de rodilla y cadera.',
    list: [
      'Cementada',
      'No cementada',
      'Revisión',
      'A3 GT - sistema de rodilla',
      'ACCK - sistema de rodilla'
    ]
  },
  {
    icon: trauma,
    title: 'Trauma y fijadores',
    text: 'Diseñadors para el tratamiento de fracturas, osteotomías o artrodesis del sistema músculo esquelético de forma externa.',
    list: [
      'Miembro superior',
      'Miembro inferior',
      'Clavos intramedulares',
      'Pediátricos',
      'Cardiotorácicos'
    ]
  },
  {
    icon: maxilo,
    title: 'Maxilofacial',
    text: 'Diseñado para la atención en cráneo maxilofacial que fija de forma rígida de las fracturas.',
    list: [
      'Placas',
      'Tornillos',
      'Mallas',
      'Rejillas',
      'Implantes personalizados'
    ]
  }
]

export const Services = () => {
  const print = () => {
    return data.map((item, index) => {
      return <_SingleService element={item} key={index} index={index} />
    })
  }
  return (
    <section className='w-10/12 mx-auto mb-5'>
      <div>
        <h1 className='text-4xl text-center my-10'>Nuestros productos</h1>
      </div>
      <ul className='flex flex-wrap justify-center gap-10 [counter-reset:section]'>
        {print()}
      </ul>
    </section>
  )
}

const _SingleService = ({ element, index }) => {
  return (
    <li
      className={`
      bg-white p-10 w-full xl:w-5/12 flex flex-col gap-5 relative rounded-md
        before:[counter-increment:section]
        before:content-['0'counter(section)]
        before:text-slate-50 before:text-8xl before:font-bold 
        before:absolute before:top-20 before:right-5 lg:before:right-20

    `}
      data-aos={`${index % 2 == 0 ? 'fade-right' : 'fade-left'}`}
    >
      <div className='min-h-40'>
        <img src={element.icon} alt='' className='w-6/12' />
        {/* <span className='text-8xl text-meditiva'>{element.icon}</span> */}
      </div>
      <div>
        <h2 className='text-2xl font-bold mb-3'>{element.title}</h2>
        <p className='text-justify'>{element.text}</p>
      </div>
      <ul className='grid grid-cols-2 gap-3'>
        {element.list.map((item, index) => {
          return (
            <li
              key={index}
              className={`
                relative ps-5
                text-xl
                before:content-["\\2713"] before:text-meditiva before:flex 
                before:justify-center before:items-center
                before:absolute
                before:w-5 before:h-5
                before:rounded-full
                before:-left-1
                before:top-1
          `}
            >
              {item}
            </li>
          )
        })}
      </ul>
    </li>
  )
}
