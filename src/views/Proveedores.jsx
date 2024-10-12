import React from 'react'
import { AuthWrapper, Toolbar, MantineDataTable, Button } from '@/components'
import { Link } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'

//Dataset for the table
const data = [
  { id: 1, name: 'Proveedor 1', descrip: 'Descripcion 1' },
  { id: 2, name: 'Proveedor 2', descrip: 'Descripcion 2' },
  { id: 3, name: 'Proveedor 3', descrip: 'Descripcion 3' }
]

export const Proveedores = () => {
  const columns = [
    { accessor: 'id', title: 'ID', hidden: true },
    { accessor: 'name', title: 'Articulo', filter: 'text' },
    { accessor: 'descrip', title: 'Description', filter: 'text' },
    {
      accessor: 'actions',
      title: 'Acciones',
      render: row => (
        <div className='flex justify-center'>
          <Link
            to={`/proveedores/modificar-proveedor/${row.id}`}
            className='text-cyan-500 duration-500 hover:text-cyan-800 text-xl'
          >
            <MdEdit />
          </Link>
        </div>
      )
    }
  ]

  return (
    <AuthWrapper>
      <Toolbar>
        <div className='flex gap-3'>
          <Button color='cyan' link to='/proveedores/crear-proveedor'>
            Agregar proveedor
          </Button>
        </div>
      </Toolbar>
      <MantineDataTable columns={columns} data={data} KeyTable='proveedores' />
    </AuthWrapper>
  )
}
