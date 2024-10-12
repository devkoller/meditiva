import React from 'react'
import { AuthWrapper, Toolbar, MantineDataTable, Button } from '@/components'
import { Link } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'

export const Usuarios = () => {
  const columns = [
    { accessor: 'id', title: 'ID', hidden: true },
    { accessor: 'username', title: 'Usuario', filter: 'text' },
    { accessor: 'nombre', title: 'Nombre', filter: 'text' },
    { accessor: 'correo', title: 'Correo', filter: 'text' },
    {
      accessor: 'actions',
      title: 'Acciones',
      render: row => (
        <div className='flex justify-center'>
          <Link
            to={`/usuarios/modificar-usuarios/${row.id}`}
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
          <Button color='cyan' link to='/usuarios/crear-usuario'>
            Agregar usuario
          </Button>
        </div>
      </Toolbar>
      <MantineDataTable columns={columns} KeyTable='usuarios' />
    </AuthWrapper>
  )
}
