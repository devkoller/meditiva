import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useFetch, usePost } from '@/hooks'
import { AddTable } from './components/AddTable'

import { AuthWrapper, Forms, FormInput, Button, Tabs } from '@/components'

export const CapturaMovimientos = () => {
  const [articulosTable, setArticulosTable] = useState([])
  const [tipoMovSelect, setTipoMovSelect] = useState()
  const { execute, loading } = usePost()

  const [lists, setLists] = useState({
    tiposMov: [],
    almacenes: [],
    clientes: [],
    proveedores: []
  })

  const { response: tiposMov } = useFetch({
    url: '/api/catalogue/movement_types'
  })

  const { response: almacenes } = useFetch({
    url: '/api/catalogue/warehouse'
  })

  const { response: clientes } = useFetch({
    url: '/api/catalogue/client'
  })

  const { response: proveedores } = useFetch({
    url: '/api/catalogue/provider'
  })

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors }
  } = useForm({})

  const onSubmit = data => {
    const body = {
      ...data,
      detail: JSON.stringify(articulosTable)
    }

    execute({
      url: '/api/inventory/movement',
      body
    }).then(res => {
      if (res.status === 200) {
        notifications.show({
          title: 'Correcto',
          message: `Se ha capturado correctamente`
        })
        reset()
      }
    })
  }

  const onError = errors => {
    notifications.show({
      title: 'Error!',
      message: 'Complete los campos obligatorios',
      color: 'red'
    })
  }

  const tabs = [
    {
      label: 'Inventario',
      to: '/produccion'
    },
    {
      label: 'Movimientos',
      to: '/produccion/movimientos'
    },
    {
      label: 'Códigos barra',
      to: '/produccion/captura-codigos-barra'
    },
    {
      label: 'Captura lotes',
      to: '/produccion/captura-lotes'
    }
  ]

  useEffect(() => {
    if (tiposMov) {
      const mov = tiposMov.data.map(mov => {
        return {
          value: mov.id,
          label: mov.descripcion
        }
      })
      setLists(lists => ({ ...lists, tiposMov: mov }))
    }
  }, [tiposMov])

  useEffect(() => {
    if (almacenes) {
      const alm = almacenes.data.map(alm => {
        return {
          value: alm.id,
          label: alm.nombre
        }
      })
      setLists(lists => ({ ...lists, almacenes: alm }))
    }
  }, [almacenes])

  useEffect(() => {
    if (clientes) {
      const cli = clientes.data.map(cli => {
        return {
          value: cli.id,
          label: cli.nombre
        }
      })
      setLists(lists => ({ ...lists, clientes: cli }))
    }
  }, [clientes])

  useEffect(() => {
    if (proveedores) {
      const pro = proveedores.data.map(pro => {
        return {
          value: pro.id,
          label: pro.nombre
        }
      })
      setLists(lists => ({ ...lists, proveedores: pro }))
    }
  }, [proveedores])

  return (
    <AuthWrapper>
      <Tabs items={tabs} />
      <Forms
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        onError={onError}
        control={control}
      >
        <FormInput
          label='Tipo de movimiento'
          type='select'
          options={lists.tiposMov}
          name='tipo'
          onchange={setTipoMovSelect}
          required
        />
        <div className='flex gap-3'>
          <FormInput
            label={`Almacen ${tipoMovSelect === 3 ? 'origen' : ''}`}
            type='select'
            options={lists.almacenes}
            name='almacenId'
            required
          />
          {tipoMovSelect === 3 && (
            <FormInput
              label='Almacén destino'
              type='select'
              options={lists.almacenes}
              name='almacenDestinoId'
              required
            />
          )}
        </div>

        {tipoMovSelect === 1 && (
          <FormInput
            label='Proveedor'
            type='select'
            options={lists.proveedores}
            name='proveedorId'
            required
          />
        )}

        {tipoMovSelect === 2 && (
          <FormInput
            label='Cliente'
            type='select'
            options={lists.clientes}
            name='clienteId'
            required
          />
        )}

        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>
            Capturar
          </Button>
        </div>
      </Forms>

      <AddTable
        listArticles={articulosTable}
        SetListTable={setArticulosTable}
      />
    </AuthWrapper>
  )
}
