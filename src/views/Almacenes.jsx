import React from 'react'
import { AuthWrapper, Toolbar, MantineDataTable, Button } from '@/components'
import { Link } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'

//Dataset of warehouses to be displayed in the table
const data = [
  { id: 1, name: 'Almacen 1', descrip: 'Descripcion 1', tipo: 'Tipo 1' },
  { id: 2, name: 'Almacen 2', descrip: 'Descripcion 2', tipo: 'Tipo 2' },
  { id: 3, name: 'Almacen 3', descrip: 'Descripcion 3', tipo: 'Tipo 3' },
  { id: 4, name: 'Almacen 4', descrip: 'Descripcion 4', tipo: 'Tipo 4' },
  { id: 5, name: 'Almacen 5', descrip: 'Descripcion 5', tipo: 'Tipo 5' },
  { id: 6, name: 'Almacen 6', descrip: 'Descripcion 6', tipo: 'Tipo 6' },
  { id: 7, name: 'Almacen 7', descrip: 'Descripcion 7', tipo: 'Tipo 7' },
  { id: 8, name: 'Almacen 8', descrip: 'Descripcion 8', tipo: 'Tipo 8' },
  { id: 9, name: 'Almacen 9', descrip: 'Descripcion 9', tipo: 'Tipo 9' },
  { id: 10, name: 'Almacen 10', descrip: 'Descripcion 10', tipo: 'Tipo 10' }
]

export const Almacenes = () => {
  const columns = [
    { accessor: 'id', title: 'ID', hidden: true },
    { accessor: 'name', title: 'Articulo', filter: 'text' },
    { accessor: 'descrip', title: 'Description', filter: 'text' },
    { accessor: 'tipo', title: 'Tipo', filter: 'select' },
    {
      accessor: 'actions',
      title: 'Acciones',
      render: row => (
        <div className='flex justify-center'>
          <Link
            to={`/almacenes/modificar-almacen/${row.id}`}
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
      <Toolbar title='Almacenes'>
        <Button color='cyan' link to='/almacenes/crear-almacen'>
          Crear Almacén
        </Button>
      </Toolbar>
      <MantineDataTable columns={columns} data={data} KeyTable='almacenes' />
    </AuthWrapper>
  )
}
