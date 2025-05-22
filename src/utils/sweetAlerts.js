import Swal from "sweetalert2"

export const mostrarAlertaConfirmacion = async (
    titulo,
    mensaje
) => {
    const resultado = await Swal.fire({
        title: titulo,
        text: mensaje,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        customClass: {
            popup: 'sweet-alert',
            confirmButton: 'btn-confirmar',
            cancelButton: 'btn-cancelar'
        },
    })
  return resultado.isConfirmed;
}

export const mostrarAlerta = (
    titulo, mensaje, tipo
) => {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: tipo,
        customClass: {
            popup: 'sweet-alert',
            confirmButton: "btn-ok"
        }
    })
}