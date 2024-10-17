import {
  Dashboard,
  Landing,
  Login,
  Almacenes,
  Articulos,
  Clientes,
  Empresas,
  Inventario,
  Perfil,
  Proveedores,
  Usuarios,
  CrearArticulo,
  CrearAlmacen,
  CrearCliente,
  CrearEmpresa,
  CrearProveedor,
  CrearUsuario,
  Produccion,
  CapturaCBarra,
  CapturaInventarios,
  CapturaLotes,
  CapturaMovimientos
} from '@/views'

import { IoPieChartSharp, IoMedical } from 'react-icons/io5'
import { FaWarehouse, FaUsers } from 'react-icons/fa'
import { BsHospitalFill } from 'react-icons/bs'
import { MdFactory, MdInventory } from 'react-icons/md'
import { GiPelvisBone } from 'react-icons/gi'
import { AiFillProduct } from 'react-icons/ai'

export const completeRoutes = [
  {
    route: '/',
    title: 'Landing',
    component: Landing,
    menu: false,
    icon: false,
    auth: 'none',
    type: 'none'
  },
  {
    route: '/login',
    title: 'Login',
    component: Login,
    menu: false,
    icon: false,
    auth: 'Not Authenticated',
    type: 'none'
  },
  {
    route: '/main',
    title: 'Inicio',
    component: Dashboard,
    menu: true,
    icon: IoPieChartSharp,
    auth: 'Authenticated',
    type: 'Productivo'
  },
  {
    route: '/produccion',
    title: 'Producción',
    component: Produccion,
    menu: true,
    icon: AiFillProduct,
    auth: 'Authenticated',
    type: 'Productivo'
  },
  {
    route: '/produccion/captura-codigos-barra',
    title: 'Artículos',
    component: CapturaCBarra,
    menu: false,
    icon: IoMedical,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/produccion/captura-inventario',
    title: 'Artículos',
    component: CapturaCBarra,
    menu: false,
    icon: IoMedical,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/produccion/captura-lotes',
    title: 'Artículos',
    component: CapturaLotes,
    menu: false,
    icon: IoMedical,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/produccion/movimientos',
    title: 'Artículos',
    component: CapturaMovimientos,
    menu: false,
    icon: IoMedical,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/articulos',
    title: 'Artículos',
    component: Articulos,
    menu: true,
    icon: IoMedical,
    auth: 'Authenticated',
    type: 'Catálogos'
  },
  {
    route: '/articulos/crear-articulo',
    title: 'Artículos',
    component: CrearArticulo,
    menu: false,
    icon: IoMedical,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/articulos/modificar-articulo/:id',
    title: 'Artículos',
    component: CrearArticulo,
    menu: false,
    icon: IoMedical,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/almacenes',
    title: 'Almacenes',
    component: Almacenes,
    menu: true,
    icon: FaWarehouse,
    auth: 'Authenticated',
    type: 'Catálogos'
  },
  {
    route: '/almacenes/crear-almacen',
    title: 'Almacenes',
    component: CrearAlmacen,
    menu: true,
    icon: FaWarehouse,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/almacenes/modificar-almacen/:id',
    title: 'Almacenes',
    component: CrearAlmacen,
    menu: true,
    icon: FaWarehouse,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/proveedores',
    title: 'Proveedores',
    component: Proveedores,
    menu: true,
    icon: GiPelvisBone,
    auth: 'Authenticated',
    type: 'Catálogos'
  },
  {
    route: '/proveedores/crear-proveedor',
    title: 'Proveedores',
    component: CrearProveedor,
    menu: true,
    icon: GiPelvisBone,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/proveedores/modificar-proveedor/:id',
    title: 'Proveedores',
    component: CrearProveedor,
    menu: true,
    icon: GiPelvisBone,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/clientes',
    title: 'Clientes',
    component: Clientes,
    menu: true,
    icon: BsHospitalFill,
    auth: 'Authenticated',
    type: 'Catálogos'
  },
  {
    route: '/clientes/crear-cliente',
    title: 'Clientes',
    component: CrearCliente,
    menu: true,
    icon: BsHospitalFill,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/clientes/modificar-cliente/:id',
    title: 'Clientes',
    component: CrearCliente,
    menu: true,
    icon: BsHospitalFill,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/empresas',
    title: 'Empresas',
    component: Empresas,
    menu: true,
    icon: MdFactory,
    auth: 'Authenticated',
    type: 'Catálogos',
    grant: 'empr.viewMenu'
  },
  {
    route: '/empresas/crear-empresa',
    title: 'Empresas',
    component: CrearEmpresa,
    menu: true,
    icon: MdFactory,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/empresas/modificar-empresa/:id',
    title: 'Empresas',
    component: CrearEmpresa,
    menu: true,
    icon: MdFactory,
    auth: 'Authenticated',
    type: 'none'
  },

  {
    route: '/mi-perfil',
    title: 'Perfil',
    component: Perfil,
    menu: false,
    icon: false,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/usuarios',
    title: 'Usuarios',
    component: Usuarios,
    menu: true,
    icon: FaUsers,
    auth: 'Authenticated',
    type: 'Administración'
  },
  {
    route: '/usuarios/crear-usuario',
    title: 'Usuarios',
    component: CrearUsuario,
    menu: true,
    icon: FaUsers,
    auth: 'Authenticated',
    type: 'none'
  },
  {
    route: '/usuarios/modificar-usuario/:id',
    title: 'Usuarios',
    component: CrearUsuario,
    menu: true,
    icon: FaUsers,
    auth: 'Authenticated',
    type: 'none'
  }
]
