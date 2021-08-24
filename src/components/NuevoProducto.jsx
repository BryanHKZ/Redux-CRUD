import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Actions de Redux
import { crearNuevoProductoAction } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlerta } from "../actions/alertaActions";

const NuevoProducto = ({ history }) => {
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: 0,
  });

  const { nombre, precio } = producto;

  const dispatch = useDispatch();

  const cargando = useSelector((state) => state.productos.loading);
  const errorGlobal = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  const agregarProducto = (p) => dispatch(crearNuevoProductoAction(p));

  const submitProducto = (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || precio <= 0) {
      const alertaRespuesta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3 mt-3",
      };

      dispatch(mostrarAlerta(alertaRespuesta));
      return;
    }

    dispatch(ocultarAlerta());

    agregarProducto(producto);

    history.push("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) =>
                    guardarProducto({
                      ...producto,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del Producto"
                  name="precio"
                  value={precio}
                  onChange={(e) =>
                    guardarProducto({
                      ...producto,
                      [e.target.name]: Number(e.target.value),
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            {cargando ? <p>Cargando...</p> : null}
            {errorGlobal ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
