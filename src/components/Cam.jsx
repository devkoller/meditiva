import { useState } from 'react'
import { useZxing } from 'react-zxing'
import { usePost } from '../hooks'
import { Store } from 'react-notifications-component'
import { Forms, FormInput } from './'
import { useForm } from 'react-hook-form'
import { Button } from 'reactstrap'

export const Cam = ({ id, closeModal, handleUpdate }) => {
  const [result, setResult] = useState('')
  const [pause, setPause] = useState(false)
  const [tipo, setTipo] = useState(1)
  const { execute, loading } = usePost()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm({})

  const {
    ref,
    torch: { on, off, isOn, isAvailable }
  } = useZxing({
    onDecodeResult (result) {
      if (result.getText() === result) return
      setResult(result.getText())
      setPause(true)
    },
    paused: pause
  })

  const transferir = async () => {
    if (!result) return

    const form = {
      id: id,
      qr: result
    }

    await execute({ url: '/shop/transfer', body: form }).then(resp => {
      if (resp.status === 200) {
        Store.addNotification({
          title: 'Transferido',
          message: 'El boleto ha sido transferido',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 2000
          }
        })
        closeModal()
        handleUpdate()
      }
    })
  }

  const onSubmit = async data => {
    let form = {
      id: id,
      email: data.email
    }

    await execute({ url: '/shop/transfer', body: form }).then(resp => {
      if (resp.status === 200) {
        Store.addNotification({
          title: 'Transferido',
          message: 'El boleto ha sido transferido',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 2000
          }
        })
        closeModal()
        handleUpdate()
      }
    })
  }

  return (
    <div>
      <div>
        <select
          onChange={element => {
            setTipo(element.target.value)
          }}
        >
          <option value='1'>Cámara</option>
          <option value='2'>Correo electrónico</option>
        </select>
      </div>
      {!pause && parseInt(tipo) === 1 && (
        <div className='d-flex justify-content-center qr-reader'>
          <video ref={ref} className='cam' onError={e => {}} />
        </div>
      )}

      {parseInt(tipo) === 2 && (
        <Forms
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          control={control}
          // onError={onError}
          formClass={'authentication-form'}
        >
          <FormInput
            name='email'
            label='Correo electrónico'
            placeholder='juanito@ciam.com'
            containerClass='mb-3'
            required
          />

          <div className='mb-3 text-end d-grid mt-3'>
            <Button type='submit'>Enviar</Button>
          </div>
        </Forms>
      )}

      {pause && (
        <div className='d-flex flex-column align-items-center'>
          <h3>¿Estas seguro de transferir tu boleto?</h3>
          <p>
            La transferencia de tu boleto es irreversible, una vez transferido
            no podrás recuperarlo.
          </p>
          <div className='d-flex gap-3 my-3'>
            <button
              className='btn btn-primary'
              onClick={transferir}
              disabled={loading}
            >
              Transferir
            </button>
            <button className='btn btn-danger' onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
