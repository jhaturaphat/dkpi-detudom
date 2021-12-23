import { Injectable } from "@angular/core";
import Swal from 'sweetalert2'
declare const $:any;

@Injectable({
    providedIn: 'root'
})

export class AlertService {
    notify(message: string = "Null", type: string = 'success') {
        $.notify({
            // options
            title: 'แจ้งเตือนจากระบบ : ',
            message: message,
        }, {
                // settings
                element: 'body',
                position: null,
                type: type,
                allow_dismiss: true,
                newest_on_top: false,
                showProgressbar: false,
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 5000,
                timer: 1000,
                url_target: '_blank',
                mouse_over: null,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                onShow: null,
                onShown: null,
                onClose: null,
                onClosed: null,
                icon_type: 'class',
                template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<span data-notify="icon"></span> ' +
                    '<span data-notify="title">{1}</span> ' +
                    '<span data-notify="message">{2}</span>' +
                    '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                    '</div>' +
                    '<a href="{3}" target="{4}" data-notify="url"></a>' +
                    '</div>'
            });
    }

    someting_wrong(message: string = 'ข้อมูลบางอย่างไม่ถูกต้อง กรุณาลองอีกครั้ง', type:string = 'warning') {
        this.notify(message, type);
    }

     // แจ้งเตือนยืนยันการทำรายการ
    confirm(message: string = 'คุณต้องการจะทำรายการต่อไปหรือไม่ ?'):Promise<any> {
        return Swal.fire({
            title: 'คุณแน่ใจแล้วใช่ หรือ ไม่',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่'
          })
    }
}