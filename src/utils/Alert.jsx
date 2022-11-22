import Swal from 'sweetalert2';

const swal = () => {
  return Swal.fire({
    title: 'Credenciales invalidas',
    text: 'Verifique las credenciales ingresadas por favor',
    confirmButtonText: 'Aceptar',
    width: '400px',
    timer: 5000,
    timerProgressBar: true,
  });
};

export default swal;
