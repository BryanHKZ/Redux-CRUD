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
  COMENZAR_EDITAR_PRODUCTO,
  EDITAR_PRODUCTO_ERROR,
  EDITAR_PRODUCTO_EXITO,
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

// Agregar producto

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      await clienteAxios.post("/productos", producto);
      dispatch(agregarProductoExito(producto));

      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));

      Swal.fire("Error", "Ha ocurrido un error", "error");
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (status) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: status,
});

// Descargar Productos

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const { data } = await clienteAxios.get("/productos");
      dispatch(descargarProductosExito(data));
    } catch (error) {
      console.log(error);
      dispatch(descargarProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: DESCARGA_PRODUCTOS,
  payload: true,
});

const descargarProductosExito = (datos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: datos,
});

const descargarProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

// Selecciona y elimina productos

export function eliminarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: ELIMINAR_PRODUCTO,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: ELIMINAR_PRODUCTO_EXITO,
});

const eliminarProductoError = () => ({
  type: ELIMINAR_PRODUCTO_ERROR,
  payload: true,
});

// Selecciona y edita productos

export function editarProductoAction(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = (producto) => ({
  type: EDITAR_PRODUCTO,
  payload: producto,
});

// Edita un registro en la API y State

export function editarProductoApi(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());

    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error);
      dispatch(editarProductoError());
    }
  };
}

const editarProducto = () => ({
  type: COMENZAR_EDITAR_PRODUCTO,
});

const editarProductoExito = (producto) => ({
  type: EDITAR_PRODUCTO_EXITO,
  payload: producto,
});

const editarProductoError = () => ({
  type: EDITAR_PRODUCTO_ERROR,
  payload: true,
});
