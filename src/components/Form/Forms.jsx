import React from 'react'
export const Forms = ({
  control,
  errors,
  register,
  children,
  handleSubmit,
  onSubmit,
  onError = () => {},
  formClass
}) => {
  const recursion = child => {
    if (Array.isArray(child.props?.children)) {
      return child.props.children.map((childs, index) => {
        if (!childs) return null
        if (childs?.props && childs?.props.children) {
          return React.createElement(
            childs.type,
            {
              key: index,
              ...childs.props
            },
            recursion(childs)
          )
        }
        return childs.props && childs.props.name
          ? React.createElement(childs.type, {
              ...{
                ...childs.props,
                key: childs.props.name,
                register,
                errors,
                control
              }
            })
          : childs
      })
    } else {
      if (
        child.props &&
        child.props.children &&
        (child.props.children.props?.name ||
          typeof child.props.children === 'string' ||
          child.props.children.type === 'img')
      ) {
        child = child.props.children
      }
      return child.props && child.props.name
        ? React.createElement(child.type, {
            ...{
              ...child.props,
              key: child.props.name,
              register,
              errors,
              control
            }
          })
        : child
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={formClass}
      noValidate
    >
      {Array.isArray(children)
        ? children.map((child, index) => {
            if (!child) return null
            if (child?.props && child?.props.children) {
              return React.createElement(
                child.type,
                {
                  ...child.props,
                  key: index
                },
                recursion(child)
              )
            }
            return child.props && child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    key: child.props.name,
                    register,
                    errors,
                    control
                  }
                })
              : child
          })
        : React.createElement(
            children.type,
            {
              ...children.props
            },
            recursion(children)
          )}
    </form>
  )
}
