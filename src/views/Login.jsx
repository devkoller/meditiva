import { Forms, FormInput } from '../components'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../hooks/useAuthStore'
import { AuthLayer, Menu, Button } from '@/components'
import { Link } from 'react-router-dom'

export const Login = () => {
  const { startLogin } = useAuthStore()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm({})

  const onSubmit = data => {
    startLogin(data)
  }

  const onError = errors => console.log(errors)
  return (
    <>
      <Menu />
      <AuthLayer>
        <div className=' bg-slate-200 p-5 h-full'>
          <div className='mb-10'>
            <h1 className='font-bold text-4xl'>Meditiva</h1>
          </div>
          <Forms
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onError={onError}
            register={register}
            control={control}
            defaultValues={{}}
            formClass={'authentication-form'}
          >
            <FormInput label='Usuario' type='email' name='username' required />

            <FormInput
              label='Contraseña'
              type='password'
              name='password'
              required
            />

            <FormInput
              label='Mantener sesión iniciada'
              type='checkbox'
              name='keepSessionOpen'
            />

            <div className='flex justify-end mt-5'>
              <Link to='/main' className='text-blue-500'>
                Iniciar sesión
              </Link>
              {/* <Button type='submit'>Iniciar sesión</Button> */}
            </div>
          </Forms>
        </div>
      </AuthLayer>
    </>
  )
}
