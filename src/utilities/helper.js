import Swal from 'sweetalert2';
export const sweetAlert = (text, icon) => {
  Swal.fire({
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
    width: '28em',
    customClass: {
      confirmButton: 'btn btn-primary rounded-pill px-3',
    },
    buttonsStyling: false,
  });
};

export const sweetAlertToast = (text, icon, time) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    text: text,
    icon: icon,
    timer: time,
    showConfirmButton: false,
  });
};

export const formatTime = (time) => {
  const date = new Date(time);
  // 格式化日期時間為字串
  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Asia/Taipei',
  });
  return formattedDate;
};
