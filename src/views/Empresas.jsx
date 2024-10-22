import React from 'react'
import { AuthWrapper, Toolbar, MantineDataTable, Button } from '@/components'
import { Link } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'

//Dataset of clientes to be displayed in the table
const data = [
  {
    id: 1,
    nombre: 'Empresa 1',
    rfc: 'RFC 1',
    correo: 'Correo 1',
    telefono: 'Telefono 1'
  },
  {
    id: 2,
    nombre: 'Empresa 2',
    rfc: 'RFC 2',
    correo: 'Correo 2',
    telefono: 'Telefono 2'
  },
  {
    id: 3,
    nombre: 'Empresa 3',
    rfc: 'RFC 3',
    correo: 'Correo 3',
    telefono: 'Telefono 3'
  }
]

export const Empresas = () => {
  const columns = [
    { accessor: 'id', title: 'ID', hidden: true },
    { accessor: 'nombre', title: 'Nombre', filter: 'text' },
    { accessor: 'rfc', title: 'RFC', filter: 'text' },
    { accessor: 'correo', title: 'Correo', filter: 'text' },
    { accessor: 'telefono', title: 'Teléfono', filter: 'text' },
    {
      accessor: 'actions',
      title: 'Acciones',
      render: row => (
        <div className='flex gap-3 justify-center'>
          <Link
            to={`/empresas/modificar-empresa/${row.id}`}
            className='text-cyan-500 duration-500 hover:text-cyan-800 text-xl'
          >
            <MdEdit />
          </Link>
          <button className='text-green-500 duration-500 hover:text-green-800 text-xl'>
            <FaEye />
          </button>
        </div>
      )
    }
  ]

  return (
    <AuthWrapper>
      <Toolbar>
        <div className='flex gap-3'>
          <Button color='cyan' link to='/empresas/crear-empresa'>
            Agregar empresa
          </Button>
        </div>
      </Toolbar>
      <MantineDataTable columns={columns} data={data} KeyTable='empresas' />
    </AuthWrapper>
  )
}
