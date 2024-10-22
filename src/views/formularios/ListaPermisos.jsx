import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { notifications } from '@mantine/notifications'

import { Forms, FormInput, Button, Title } from '@/components'
import { useFetch, usePost } from '@/hooks'

export const ListaPermisos = ({ idUser, usuarioData }) => {
  const [permisos, setPermisos] = useState([])
  const [userGrants, setUserGrants] = useState({
    grants: [],
    blocked: []
  })
  const { handleSubmit, register, control } = useForm({})
  const { execute, loading } = usePost()

  const onSubmit = () => {
    execute({
      url: '/user/update-grants',
      body: {
        id: idUser,
        grants: userGrants.grants,
        blocked: userGrants.blocked
      }
    }).then(res => {
      if (res.status === 200) {
        notifications.show({
          title: 'Correcto',
          message: 'Se han actualizado correctamente los permisos.'
        })
      } else {
      }
    })
  }

  const onError = errors => {
    notifications.show({
      title: 'Correcto',
      message: 'Se ha creado correctamente',
      color: 'red'
    })
  }

  const { response: permisosData } = useFetch({
    url: '/data/list-grants'
  })

  useEffect(() => {
    if (usuarioData) {
      const grants = JSON.parse(usuarioData.grants)

      setUserGrants({
        grants: grants.Statement[0].Action,
        blocked: grants.Statement[1].Action
      })
    }
  }, [usuarioData])

  useEffect(() => {
    if (permisosData) {
      setPermisos(permisosData.data)
    }
  }, [permisosData])

  const setGrants = (action, sid) => {
    if (userGrants.grants.includes(`${sid}.${action}`)) {
      let permisos = userGrants.grants.filter(
        item => item !== `${sid}.${action}`
      )
      permisos = permisos.sort((a, b) => a - b)
      setUserGrants({
        ...userGrants,
        grants: permisos
      })
    } else {
      let permisos = [...userGrants.grants, `${sid}.${action}`]
      permisos = permisos.sort((a, b) => a - b)
      setUserGrants({
        ...userGrants,
        grants: permisos
      })
    }
  }

  const setBlocked = (action, sid) => {
    if (userGrants.blocked.includes(`${sid}.${action}`)) {
      let permisos = userGrants.blocked.filter(
        item => item !== `${sid}.${action}`
      )
      permisos = permisos.sort((a, b) => a - b)
      setUserGrants({ ...userGrants, blocked: permisos })
    } else {
      let permisos = [...userGrants.blocked, `${sid}.${action}`]
      permisos = permisos.sort((a, b) => a - b)
      setUserGrants({
        ...userGrants,
        blocked: permisos
      })
    }
  }

  const printHeads = activeGrants => {
    return permisos.map((permiso, index) => {
      if (permiso.permisos.length === 0) {
        return null
      }
      return (
        <div key={index}>
          <Title>{permiso.nombre}</Title>
          {printGrants(permiso.permisos, permiso.grant, activeGrants)}
        </div>
      )
    })
  }

  const printGrants = (list, grant, activeGrants) => {
    return list.map((permiso, index) => {
      return (
        <div key={index}>
          <FormInput
            type='checkbox'
            name={`${grant}.${permiso.grant}`}
            checked={activeGrants.includes(`${grant}.${permiso.grant}`)}
            label={permiso.nombre}
            description={permiso.descrip}
            onChange={e => {
              if (permiso.tipo === 1) {
                setGrants(permiso.grant, grant)
              } else {
                setBlocked(permiso.grant, grant)
              }
            }}
            table
          />
        </div>
      )
    })
  }
  return (
    <div>
      <Title type='h1'>Permisos del usuario</Title>
      <Forms
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        control={control}
      >
        {printHeads([...userGrants.grants, ...userGrants.blocked])}

        <div className='mt-3 flex justify-end'>
          <Button type='submit' disabled={loading}>
            Actualizar Permisos
          </Button>
        </div>
      </Forms>
    </div>
  )
}
