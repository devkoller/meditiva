import React from 'react'
import { GiStethoscope } from 'react-icons/gi'
import { LiaRibbonSolid } from 'react-icons/lia'

const data = [
  {
    icon: <GiStethoscope />,
    img: 'https://picsum.photos/200',
    title: 'Daily Care',
    text: 'Article smiling respect opinion excited. Welcomed humoured rejoiced peculiar to remaining conveying.',
    link: '/daily-care'
  },
  {
    icon: <LiaRibbonSolid />,
    img: 'https://picsum.photos/200',
    title: 'Cancer Care',
    text: 'Article smiling respect opinion excited. Welcomed humoured rejoiced peculiar to remaining conveying.',
    link: '/daily-care'
  }
]

export const About = () => {
  const print = () => {
    return data.map((item, index) => {
      return _SingleCard({ element: item, key: index })
    })
  }
  return (
    <div className='w-10/12 mx-auto flex flex-wrap'>
      <section className='lg:w-5/12 mb-5'>
        <div>
          <h2 className='text-meditiva text-xl mb-3'>About Us</h2>
          <h3 className='text-2xl font-bold mb-3'>
            A Great Place to Work. A Great Place to Receive Care. Leading
            Medicine
          </h3>
          <p className='text-justify mb-3'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
            maiores, qui impedit animi. Explicabo quibusdam maxime hic eaque
            suscipit voluptate asperiores mollitia, ipsam fugit, optio
            architecto eligendi recusandae provident! Harum.
          </p>
        </div>
        <div>
          <h3 className='text-2xl font-bold mb-3'>Emergency care</h3>
          <ul className='flex flex-wrap  gap-3'>
            <li className='w-5/12 ps-5'>Primary Care</li>
            <li className='w-5/12 ps-5'>Medicine</li>
            <li className='w-5/12 ps-5'>Orthopedic</li>
            <li className='w-5/12 ps-5'>Cardiology</li>
          </ul>
        </div>
      </section>
      <section className='w-full lg:w-7/12 flex flex-wrap gap-10 justify-center'>
        {print()}
      </section>
    </div>
  )
}

const _SingleCard = ({ element }) => {
  return (
    <article className='w-full lg:w-5/12  border border-meditiva'>
      <div className='min-h-40'>
        <img src={element.img} alt='' className='object-cover h-48 w-96' />
      </div>
      <div className='relative px-5 pt-12 min-h-40'>
        <div className='absolute -top-1/4 left-0 flex justify-center w-full  text-3xl'>
          <div className='w-10/12 flex bg-white p-3 gap-3 justify-center items-center shadow-lg'>
            <span>{element.icon}</span>
            <h3>{element.title}</h3>
          </div>
        </div>
        <p className='text-justify mb-3'>{element.text}</p>
        <div className='flex justify-center mb-5'>
          <button className='bg-meditiva text-white px-8 py-4 rounded-3xl'>
            <span>Read More</span>
          </button>
        </div>
      </div>
    </article>
  )
}
