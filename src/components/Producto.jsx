import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { eliminarProductoAction, editarProductoAction } from "../actions/productoActions";
import Swal from "sweetalert2";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();
  const history = useHistory();

  // Confirmar si desea eliminarlo
  const confirmarEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Estoy seguro",
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarProductoAction(id));
      }
    });
  };

  // función que redirige de forma programada
  const redireccionarEdicion = (producto) => {
    dispatch(editarProductoAction(producto));
    history.push("/productos/editar/" + producto.id);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(producto)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
