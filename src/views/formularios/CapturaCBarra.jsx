import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useFetch, usePost } from '@/hooks'
import { useNavigate } from 'react-router-dom'

import { AuthWrapper, Forms, FormInput, Button, Tabs } from '@/components'

export const CapturaCBarra = () => {
  const [articulos, setArticulos] = useState([])
  const { execute, loading } = usePost()
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors }
  } = useForm({})

  const { response: articlesData } = useFetch({
    url: '/api/catalogue/article'
  })

  useEffect(() => {
    if (articlesData) {
      const arti = articlesData.data.map(art => {
        return {
          value: art.id,
          label: art.nombre
        }
      })
      setArticulos(arti)
    }
  }, [articlesData])

  const onSubmit = data => {
    execute({
      url: '/api/catalogue/barcode',
      body: data
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
          label='Articulo'
          type='select'
          options={articulos}
          name='articuloId'
          required
        />
        <FormInput label='Código de Barras' name='codigoBarras' required />

        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>
            Capturar
          </Button>
        </div>
      </Forms>
    </AuthWrapper>
  )
}
