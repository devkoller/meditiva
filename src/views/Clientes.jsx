import { useState, useEffect } from 'react'
import { AuthWrapper, Toolbar, MantineDataTable, Button } from '@/components'
import { Link } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import { useFetch } from '@/hooks'

export const Clientes = () => {
  const [clientes, setClientes] = useState([])

  const { response: clientesData } = useFetch({
    url: '/api/catalogue/client'
  })
  const columns = [
    { accessor: 'id', header: 'ID', hidden: true },
    { accessor: 'nombre', header: 'Cliente', filter: 'text' },
    { accessor: 'rfc', header: 'RFC', filter: 'text' },
    { accessor: 'telefono', header: 'Teléfono', filter: 'text' },
    {
      accessor: 'actions',
      title: 'Acciones',
      render: row => (
        <div className='flex gap-3 justify-center'>
          <Link
            to={`/clientes/modificar-cliente/${row.id}`}
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

  useEffect(() => {
    if (clientesData) {
      setClientes(clientesData.data)
    }
  }, [clientesData])
  return (
    <AuthWrapper>
      <Toolbar>
        <div className='flex gap-3'>
          <Button color='cyan' link to='/clientes/crear-cliente'>
            Agregar cliente
          </Button>
        </div>
      </Toolbar>
      <MantineDataTable columns={columns} data={clientes} KeyTable='clientes' />
    </AuthWrapper>
  )
}
