import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  ELIMINAR_PRODUCTO,
  ELIMINAR_PRODUCTO_ERROR,
  ELIMINAR_PRODUCTO_EXITO,
  EDITAR_PRODUCTO,
  EDITAR_PRODUCTO_ERROR,
  EDITAR_PRODUCTO_EXITO,
} from "../types";

// Cada reducer tiene su propio state
const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoeliminar: null,
  productoeditar: null,
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
    case DESCARGA_PRODUCTOS:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: [...state.productos, action.payload],
      };
    case AGREGAR_PRODUCTO_ERROR:
    case DESCARGA_PRODUCTOS_ERROR:
    case ELIMINAR_PRODUCTO_ERROR:
    case EDITAR_PRODUCTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: action.payload,
      };
    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        productoeliminar: action.payload,
      };
    case ELIMINAR_PRODUCTO_EXITO:
      return {
        ...state,
        error: null,
        productos: state.productos.filter(
          (p) => p.id !== state.productoeliminar
        ),
        productoeliminar: null,
      };
    case EDITAR_PRODUCTO:
      return {
        ...state,
        productoeditar: action.payload,
      };
    case EDITAR_PRODUCTO_EXITO:
      return {
        ...state,
        productoeditar: null,
        productos: state.productos.map((producto) =>
          producto.id === action.payload.id
            ? (producto = action.payload)
            : producto
        ),
      };
    default:
      return state;
  }
}

export default reducer;