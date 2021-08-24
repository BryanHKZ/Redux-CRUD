import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

// muestra una alerta

export function mostrarAlerta(alerta) {
  return (dispatch) => {
    dispatch(mostrarAlertaAction(alerta));
  };
}

const mostrarAlertaAction = (alerta) => ({
  type: MOSTRAR_ALERTA,
  payload: alerta,
});

export function ocultarAlerta() {
  return (dispatch) => {
    dispatch(ocultarAlertaAction());
  };
}

const ocultarAlertaAction = () => ({
  type: OCULTAR_ALERTA,
});
