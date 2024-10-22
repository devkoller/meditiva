import { useState, useEffect } from 'react'
import { AuthWrapper, Toolbar, MantineDataTable, Button } from '@/components'
import { Link } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { useFetch } from '@/hooks'

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const columns = [
    { accessor: 'id', title: 'ID', hidden: true },
    { accessor: 'username', title: 'Usuario', filter: 'text' },
    { accessor: 'nombre', title: 'Nombre', filter: 'text' },
    {
      accessor: 'actions',
      title: 'Acciones',
      render: row => (
        <div className='flex justify-center'>
          <Link
            to={`/usuarios/modificar-usuario/${row.id}`}
            className='text-cyan-500 duration-500 hover:text-cyan-800 text-xl'
          >
            <MdEdit />
          </Link>
        </div>
      )
    }
  ]

  const { response: usersData } = useFetch({
    url: '/user/list-users'
  })

  useEffect(() => {
    if (usersData) {
      setUsuarios(() => {
        return usersData.data.map(user => {
          return {
            ...user,
            nombre: `${user.persona.nombre} ${user.persona.ape1} ${user.persona?.ape2}`
          }
        })
      })
    }
  }, [usersData])

  return (
    <AuthWrapper>
      <Toolbar>
        <div className='flex gap-3'>
          <Button color='cyan' link to='/usuarios/crear-usuario'>
            Agregar usuario
          </Button>
        </div>
      </Toolbar>
      <MantineDataTable
        columns={columns}
        data={usuarios || []}
        KeyTable='usuarios'
      />
    </AuthWrapper>
  )
}
