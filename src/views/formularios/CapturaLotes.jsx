import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'
import { useFetch, usePost } from '@/hooks'
import { DatePickerInput } from '@mantine/dates'

import { AuthWrapper, Forms, FormInput, Button, Tabs } from '@/components'

export const CapturaLotes = () => {
  const [articulos, setArticulos] = useState([])
  const [barcode, setBarcode] = useState('')
  const [selectedDate, setSelectedDate] = useState()
  const { execute, loading } = usePost()
  const [item, setItem] = useState()
  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
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
    const body = {
      ...data,
      codigoBarrasId: item.id,
      caducidad: selectedDate
    }

    execute({
      url: '/api/catalogue/batch',
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

  const getArticles = async () => {
    execute({
      url: '/api/catalogue/barcodeArticle/' + barcode,
      method: 'get'
    }).then(res => {
      if (res.status === 200) {
        setValue('articuloId', res.data.articuloId)
        setItem(res.data)
      }
    })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (barcode) {
        getArticles()
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [barcode])

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
        <div className='flex gap-3'>
          <FormInput
            label='Código de Barras'
            name='codigoBarras'
            onChange={e => {
              setBarcode(e.target.value)
            }}
            required
          />
          <FormInput
            label='Articulo'
            type='select'
            options={articulos || []}
            name='articuloId'
            required
          />
        </div>

        <div className='flex gap-3'>
          <FormInput label='Lote' name='lote' required />
          <div className='w-full'>
            <span>
              Fecha de caducidad{' '}
              <sup className='text-gray-400 text-sm '>(Opcional)</sup>
            </span>
            <DatePickerInput
              placeholder='Selecciona una fecha'
              className='border border-gray-300 rounded-md px-3 bg-white w-full'
              value={selectedDate}
              onChange={val => {
                setSelectedDate(val)
              }}
            />
          </div>
        </div>

        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>
            Capturar
          </Button>
        </div>
      </Forms>
    </AuthWrapper>
  )
}
