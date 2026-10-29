/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ************************************ FUNCTIONS: ************************************

//Mensajes JS:
function showSuccess(mensaje) {
    Messenger({
        extraClasses: 'messenger-fixed messenger-on-right messenger-on-top',
        theme: 'flat'
    }).post(mensaje);
}

//File input:
$(function () {
    // Create the close button
    var closebtn = $('<button/>', {
        type: "button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;'
    });
    closebtn.attr("class", "close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger: 'manual',
        html: true,
        title: "<strong>" + txtPreview + "</strong>" + $(closebtn)[0].outerHTML,
        content: "There's no image",
        placement: 'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function () {
        $('.image-preview').attr("data-content", "").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text(txtBuscar);
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function () {
        var img = $('<img/>', {
            id: 'dynamic',
            width: 150
            //height:100
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text(txtCambiar);
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
        };
        reader.readAsDataURL(file);
    });
});

//Convertir string en link:
function convert(cadena) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var text1 = cadena.replace(exp, "<a href='$1'>$1</a>");
    var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    return text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
}

//Comprobar si existe valor en array:
function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}

//Fecha de hoy:
function getHoy() {
    return new Date().toJSON().slice(0, 10);
}

//Suma horas:
function sumaHoras(a, b) {
    var pa = a.split(':');
    var pb = b.split(':');
    var horas = parseInt(pa[0]) + parseInt(pb[0]);
    var minutos = parseInt(pa[1]) + parseInt(pb[1]);

    if (minutos >= 60) {
        minutos = minutos - 60;
        horas++;
    }
    if (horas < 10) horas = '0' + horas;
    if (minutos < 10) minutos = '0' + minutos;

    return horas + ':' + minutos;
}

//Color rgba dinámico:
function dinamicRGBA() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return this.rgba = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

//Obtener stock de producto:
function getProductStock(product_id, store_id, batch) {
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: "/admin/stocks/show",
        type: "POST",
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'),
            product_id: product_id,
            store_id: store_id,
            batch: batch
        },
        cache: false,
        datatype: "JSON",
        success: function success(response) {
            if (response) {
                console.log(response);
                console.log(Object.keys(response.stock).length);
                console.log(response.stock.result);

                //Vacíamos el stock disponible:
                $('.stockDisponible').html('');

                //Para stock = 0 se anulan los movimientos distintos de suma:
                //if( (Object.keys(response).length === 0 && response.constructor === Object) || response.qty <= 0){
                //21.3.19: se da el caso que en ocasiones devuelve un objeto y en otras un array. Comento por el momento el condicional para el objeto y activo el de array:
                //if( || response.qty <= 0){
                $('#stockmov option').each(function () {
                    //Habilitamos todas las opciones. Según el caso se inhabilitan posteriormente:
                    $(this).prop('disabled', false);

                    var sign = $(this).data('sign');
                    var acronym = $(this).data('acronym');

                    /*if(Object.keys(response.stock).length === 0 && response.stock.constructor === Object && sign != '' && sign != 's'){
                        $(this).prop('disabled', true);
                    } */
                    if ((response.stock.length == 0 || response.stock.result == 0) && sign != '' && sign != 's') {
                        $(this).prop('disabled', true);
                    }
                    //El movimiento de Entrada Inicial (EI) es sólo válido cuando no hay movimientos anteriores del producto:
                    if (Object.keys(response.stock).length > 0 && acronym == 'ei') {
                        $(this).prop('disabled', true);
                    }
                });

                //Si no hay gestión de lotes, obtenemos el stock disponible:
                if (batch == 0) {
                    var stock = response.stock.result ? response.stock.result : '0';
                    $('.stockDisponible').text(stock);
                    $('#disponible').val(stock);

                    //u obtenemos los lotes del producto:
                } else {
                    if (response.batches.length > 0) {
                        $('#batch').html('');
                        $('#batch').append('<option value="">Selecciona lote</option>');
                        for (j = 0; j < response.batches.length; j++) {
                            var caduca = response.batches[j].expiry_date != null ? '(caduca: ' + response.batches[j].expiry_date + ')' : '';
                            $('#batch').append('<option value="' + response.batches[j].id + '">' + response.batches[j].name + ' ' + caduca + '</option>');
                        }
                    }
                }
            }
        }
    });
}

//Eliminar elemento de un array:
function removeElement(array, element) {
    var index = array.indexOf(element);
    console.log(index);
    if (index >= -1) {
        // modifies array in place
        array.splice(index, 1);
    }
}

//Detectar abandono de la página:
/*window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";
    //var confirmationMessage = "¿var a cerra la pantalla, coleguita?";
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage;                            //Webkit, Safari, Chrome
});*/

// ************************************ DOCUMENT READY: ************************************

// Día actual
var diaactual = getHoy();

$(document).ready(function () {
    /* ***************** INDICE DE MÉTODOS: ***************** 
    1. Tooltips.
    2. Editor texto.
    3. Mostrar ocultar elementos.
    4. Detectando dispositivo móvil.
    5. Popover (Validación de vacaciones)
    */

    /*$('input[type="submit"]').on('click', function(){
          $('#spinner_container').fadeIn();
    });*/

    //Hora del control horario:
    horaActual();

    //1. Tooltips:
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    //2. Editor texto:
    if ($('.editor').length > 0) {
        $('.editor').trumbowyg({
            lang: 'es',
            autogrow: true,
            svgPath: '/plugins/trumbowyg/ui/icons.svg'
        });
    }

    //3. Mostrar ocultar elementos:
    $('.mostrar').on('click', function () {
        var siguiente = $(this).next('.siguiente');
        if (siguiente.hasClass('oculto')) {
            siguiente.removeClass('oculto');
        } else {
            siguiente.addClass('oculto');
        }
    });

    //Detectar abandono de la página:
    /*window.addEventListener("beforeunload", function (e){
        var confirmationMessage = "\o/";
        //var confirmationMessage = "¿vas a cerra la pantalla, coleguita?";
          (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
    });*/

    //4. Detectando dispositivo móvil:
    /*if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
        //Ocultamos control horario básico para dispositivos móviles:
        $('.basicHourlyControl').css('visibility', 'visible');
    }*/

    //5. Popover (Validación de vacaciones)
    // popovers initialization - on click
    $('.btnOpenValidate[data-toggle="popover-click"]').popover({
        html: true,
        trigger: 'click',
        placement: 'top',
        content: function content() {
            return '<button class="btn btn-danger btnDayValidate btnNovalid mr-2"><i class="fas fa-times"></i></button><button class="btn btn-success btnDayValidate btnValid"><i class="fas fa-check"></i></button>';
        }
    });

    /*$('.cambiarHorario[data-toggle="popover-click"]').popover({
        html: true,
        trigger: 'click',
        placement: 'top',
        content: function () { 
            return '<input class="form-control input-inline text-right" type="text" placeholder="horas" style="width:80px;">:<input class="form-control input-inline text-right" type="text" placeholder="minutos" style="width:80px;"><button class="btn btn-primary input-inline"><i class="fa fa-angle-right"></i></button>'; 
        }
    }); */
});

// ************************************ WINDOW LOAD: ************************************
$(window).load(function () {
    /* ***************** INDICE DE MÉTODOS: *****************
       1. Obtener provincias por país.
       2. Obtener poblaciones por provincia.
       3. Single datepicker.
           3.1. DateTimePicker.
       4. Confirmación de acciones.
           4.1. Confirmación de eliminación por formulario.
       5. Abrir modals al cargar la página.
       6. Modal edición idioma.
       7. Activar / desactivar item.
           7.1. Modificar estado de item.
       8. Modal notificación.
           8.1. Modal ver notificación.
           8.2. Mostrar formulario respuesta notificación.
           8.3. Enviar notificación.
       9. Seleccionar / deseleccionar permisos de módulo.
       10. Crear slug.
       
       12. Modal traducciones.
           12.1. Guardar traducciones de strings.
       13. Modal edición module.
       14. 
       15. Input con tags.
       16. Copiar a portapapeles.
       17. Obtener departamentos por sede.
           17.1. Obtener sedes por empresa.
       18. Convertir strings en links.
       19. Modal añadir cliente o proveedor.
       20. Borrar contenido de input.
       21. Modal añadir tarea.
       22. Modal edición categoría.
       23. Modal nueva subcategoría.
       24. Obtener subcategorías por categoría.
       25. Destacar imagen.
       26. Imagen thumbnail.
       27. Modal editar línea de proyecto.
       28. Guarda preferencia.
       29. Modal editar movimiento de stock.
       30. Modal editar almacén.
           30.1. Desvincular propietario de almacén.
       31. Modal edición concepto de trabajo.
       32. Guardar tiempo de trabajo.
           32.1. Desplazamiento con teclado por tabla.
       33. Bloquear celdas para scroll horizontal y vertical.
       34. Cambiar año resumen working time.
       35. Modal edición marca.
       36. Selector de subopciones.
           36.1. Guardar categoría de item.
           36.2. Eliminar categoría de item.
       37. Modal editar respuesta quiz.
       38. Modal editar opción de parámetro.
       39. Select conmutados.
       40. Selector movimientos de stock.
       41. Selector stock de producto.
           41.1. Activar formulario movimiento de stock.
           41.2. Stock por lote.
           41.3. Deseleccionamos lote del selector si se introduce nuevo lote.
           41.4. Mostrar almacén de destino para traspaso entre almacenes.
       42. Modal edición evento de calendario.
       43. Selecthor.
           43.1 Eliminar usuario seleccionado.
       44. Editar lote.
       45. Modal pedir producto.
       46. Modal editar setting option.
       47. Crear referencia por patrón.
       48. Añadir segmento a formulario de patrón de presupuestos.
       49. Modal editar bloque items de formulario de presupuestos.
       50. Modal editar item de formulario de presupuestos.
       51. Calcular importe item de formulario de presupuestos.
           51.1. Pasar subtotal por bloque de presupuesto.
       52. Añadir línea libre a presupuesto.
       53. Desplegar selector modificaciones de presupuesto.
       54. Editar permiso.
       55. Marcar icono seleccionado.
       56. Editar concepto horario.
       57. Editar regisro horario.
       58. Establecer jornadas calendario laboral.
       59. Marcar revisión para horario laboral.
       60. Editar contrato empleado.
       61. Modal cancelar contrato.
       62. Carrito compra: añadir o quitar producto desde tienda.
       63. Carrito compra: añadir o quitar producto desde carrito.
       64. Detalle de equipamiento.
       65. Filtrar items de presupuesto con valor económico.
       66. Tipo de jornadas.
       67. Modal configuración tipo de jornada.
       68. Modificar horario por usuario y día.
           68.1. Guardar modificación en horario.
           68.2. Cerrar popover cambio de horario.
       69. Popover validación de días de vacaciones.
       70. Validar día de vacaciones.
       71. Filtrar tipo de día.
       */

    $('.noDefaultValue').val('');

    //1. Obtener provincias por país:
    $('#pais_id').on('change', function (event) {
        //Limpiamos posibles valores de provincia y población:
        $('#provincia_id').empty().val('');
        $('#poblacion_id').html('');
        $('#pais_id option:selected').each(function () {
            var id = event.target.value;

            if (id == null || id == 0) {
                $('#provincia_id').attr('disabled', 'disabled');
            } else {
                $('#provincia_id').removeAttr('disabled');
                $.get("/provincias_pais/" + id + "", function (response, state) {
                    $("#provincia_id").append('<option value="">Selecciona provincia</option>');
                    for (i = 0; i < response.length; i++) {
                        $("#provincia_id").append('<option value="' + response[i].id + '">' + response[i].provincia + '</option>');
                    }
                });
            }
        });
    });

    //2. Obtener poblaciones por provincia:
    $('#provincia_id').on('change', function (event) {
        //Limpiamos posibles valores de población:
        $('#poblacion_id').empty().val('');
        $('#provincia_id option:selected').each(function () {
            var id = event.target.value;

            if (id == null || id == 0) {
                $('#poblacion_id').attr('disabled', 'disabled');
            } else {
                $('#poblacion_id').removeAttr('disabled');
                $.get("/poblaciones-provincia/" + id + "", function (response, state) {
                    $("#poblacion_id").append('<option value="">Selecciona población</option>');
                    for (i = 0; i < response.length; i++) {
                        $("#poblacion_id").append('<option value="' + response[i].id + '">' + response[i].poblacion + '</option>');
                    }
                });
            }
        });
    });

    //3. Single datepicker:
    if ($('.datepicker').length > 0) {

        $('.datepicker').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            locale: localeDRP,
            changeMonth: true,
            changeYear: true
        });
    }

    //3.1. DateTimePicker:
    if ($('.dateTimePicker').length > 0) {

        $('.dateTimePicker').daterangepicker({
            autoApply: true,
            singleDatePicker: true,
            timePicker: true,
            timePicker24Hour: true,
            timePickerIncrement: 15,
            showDropdowns: true,
            locale: localeDTP
        });
    }

    //3.2. No future Datepicker:
    if ($('.dateNoFuturepicker').length > 0) {

        $('.dateNoFuturepicker').daterangepicker({
            maxDate: moment().subtract(1, 'days'), //Bloquea fecha posteriores a la determinada, en este caso el día anterior a la fecha actual.
            singleDatePicker: true,
            showDropdowns: true,
            locale: localeDRP,
            changeMonth: true,
            changeYear: true
        });
    }

    //Quitamos el valor por defecto para las fechas opcionales:
    $('.dateTimePicker, .datepicker, .dateNoFuturepicker').each(function (index) {
        var fecha = $(this).data('fecha');
        if (fecha == '') {
            $(this).val('');
        }
    });

    //4. Confirmación de acciones:
    $(document).on('click', '.btn-confirm', function (e) {
        e.preventDefault();
        var linkURL = $(this).attr("href");
        var msg = $(this).data('msg');

        swal({
            title: msg,
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(function (willDelete) {
            if (willDelete) {
                window.location.href = linkURL;
            }
        });
    });

    //4.1. Confirmación de eliminación por formulario:
    $(document).on('click', '.frm-confirm', function (e) {
        e.preventDefault();
        var msg = $(this).data('msg');
        var form = $(this).closest('form');

        swal({
            title: msg,
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(function (willDelete) {
            if (willDelete) {
                form.submit();
            }
        });
    });

    //5. Abrir modals al cargar la página:
    //Abrir modal save:
    if (typeof msg_errores_save != 'undefined' && msg_errores_save) {
        $('.invalid-feedback').css('display', 'block').show();
        $('.modal.opened-modal-save').modal({
            show: true
        });
    }
    if (typeof msg_errores_save1 != 'undefined' && msg_errores_save1) {
        $('.invalid-feedback').css('display', 'block').show();
        $('.modal.opened-modal-save1').modal({
            show: true
        });
    }
    //Abrir modal editar:
    if (typeof msg_errores_edit != 'undefined' && msg_errores_edit) {
        $('.invalid-feedback').css('display', 'block').show();
        $('.modal.opened-modal-edit').modal({
            show: true
        });
    }
    //Abrir modal update pattern:
    if (typeof msg_errores_pattern != 'undefined' && msg_errores_pattern) {
        $('.invalid-feedback').css('display', 'block').show();
        $('.modal.opened-modal-pattern').modal({
            show: true
        });
    }
    //Abrir modal add group:
    if (typeof msg_errores_add_group != 'undefined' && msg_errores_add_group) {
        $('.invalid-feedback').css('display', 'block').show();
        $('.modal.opened-add-group').modal({
            show: true
        });
    }

    //6. Modal edición idioma:
    $('.btn-edit-idioma').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('idiomaid');
        var idioma = $(this).data('idioma');
        var code = $(this).data('code');
        var dateformat = $(this).data('dateformat');

        $('#xidiomaId').val(id);
        $('#xidioma').val(idioma);
        $('#xcode').val(code);
        $('#xdate_format option[value="' + dateformat + '"]').prop("selected", true);
    });

    //7. Activar / desactivar item:
    $(document).on('click', '.chk', function () {
        var state = '';
        //Atención!!: detecta el estado previo a la acción, de modo que :checked es si queda deseleccionado:
        if ($(this).siblings('input').is(':checked')) {
            state = 0;
        } else {
            state = 1;
        }
        var id = $(this).data('id');
        var ctrl = $(this).data('ctrl');
        $.get(ctrl + "/" + id + "/" + state + "", function (response, state) {
            showSuccess(response);
        });
    });

    //7.1. Modificar estado de item:
    $(document).on('change', '.cbo-state', function () {
        var state = $(this).val();
        var id = $(this).data('id');
        var ctrl = $(this).data('ctrl');
        $.get(ctrl + "/" + id + "/" + state + "", function (response, state) {
            showSuccess(response);
        });
    });

    //8. Modal notificación:
    $(document).on('click', '.btn-notif', function () {
        var id = $(this).data('id');
        var user = $(this).data('user');

        $('#user_to').val(id);
        $('.userTo').text(user);
    });

    //8.1. Modal ver notificación:
    $(document).on('click', '.btn-see-notif', function () {
        var id = $(this).data('id');

        $.get("/admin/notification_show/" + id, function (response, state) {
            if (response) {
                console.log(response);
                $('#notifTitle').text(response.title);
                $('#notifDe b').text(response.Emisor);
                $('#notifPara b').text(response.Receptor);
                $('#notifFecha b').text(response.created_at);
                $('#notifContenido i').html(response.notification);
                $('#userTo').val(response.user_from);
                $('#replyTitle').val('Resp.: "' + response.title + '"');
                $('#recid').val(response.recid);
                if (response.docs != '') {
                    var htmlImg = "";
                    var htmlDocs = "<br>";
                    for (i = 0; i < response.docs.length; i++) {
                        var filename = response.docs[i].doc;
                        var ext = filename.split('.').pop();
                        console.log(ext);

                        //if image:
                        $arrImg = new Array('jpg', 'jpeg', 'png', 'gif', 'svg');
                        if (inArray(ext, $arrImg)) {
                            htmlImg += '<div class="col-sm-6">';
                            htmlImg += '<img class="img-fluid" src="/img/notifications/' + filename + '">';
                            htmlImg += '</div>';
                        } else {
                            $arrIcons = {
                                'doc': 'file',
                                'xls': 'file',
                                'xlsx': 'file',
                                'pdf': 'file',
                                'txt': 'file'
                            };
                            htmlDocs += '<div class="col-sm-4 text-center">';
                            htmlDocs += '<a target="_blank" class="iconNotif" href="/img/notifications/' + filename + '"><i class="fa fa-' + $arrIcons[ext] + '"></i></a><br>';
                            htmlDocs += filename;
                            htmlDocs += '</div>';
                        }
                    }
                    var html = htmlImg + htmlDocs;
                    $('#notificationDocs').html(html);
                }
            }
        });
    });

    //8.2. Mostrar formulario respuesta notificación:
    var replyNotif = true;
    $(document).on('click', '.btn-reply-notif', function () {
        if (replyNotif) {
            $('.reply-notification').slideDown();
            replyNotif = false;
        } else {
            $('.reply-notification').slideUp();
            replyNotif = true;
        }
    });

    //8.3. Enviar notificación:
    $('#frm-new-notification').on('submit', function (e) {
        var _$$ajax;

        e.preventDefault();
        //Utilizando FormData para poder subir archivos:
        var data = new FormData(document.getElementById("frm-new-notification"));
        console.log(data);
        $('#modal-see-notification').modal('hide');
        $('#modal-new-notification').modal('toggle');

        $.ajax((_$$ajax = {
            url: '/admin/notifications/store',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'JSON'
        }, _defineProperty(_$$ajax, 'cache', false), _defineProperty(_$$ajax, 'contentType', false), _defineProperty(_$$ajax, 'processData', false), _defineProperty(_$$ajax, 'success', function success(response) {
            showSuccess(response);
        }), _$$ajax));
    });

    //9. Seleccionar / deseleccionar permisos de módulo:
    $('.all-permissions').on('change', function () {
        var modulo = $(this).data('module');

        if ($(this).is(':checked')) {
            $('.module-' + modulo).prop('checked', true);
        } else {
            $('.module-' + modulo).prop('checked', false);
        }
    });
    //Deseleccionar si se marca all-access o no-access:
    $('.rdb-access').on('change', function () {
        $('.chk-module, .all-permissions').prop('checked', false);
    });

    //10. Crear slug:
    $('.name-slug').on('change', function () {
        var texto = $(this).val();
        $.get("/admin/roles/get-slug/" + texto + "", function (response, state) {
            $('.get-slug').val(response);
        });
    });

    //12. Modal traducciones:
    $(document).on('click', '.btn-translations', function () {
        var id = $(this).data('id');
        var schema = $(this).data('schema');
        $('.input-translation').val('');

        $('#objId').val(id);
        $('#schema').val(schema);

        $.get("/string_translation/" + id + "/" + schema, function (response, state) {
            if (response) {
                for (var i in response) {
                    $('#lang-' + i).val(response[i]);
                }
            }
        });
    });

    //12.1. Guardar traducciones de strings:
    $(document).on('submit', '#frm-translations', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $('#modal-translations').modal('toggle');

        $.ajax({
            url: "/languages/store_string",
            type: "POST",
            data: data,
            cache: false,
            datatype: "JSON",
            success: function success(response) {
                showSuccess(response);
            }
        });
    });

    //13. Modal edición module:
    $('.btn-module').on('click', function () {
        var id = $(this).data('id');
        var modulo = $(this).data('modulo');

        $('#moduleId').val(id);
        $('#moduleName').val(modulo);
    });

    //14. Acción sobre vista previa de imagen seleccionada:
    $(document).on('click', '#close-preview', function () {
        $('.image-preview').popover('hide');
        // Hover before close the preview
        /*$('.image-preview').hover(
            function () {
               $('.image-preview').popover('show');
            }, 
             function () {
               $('.image-preview').popover('hide');
            }
        ); */
    });

    //15. Input con tags:
    if ($('.input-tags').length > 0) {
        $('.input-tags').selectize({
            delimiter: ';',
            persist: false,
            createOnBlur: true,
            create: true
        });
    }

    //16. Copiar a portapapeles:
    $('.copia').on('click', function () {
        var elem = $(this);
        var text1 = $(this).text();
        text = text1.trim();
        var $temp = $("<input>");
        //lo agregamos a nuestro body
        $("body").append($temp);
        //agregamos en el atributo value del input el contenido html encontrado
        //en el td que se dio click
        //y seleccionamos el input temporal
        $temp.val(text).select();
        //ejecutamos la funcion de copiado
        document.execCommand("copy");
        //eliminamos el input temporal
        $temp.remove();
        elem.append('<span class="warning-copy">' + txtTextoCopiado + '</span>');
        $('.warning-copy').delay(1000).fadeOut();
    });

    //17. Obtener departamentos por sede:
    $(document).on('change', '#sede_id, #sedeId', function (event) {
        //Limpiamos posibles valores anteriores:
        $('#department_id').empty().val('');
        $('#sede_id option:selected, #sedeId option:selected').each(function () {
            var id = event.target.value;

            if (id == null || id == 0) {
                $('#department_id').attr('disabled', 'disabled');
            } else {
                $.get("/admin/departamentos_sede/" + id + "", function (response, state) {
                    $('#department_id, #departmentId').html('');
                    $('#department_id').removeAttr('disabled');
                    if (response.length > 1) {
                        $("#department_id, #departmentId").append('<option value="">Selecciona departamento</option>');
                    }

                    for (i = 0; i < response.length; i++) {
                        var selected = response.length == 1 ? 'selected' : '';
                        $("#department_id, #departmentId").append('<option value="' + response[i].id + '" ' + selected + '>' + response[i].name + '</option>');
                    }
                });
            }
            $('.departmentView, .departmentViewInventory').slideDown();
        });
    });

    //17.1. Obtener sedes por empresa:
    $(document).on('change', '#company_id, #companyId', function (event) {
        $('#sede_id, #sedeId').empty().val('');
        $('#department_id').empty().val('').attr('disabled', 'disabled');
        $('#company_id option:selected').each(function () {
            var id = event.target.value;

            if (id == null || id == 0) {
                $('#sede_id').attr('disabled', 'disabled');
            } else {
                $.get("/admin/sedes_empresa/" + id + "", function (response, state) {
                    var _this = this;

                    $('#sede_id, #sedeId').html('');
                    //console.log(response);

                    //Si no hay sedes activas se bloquea la acción:
                    if (response.length == 0) {
                        //alert('sin sedes activas');
                        var msg = 'No hay sedes activas en esta empresa';
                        swal({
                            type: 'error',
                            title: msg,
                            text: "",
                            icon: "warning"
                        }).then(function (willDelete) {
                            if (willDelete) {
                                $(_this).focus().val('');
                            }
                        });
                        return false;
                    }

                    if (response.length == 1) {
                        $('#sede_id, #sedeId').attr('disabled', 'disabled');
                        //Si sólo existe 1 sede obtenemos sus departamentos:
                        $.get("/admin/departamentos_sede/" + response[0].id + "", function (response1, state1) {
                            $('#department_id').removeAttr('disabled');
                            if (response1.length > 1) {
                                $("#department_id").append('<option value="">Selecciona departamento</option>');
                            }

                            for (j = 0; j < response1.length; j++) {
                                var selected = response.length == 1 ? 'selected' : '';
                                $("#department_id").append('<option value="' + response1[j].id + '" ' + selected + '>' + response1[j].name + '</option>');
                            }
                        });
                    } else {
                        $("#sede_id, #sedeId").append('<option value="">Selecciona sede</option>');
                    }
                    $('#sede_id, #sedeId').removeAttr('disabled');
                    $('.sedeView, .sedeViewInventory').slideDown();

                    for (i = 0; i < response.length; i++) {
                        $("#sede_id, #sedeId").append('<option value="' + response[i].id + '">' + response[i].name + '</option>');
                    }
                });
            }
        });
    });

    //18. Convertir strings en links:
    $('.convertLink').on('change', function () {
        var text = $(this).val();
        var new_text = convert(text);
        $(this).val(new_text);
    });

    //19. Modal añadir cliente o proveedor:
    $('.btn-addCP').on('click', function () {
        var action = $(this).data('action');
        if (action == 'customer') {
            $('#addCustomer, .markP').show();
            $('#addProvider, .markC').hide();
        } else {
            $('#addProvider, .markC').show();
            $('#addCustomer, .markP').hide();
        }
        $('#actionCP').val(action);
    });

    //19.1. Añadir cliente o proveedor:
    $('#frm-add-customer-provider').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $('#modal-add-customer-provider').modal('toggle');
        console.log(data);

        $.ajax({
            url: "/admin/companies/add_cp",
            type: "POST",
            data: data,
            cache: false,
            datatype: "JSON",
            success: function success(response) {
                showSuccess(response);
            }
        });
    });

    //20. Borrar contenido de input:
    $('.deleteValue').on('click', function () {
        $(this).closest('div').find('.form-control').val('');
        $('.chk-myself').prop('checked', false);
    });

    //21. Modal añadir tarea:
    $('#frm-add-task').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $('#modal-new-task').modal('toggle');
    });

    //22. Modal edición categoría:
    $('.btn-category').on('click', function () {
        var id = $(this).data('id');
        var category = $(this).data('category');

        $('#categoryId').val(id);
        $('#categoryName').val(category);
    });

    //23. Modal nueva subcategoría:
    $('.btn-subcategory').on('click', function () {
        var id = $(this).data('id');

        $('#subcategory').val(id);
    });

    //24. Obtener subcategorías por categoría:
    $('#category_id').on('change', function (event) {
        $('#subcategory_id').empty().val('');
        $('#category_id option:selected').each(function () {
            var id = event.target.value;

            if (id != null && id > 0) {
                $.get("/admin/subcategories/" + id, function (response, state) {
                    if (response.length > 0) {
                        $('#subcategory_label, #subcategory_id').removeClass('oculto');
                        $("#subcategory_id").append('<option value="">Selecciona subcategoría</option>');
                    } else {
                        $('#subcategory_label, #subcategory_id').addClass('oculto');
                    }

                    for (i = 0; i < response.length; i++) {
                        var selected = response.length == 1 ? 'selected' : '';
                        $("#subcategory_id").append('<option value="' + response[i].id + '" ' + selected + '>' + response[i].name + '</option>');
                    }
                });
            }
        });
    });

    //25. Destacar imagen:
    $('.btn-destacar').on('click', function (e) {
        e.preventDefault();
        var este = $(this);
        var img = $(this).data('img');
        var content = $(this).data('content');
        var modulo = $(this).data('modulo');

        if (img && content) {
            $.get("/admin/" + modulo + "/set-featured/" + content + "/" + img, function (response, state) {
                console.log(response);
                $('.btn-destacar').removeClass('destacado');
                este.addClass('destacado');
            });
        }
    });

    //26. Imagen thumbnail:
    $('.btn-thumb').on('click', function (e) {
        e.preventDefault();
        var este = $(this);
        var img = $(this).data('img');
        var content = $(this).data('content');

        if (img && content) {
            $.get("/admin/contents-image/set-thumb/" + content + "/" + img, function (response, state) {
                $('.btn-thumb').removeClass('destacado');
                este.addClass('destacado');
            });
        }
    });

    //27. Modal editar línea de proyecto:
    $('.btn-line').on('click', function () {
        var id = $(this).data('id');

        $.get("/admin/lines/edit/" + id, function (response, state) {
            $('#lineId').val(response.id);
            $('#editProduct').val(response.product);
            $('#editQty').val(response.qty);
            $('#editPrice').val(response.price);
            $('#editObservations').text(response.observations);
        });
    });

    //28. Guardar preferencia:
    $('#preferenceName').on('change', function (e) {
        e.preventDefault();
        var data = $('#frm_preference').serialize();
        $('#preferenceName').val('');
        //console.log(data);

        $.ajax({
            url: "/admin/preferences/store",
            type: "POST",
            data: data,
            cache: false,
            datatype: "JSON",
            success: function success(response) {
                showSuccess(response);
            }
        });
    });
    //Bloquear botón intro:
    $('#preferenceName').on('keypress', function (e) {
        if (e.which == 13) {
            return false;
        }
    });

    //29. Modal editar movimiento de stock:
    $('.btn-stockMov').on('click', function () {
        var id = $(this).data('id');
        var mov = $(this).data('mov');
        var siglas = $(this).data('siglas');

        $('#movId').val(id);
        $('#movName').val(mov);
        $('#movSiglas').val(siglas);

        $('textarea').text('');

        //console.log(id);

        $.get("/admin/stock_movements/" + id + "/edit", function (response, state) {
            if (response) {
                //console.log(response);
                var explanation = Object.keys(response.explanation).length;

                for (i = 0; i < explanation; i++) {
                    var key = Object.keys(response.explanation)[i];
                    var valor = Object.values(response.explanation)[i];
                    //console.log(key, valor);
                    $('textarea[name="explanation_' + key + '"]').text(valor);
                }
            }
        });
    });

    //30. Modal editar almacén:
    $('.btn-new-store').on('click', function () {
        $('.sedeView, .departmentView').hide();
    });
    $('.btn-store').on('click', function () {
        $('.sedeView, .departmentView, .ownerView').hide();
        $('.ownerView .row div').html('');
        var id = $(this).data('id');

        $.get("/admin/stores/edit/" + id, function (response, state) {
            console.log(response);
            if (response) {
                $('#storeId').val(response.id);
                $('#storeName').val(response.name);
                $('#storeType option[value="' + response.type + '"]').prop("selected", true);
                $('#storeObservations').text(response.observations);

                if (response.schema == 'users') {
                    $('.ownerView .row div').html('Propietario: ' + response.owner.name + ' ' + response.owner.surname + ' <input type="hidden" name="user_id" value="' + response.owner.id + '">');
                    $('.ownerView').slideDown();
                } else if (response.schema == 'companies') {
                    $('#companyId option[value="' + response.owner.id + '"]').prop("selected", true);
                    $('.sedeView').slideDown();
                    //Eliminar empresa:
                    $('.companyView label').append('<span class="delete-owner" data-owner="companyView" rel="tooltip" title="desvincular propiedad de la empresa"><i class="fa fa-times"></i></span>');

                    //Cargando las sedes de la empresa:
                    $("#sedeId").append('<option value="">Selecciona sede</option>');
                    for (j = 0; j < response.sedes.length; j++) {
                        var selected = response.sedes.length == 1 ? 'selected' : '';
                        $("#sedeId").append('<option value="' + response.sedes[j].id + '" ' + selected + '>' + response.sedes[j].name + '</option>');
                    }
                } else if (response.schema == 'sedes') {
                    $('#companyId option[value="' + response.owner.company_id + '"]').prop("selected", true);
                    $('.sedeView, .departmentView').slideDown();
                    //Eliminar sede:
                    $('.sedeView label').append('<span class="delete-owner" data-owner="sedeView" rel="tooltip" title="desvincular propiedad de la sede"><i class="fa fa-times"></i></span>');

                    //Cargando las sedes de la empresa:
                    for (j = 0; j < response.sedes.length; j++) {
                        var selected = response.sedes.length == 1 || response.sedes[j].id == response.owner.sedeId ? 'selected' : '';
                        $("#sedeId").append('<option value="' + response.sedes[j].id + '" ' + selected + '>' + response.sedes[j].name + '</option>');
                    }
                    //Cargando las departamentos de la empresa:
                    $("#departmentId").append('<option value="">Selecciona departamento</option>');
                    for (k = 0; k < response.departments.length; k++) {
                        $("#departmentId").append('<option value="' + response.departments[k].id + '">' + response.departments[k].name + '</option>');
                    }
                } else if (response.schema == 'departments') {
                    $('#companyId option[value="' + response.owner.company_id + '"]').prop("selected", true);
                    $('.sedeView, .departmentView').slideDown();
                    //Eliminar departamento:
                    $('.departmentView label').append('<span class="delete-owner" data-owner="departmentView" rel="tooltip" title="desvincular propiedad del departamento"><i class="fa fa-times"></i></span>');

                    //Cargando las sedes de la empresa:
                    for (j = 0; j < response.sedes.length; j++) {
                        var selected = response.sedes.length == 1 || response.sedes[j].id == response.owner.sedeId ? 'selected' : '';
                        $("#sedeId").append('<option value="' + response.sedes[j].id + '" ' + selected + '>' + response.sedes[j].name + '</option>');
                    }
                    //Cargando las departamentos de la empresa:
                    for (k = 0; k < response.departments.length; k++) {
                        var selected = response.departments.length == 1 || response.departments[k].id == response.owner_id ? 'selected' : '';
                        $("#departmentId").append('<option value="' + response.departments[k].id + '" ' + selected + '>' + response.departments[k].name + '</option>');
                    }
                }
            } else {
                console.log('no modal');
                $('#modal-edit-store').modal('toggle');
            }
        });
    });

    //30.1. Desvincular propietario de almacén:
    $(document).on('click', '.delete-owner', function () {
        var owner = $(this).data('owner');
        $('.' + owner).remove();
        if (owner == 'sedeView') {
            $('.departmentView').remove();
        }
        if (owner == 'companyView') {
            $('.sedeView').remove();
        }
    });

    //31. Modal edición concepto de trabajo:
    $('.btn-concept').on('click', function () {
        var id = $(this).data('id');
        var concept = $(this).data('concept');

        $('#conceptId').val(id);
        $('#conceptName').val(concept);
    });

    //32. Guardar tiempo de trabajo:
    $('.hora').on('change', function () {
        var _this2 = this;

        var elem = $(this);
        var hora = $(this).val();
        var dia = $(this).data('dia');
        var fila = $(this).data('fila');
        var tipo = $(this).data('tipo');
        var tipoId = $(this).data('tipoid');
        var id = $(this).data('id');
        var dia0 = dia < 10 ? '0' + dia : dia;
        var mes = $('#Mes').val();
        var any = $('#Any').val();
        var fecha = any + '-' + mes + '-' + dia0;

        //alert(hora+' - '+fecha+' - '+tipo+' - '+tipoId+' - '+id);

        //Eliminar registro si no viene hora declarada y sí el id:
        if (hora == '' && id != '') {
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/admin/working/delete_ajax/" + id,
                type: "DELETE",
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    id: id
                },
                cache: false,
                datatype: "JSON",
                success: function success(response) {
                    showSuccess(response);
                }
            });
            return false;
        }

        if (fecha > getHoy()) {
            var msg = 'No se pueden introducir datos en fechas futuras';
            swal({
                type: 'error',
                title: msg,
                text: "",
                icon: "warning"
            }).then(function (willDelete) {
                if (willDelete) {
                    $(_this2).focus().val('');
                }
            });
            return false;
        }

        //Comprobamos que la hora no contenga caracteres especiales distintos a (:):
        var caracteres = '/;()&@"_\|~<>$#%^*+=[]{}¿?¡!.,abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ"';
        var cuentasep = 0;
        for (i = 0; i < hora.length; i++) {
            if (caracteres.indexOf(hora.charAt(i), 0) != -1) {
                hora = hora.replace(hora.charAt(i), ':');
            }
            //Que (:) no se repita:
            if (hora[i] == ':') cuentasep++;
        }

        if (cuentasep == 0) {
            hora = hora + ':00';
        }

        if (cuentasep > 1) {
            $(this).focus().val('');
            return false;
        }

        //Caso de no marcar horas, sólo minutos:
        var p = hora.split(':');
        if (p[0] == '') hora = '00:' + p[1];

        var p1 = hora.split(':');
        if (p1[1] > 0 && p1[1] < 10) hora = p1[0] + ':' + p1[1] + '0';

        //Expresión regular para impedir más de 8 horas:
        if (hora > 0 && !hora.match(/^[[0-8]:[0-5][0-9]$/)) {
            var msg = 'Introduce el formato válido: HH:mm';
            swal({
                type: 'error',
                title: msg,
                text: "",
                icon: "warning"
            }).then(function (willDelete) {
                if (willDelete) {
                    $(_this2).focus().val('');
                }
            });
            return false;
        }
        $(this).val(hora);

        //Validar máximo de tiempo trabajado:
        if (hora > '8:00') {
            var msg = 'No se puede introducir un valor superior a 8 horas';
            swal({
                type: 'error',
                title: msg,
                text: "",
                icon: "warning"
            }).then(function (willDelete) {
                if (willDelete) {
                    $(_this2).focus().val('');
                }
            });
            return false;
        }

        //console.log('aquí: '+hora+' - '+fecha+' - '+tipo+' - '+tipoId+' - '+id);

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/admin/working/store_ajax",
            type: "POST",
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                tipo: tipo,
                tipo_id: tipoId,
                id: id,
                time: hora,
                fecha: fecha
            },
            cache: false,
            datatype: "JSON",
            success: function success(response) {
                if (response) {
                    //Suma de totales del día:
                    var totalDia = '00:00';
                    var totalFila = '00:00';

                    //Horas día:
                    $('.hora[data-dia="' + dia + '"]').each(function () {
                        var horasDia = $(this).val();
                        if (horasDia != '') {
                            totalDia = sumaHoras(totalDia, horasDia);
                        }
                    });
                    $('.totalDia' + dia).text(totalDia);

                    //Horas fila:  
                    $('.hora[data-fila="' + fila + '"]').each(function () {
                        var horasFila = $(this).val();
                        if (horasFila != '') {
                            totalFila = sumaHoras(totalFila, horasFila);
                        }
                    });
                    $('.totalFila' + fila).text(totalFila);

                    elem.parent('.horas').append('<i class="fa fa-check hora-ok"></i>');
                    $('.hora-ok').delay(500).fadeOut(300);
                }
            }
        });
    });

    //32.1. Desplazamiento con teclado por tabla:
    $('.hora').on('keydown', function (e) {
        var padre = $(this).parent();
        var coord = padre.data('coord');
        var fc = coord.split("-");
        var f = parseInt(fc[0]);
        var c = parseInt(fc[1]);
        var nfc = '';

        var x = e.which || e.keyCode;
        switch (x) {
            //Izquierda:
            case 37:
                nfc = f + '-' + (c - 1);
                break;
            //Arriba:
            case 38:
                nfc = f - 1 + '-' + c;
                break;
            //Derecha:
            case 39:
                nfc = f + '-' + (c + 1);
                break;
            //Abajo:
            case 40:
                nfc = f + 1 + '-' + c;
                break;
        }
        $('.horas[data-coord="' + nfc + '"] input').focus();
    });

    //33. Bloquear celdas para scroll horizontal y vertical:
    $('.wt-body').on('scroll', function () {
        var top = $(this).scrollTop();
        $('.wt-dias').css('top', top + 'px');
    });

    //34. Cambiar año resumen working time:
    $('#frmWorkingYear').on('change', function () {
        var any = $('#frmWorkingYear option:selected').val();
        window.location.href = "/admin/working/summary/" + any;
    });

    //35. Modal edición marca:
    $('.btn-brand').on('click', function () {
        var id = $(this).data('id');
        var brand = $(this).data('brand');
        var company_id = $(this).data('companyid');

        $('#brandId').val(id);
        $('#brandName').val(brand);
        $('#companyId option[value="' + company_id + '"]').prop("selected", true);
    });

    //36. Selector de subopciones:
    $('.opcion').on('click', function (e) {
        var clicked = e.target.className;

        //Sólo se ejecuta si se ha clickado sobre el .opcion
        if (clicked.includes('opcion')) {
            var id = $(this).data('id');
            var module_id = $('#moduleId').val();
            var item_id = $('#itemId').val();
            var seleccionado = true;
            $('.opcion').removeClass('preselected');
            if (!$(this).hasClass('selected')) {
                $(this).addClass('preselected');
                seleccionado = false;
            }
            $('.subopciones').html('<div class="elem_cargando"><img alt="cargando" src="/img/loading.gif" /></div>');

            $.get("/admin/subcategories/" + id, function (response, state) {
                if (response.length > 0) {
                    var keys = Object.keys(objProductCategories);
                    var categories = Object.values(objProductCategories);
                    var html = '<ul>';

                    for (j = 0; j < response.length; j++) {
                        var selected = categories.indexOf(response[j].id) !== -1 ? 'selected' : '';

                        html += '<li class="subopcion ' + selected + '" data-id="' + response[j].id + '" data-opcionid="' + id + '">';
                        //botón eliminar categoría:
                        if (selected != '') {
                            html += '<i class="fa fa-times remove-item" data-id="' + response[j].id + '"></i>';
                        }
                        html += response[j].name + '</li>';
                    }
                    html += '</ul>';
                    $('.subopciones').html(html);

                    //Si no trae subcategorías ni está seleccionado previamente, vinculamos la categoría al item:
                } else if (response.length == 0 && !seleccionado) {
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: "/admin/category_item/store",
                        type: "POST",
                        data: {
                            _token: $('meta[name="csrf-token"]').attr('content'),
                            opcion_id: id,
                            subopcion_id: '',
                            module_id: module_id,
                            item_id: item_id
                        },
                        cache: false,
                        datatype: "JSON",
                        success: function success(response) {
                            if (response) {
                                $('.opcion[data-id="' + id + '"]').removeClass('preselected').addClass('selected').append('<i class="fa fa-check item-ok"></i>').append('<i class="fa fa-times remove-item" data-id="0' + id + '"></i>');

                                var valor = Object.values(response);
                                //Pasamos el objeto recibido al objeto objProductCategories:
                                Object.assign(objProductCategories, response);

                                $('.item-ok').delay(500).fadeOut(300);
                                /*$('.opcion[data-id="'+id+'"]').append('<i class="fa fa-times remove-item" data-id="'+valor+'"></i>');   */

                                $('.subopciones').html('');
                            }
                        }
                    });
                }
            });
        }
    });

    //36.1. Guardar categoría de item:
    $(document).on('click', '.subopcion', function () {
        var elem = $(this);
        var opcion_id = $(this).data('opcionid');
        var subopcion_id = $(this).data('id');
        var module_id = $('#moduleId').val();
        var item_id = $('#itemId').val();

        if (!$(this).hasClass('selected')) {
            $(this).addClass('selected');
            //Marcamos la categoría padre como seleccionada.
            $('.opcion[data-id="' + opcion_id + '"]').removeClass('preselected').addClass('selected').append('<i class="fa fa-check item-ok"></i>');
            //Le agregamos -si no la tiene ya- la opción de eliminar. ¡Atención! al 0 en el data-id para que elimine también las subcategorías pertenecientes a la categoría.
            if ($('.opcion[data-id="' + opcion_id + '"] .remove-item').length == 0) {
                $('.opcion[data-id="' + opcion_id + '"]').append('<i class="fa fa-times remove-item" data-id="0' + opcion_id + '"></i>');
            }

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/admin/category_item/store",
                type: "POST",
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    opcion_id: opcion_id,
                    subopcion_id: subopcion_id,
                    module_id: module_id,
                    item_id: item_id
                },
                cache: false,
                datatype: "JSON",
                success: function success(response) {
                    if (response) {
                        var valor = Object.values(response);
                        //Pasamos el objeto recibido al objeto objProductCategories:
                        Object.assign(objProductCategories, response);

                        elem.append('<i class="fa fa-check item-ok"></i>');
                        $('.item-ok').delay(500).fadeOut(300);
                        elem.append('<i class="fa fa-times remove-item" data-id="' + valor + '"></i>');
                    }
                }
            });
        }
    });

    //36.2. Eliminar categoría de item:
    $(document).on('click', '.remove-item', function (e) {
        e.stopPropagation();
        var module_id = $('#moduleId').val();
        var item_id = $('#itemId').val();
        var category_id = $(this).data('id');
        var padre = $(this).parent();
        padre.removeClass('selected');
        $(this).remove();

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/admin/category_item/destroy",
            type: "POST",
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                category_id: category_id,
                module_id: module_id,
                item_id: item_id
            },
            cache: false,
            datatype: "JSON",
            success: function success(response) {
                console.log(response);
                //Recargar página después de eliminar una categoría principal:
                if (response == 'reload') {
                    window.location.href = '/admin/products/' + item_id + '/edit/categories';
                } else {
                    console.log(response);
                    delete objProductCategories[response.id];
                    padre.append('<i class="fa fa-times item-ok"></i>');
                    $('.item-ok').delay(500).fadeOut(300);
                }
            }
        });
    });

    //37. Modal editar respuesta quiz:
    $(document).on('click', '.btnEditAnswer', function () {
        var id = $(this).data('id');

        $.get("/admin/answers/" + id + "/edit", function (response, state) {
            if (response) {
                $('#answerId').val(response.id);
                $('#answerName').val(response.name);
                $('#answerPoints').val(response.points);
                $('#modal-edit-answer input[name="isValid"][value="' + response.isValid + '"]').prop('checked', true);
                $('#modal-edit-answer .rdb-access[value="' + response.image + '"]').prop('checked', true);

                var translations = Object.keys(response.translations).length;
                var explanation = Object.keys(response.explanation).length;

                for (i = 0; i < translations; i++) {
                    var key = Object.keys(response.translations)[i];
                    var valor = Object.values(response.translations)[i];
                    $('input[name="translations_' + key + '"]').val(valor);
                }
                for (i = 0; i < explanation; i++) {
                    var key = Object.keys(response.explanation)[i];
                    var valor = Object.values(response.explanation)[i];
                    console.log(valor);
                    $('textarea[name="explanation_' + key + '"]').text(valor);
                }
            }
        });
    });

    //38. Modal editar opción de parámetro:
    $(document).on('click', '.btnEditOption', function () {
        var id = $(this).data('id');
        var name = $(this).data('name');

        $('#optionId').val(id);
        $('#optionName').val(name);
    });

    //39. Select conmutados:
    $('.conmutados').on('change', function () {
        var valor = $(this).find('option:selected').val();
        $('.conmutados option:selected').prop('selected', false);
        $(this).find('option[value=' + valor + ']').prop('selected', true);
    });

    //40. Selector almacenes:
    $('.setStore').on('click', function () {
        var elem = $(this);
        var store_id = elem.data('id');
        $('#storeId').val(store_id);
        var product_id = $('#product option:selected').val();
        var padre = elem.parent('ul');
        padre.find('li').removeClass('selected');
        elem.addClass('selected');
        $('.stocksForm .velo').fadeOut(500);

        //Modificación en selector de almacenes de destino
        $('#store_destiny option[value=""]').prop('selected', true);
        $('#store_destiny option').prop('disabled', false);
        $('#store_destiny option[value="' + store_id + '"]').prop('disabled', true);

        //Si existe producto seleccionado, obtenemos su información:
        if (product_id != '') {
            var batch = $('#product option:selected').data('batch');

            //Stock del producto:
            getProductStock(product_id, store_id, batch);
        }
    });

    //41. Selector stock de producto:
    $('#product').on('change', function () {
        var product_id = $('#product option:selected').val();
        var store_id = $('#storeId').val();
        var batch = $('#product option:selected').data('batch');

        if (product_id == '' || store_id == '') {
            return false;
        }

        //Pasamos product_id a la url de selector de almacenes:
        $('.store_link a').each(function () {
            var link = $(this).attr('href');
            //Comprobamos que no tenga ya puesto el parámetro del producto:
            var p = link.split('/');
            var penult = p[p.length - 2];
            var antepe = p[p.length - 3];
            if (penult == 'store') {
                var newlink = link + '/' + product_id;
                $(this).attr('href', newlink);
            }
            if (antepe == 'store') {
                var newlink = '';
                for (i = 0; i < p.length - 1; i++) {
                    newlink += p[i] + '/';
                }
                newlink += product_id;
                $(this).attr('href', newlink);
            }
        });

        if (batch == 1) {
            $('.stockBatches').prop('disabled', false);
            $('.stockDisponible').html('<img alt="cargando" src="/img/loading.gif" />');
        } else {
            $('.stockBatches').prop('disabled', true);
        }

        if (product_id != '') {
            $('#stockmov').prop('disabled', false);
        }

        //Stock del producto:
        getProductStock(product_id, store_id, batch);
    });

    //41.1. Activar formulario movimiento de stock:
    $('.stocksForm .velo').on('click', function () {
        $(this).html('<span>Selecciona un almacén previamente</span>');
    });

    //41.2. Stock por lote:
    $('#batch').on('change', function () {
        var batch = $('#batch option:selected').val();
        var store = $('#storeId').val();
        $('.stockDisponible').html('<img alt="cargando" src="/img/loading.gif" />');
        //Al seleccionar lote, vaciamos posible valor de lote nuevo:
        $('#newBatch, #expiry_date').val('');

        $.get("/admin/stocks/" + batch + "/" + store + "/batch", function (response, state) {
            var stock = response.result ? response.result : '0';
            $('.stockDisponible').html(stock);
            $('#disponible').val(stock);
        });
    });

    //41.3. Deseleccionamos lote del selector si se introduce nuevo lote:
    $('#newBatch').on('change', function () {
        var batch = $(this).val();
        if (batch != '') {
            $('#batch option[value=""]').prop("selected", true);
        }
    });

    //41.4. Mostrar almacén de destino para traspaso entre almacenes:
    $('#stockmov').on('change', function () {
        var sign = $('#stockmov option:selected').data('sign');
        var store_id = $('#storeId').val();
        if (sign == 'x') {
            $('.storeDestiny').slideDown();
            $('#store_destiny').prop('required', true);
            $('#store_destiny option[value="' + store_id + '"]').prop('disabled', true);
        } else {
            $('.storeDestiny').slideUp();
            $('#store_destiny').prop('required', false);
            $('#store_destiny option[value="' + store_id + '"]').prop('disabled', false);
        }
    });

    //42. Modal edición evento de calendario:
    $('.btn-calendar-event').on('click', function () {
        var id = $(this).data('id');
        var event = $(this).data('event');
        var color = $(this).data('color');
        var description = $(this).data('description');

        $('#eventId').val(id);
        $('#eventName').val(event);
        $('#eventColor').val(color);
        $('#eventDescription').val(description);
    });

    //43. Selecthor:
    $(document).on('change', '.selecthor', function () {
        var id = $(this).find('option:selected').val();

        var guestsList = $('.guestsList').val();
        //Convertimos string a array:
        var guests = JSON.parse("[" + guestsList + "]");

        //Array para no repetir usuarios:
        if (guests.includes(parseInt(id))) {
            return false;
        } else {
            guests.push(parseInt(id));
            strValues = guests.toString();
            $('.guestsList').val(strValues);
            var name = $(this).find('option:selected').text();
            var html = '<span data-id="' + id + '">' + name + '<i class="fa fa-times"></i></span>';
            $('.selecthor-values').show().append(html);
        }
    });

    //43.1 Eliminar usuario seleccionado:
    $(document).on('click', '.selecthor-values span .fa', function () {
        var id = $(this).parent('span').data('id');

        var guestsList = $('.guestsList').val();
        //Convertimos string a array:
        var guests = JSON.parse("[" + guestsList + "]");

        //id = String(id);    //¡Importante! convertir a string.
        removeElement(guests, id);
        strValues = guests.toString();
        $('.guestsList').val(strValues);
        $(this).parent('span').remove();
        $('.selecthor option[value=""]').prop('selected', true);
    });

    //44. Editar lote:
    $(document).on('click', '.btnEditBatch', function (e) {
        e.preventDefault();
        var id = $(this).data('id');

        $.get("/admin/batches/" + id + "/edit", function (response, state) {
            if (response) {
                $('#batchId').val(response.id);
                $('#batchName').val(response.name);
                $('#batchDocNum').val(response.name);
                $('#batchExpiryDate').val(response.caduca);
                $('#batchDeadline').val(response.fechaCierre);
                $('#batchDocNum').val(response.doc_num);
            }
        });
    });

    //45. Modal pedir producto:
    $(document).on('click', '.btnOrderProduct', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var product = $(this).data('product');

        $('#orderProductId').val(id);
        $('#orderProduct b').text(product);
    });

    //46. Modal editar setting option:
    $(document).on('click', '.btnSettingOption', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var option = $(this).data('option');
        var description = $(this).data('description');

        $('#settingOptionId').val(id);
        $('#settingOptionName').val(option);
        $('#settingOptionDescription').text(description);
    });

    //47. Crear referencia por patrón:
    $('.btnCreateRef').on('click', function (e) {
        e.preventDefault();
        var pattern_id = $(this).data('patternid') ? $(this).data('patternid') : $('#patternId').val();

        if (pattern_id != '') {
            $.get("/admin/references/get-reference/" + pattern_id, function (response, state) {
                if (response) {
                    $('#ref_patterns_id').val(pattern_id);
                    $('#ref').val(response);
                }
            });
        }
    });

    //48. Añadir segmento a formulario de patrón de presupuestos:
    $('.btnAddSegment').on('click', function (e) {
        e.preventDefault();

        //Comprobamos si la opción de digits ya ha sido incluida en el patrón:
        var texto = true;
        $('.segment-options').each(function () {
            if ($(this).val() == 'digits') texto = false;
        });

        var html = '<div class="row mb-2 segment">';
        html += '<div class="col-6">';
        html += '<select class="form-control segment-options" name="segment[]">';
        html += '<option value="">Tipo de segmento</option>';
        if (texto) {
            html += '<option value="digits">digitos</option>';
        }
        html += '<option value="text">texto</option>';
        html += '<option value="year">año</option>';
        html += '</select>';
        html += '</div>';
        html += '<div class="col-5">';
        html += '<input class="form-control segment_text" name="segment_text[]" disabled>';
        html += '</div>';
        html += '<div class="col-1 text-right">';
        html += '<i class="fa fa-times-circle btnRemoveSegment"></i>';
        html += '</div>';
        html += '</div>';

        $('.segments').append(html);
    });
    $(document).on('click', '.btnRemoveSegment', function () {
        $(this).closest('.segment').remove();
    });
    $(document).on('change', '.segment-options', function (event) {
        var elem = $(this).closest('.segment');
        var option = $(this).find('option:selected').val();
        if (option == 'text') {
            elem.find('.segment_text').prop('disabled', false).focus();
        } else {
            elem.find('.segment_text').prop('disabled', true);
        }
    });

    //49. Modal editar bloque items de formulario de presupuestos:
    $(document).on('click', '.btnEditFormBlock', function () {
        var id = $(this).data('id');
        var name = $(this).data('name');

        $('#blockItemsId').val(id);
        $('#blockItemsName').val(name);
    });

    //50. Modal editar item de formulario de presupuestos:
    $(document).on('click', '.btnEditFormItem', function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var price = $(this).data('price');

        $('#ItemsId').val(id);
        $('#ItemsName').val(name);
        $('#ItemsPrice').val(price);
    });

    //51. Calcular importe item de formulario de presupuestos:
    $(document).on('change', '.itemQty, .itemPrice', function () {
        var elem = $(this);
        var padre = elem.closest('.budget-item');
        var block = padre.data('block');
        if (elem.hasClass('itemQty')) {
            var qty = elem.val();
            var price = padre.find('.itemPrice').val();
        } else {
            var qty = padre.find('.itemQty').val();
            var price = elem.val();
        }

        var amount = qty * price;
        padre.find('.itemAmount').val(amount);

        if (amount > 0) {
            padre.find('.itemPrint').prop('checked', true);
        } else {
            padre.find('.itemPrint').prop('checked', false);
        }

        //Calculamos importe del bloque:
        var blockAmount = 0;
        $('.budget-item[data-block="' + block + '"] .itemAmount').each(function () {
            blockAmount = parseInt(blockAmount) + parseInt($(this).val());
        });
        $('.bst-' + block).text(blockAmount + '€');

        //Calculamos importe total:
        var totalAmount = 0;
        $('.itemAmount').each(function () {
            totalAmount = parseInt(totalAmount) + parseInt($(this).val());
        });
        $('.totalAmount').text(totalAmount + '€');
    });

    //51.1. Pasar subtotal por bloque de presupuesto:
    if ($('.block-subtotal').length > 0) {
        $('.blockSubtotal').each(function () {
            var idx = $(this).data('bst');
            var amount = $(this).val();
            $('.bst-' + idx).text(amount + '€');
        });
    }

    //52. Añadir línea libre a presupuesto:
    var budgetItemBg = true;
    $(document).on('click', '.addBudgetItem', function (e) {
        e.preventDefault();
        var elem = $(this);
        var blockid = elem.data('blockid');
        var padre = elem.closest('.card');

        if (budgetItemBg) {
            var bgItem = 'bg-item';
            budgetItemBg = false;
        } else {
            var bgItem = '';
            budgetItemBg = true;
        }

        var html = '<input type="hidden" name="itemId0[]" value="1">';
        html += '<input type="hidden" name="block_id[]" value="' + blockid + '">';
        html += '<div class="budget-item ' + bgItem + '">';
        html += '<div class="row">';
        html += '<div class="col-md-6 only-vertical-centered">';
        html += '<input type="text" class="form-control" placeholder="concepto" name="concept0[]" required>';
        html += '</div>';

        html += '<div class="col-md-1">';
        html += '<input type="number" class="form-control text-center itemQty" name="qty0[]" min="0" value="0">';
        html += '</div>';

        html += '<div class="col-md-1">';
        html += '<span class="iconAddon">€</span>';
        html += '<input type="text" class="form-control text-right itemPrice" name="price0[]">';
        html += '</div>';

        html += '<div class="col-md-1">';
        html += '<input type="number" class="form-control text-center itemDays" name="days0[]" min="0" value="0">';
        html += '</div>';

        html += '<div class="col-md-1">';
        html += '<select class="form-control" name="dc0[]">';
        html += '<option value="1">Si</option>';
        html += '<option value="0" selected>No</option>';
        html += '</select>';
        html += '</div>';

        html += '<div class="col-md-1">';
        html += '<span class="iconAddon">€</span>';
        html += '<input type="text" class="form-control text-right itemAmount" name="amount0[]" readonly>';
        html += '</div>';

        html += '<div class="col-md-1 text-center sinpadding-right">';
        html += '<label class="custom-chk-rdb" rel="tooltip" title="imprimir" style="margin-top: 5px;">';
        html += '<input type="checkbox" class="itemPrint" name="print0[]" value="0">';
        html += '<span class="chk"></span>';
        html += '</label>';
        html += '</div>';

        html += '<div class="col-12 mt-3">';
        html += '<div class="form-group row">';
        html += '<label for="observations" class="col-lg-2 col-form-label">' + txtObservaciones + '</label>';
        html += '<div class="col-lg-10">';
        html += '<input type="text" class="form-control" name="observations0[]">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        padre.find('.card-body').prepend(html);
        padre.find('.collapse').addClass('show');
    });

    //53. Desplegar selector modificaciones de presupuesto:
    $('.budget-versions select').on('change', function (event) {
        var id = event.target.value;
        window.location.href = '/admin/budgets/' + id + '/edit';
    });

    //54. Editar permiso:
    $(document).on('click', '.btnEditPermission', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var name = $(this).data('name');
        var description = $(this).data('description');

        $('#permissionId').val(id);
        $('#permissionName').val(name);
        $('#permissionDescription').val(description);
    });

    //55. Marcar icono seleccionado:
    $('.iconGallery').on('click', function () {
        $('.iconGallery').removeClass('selected');
        $(this).addClass('selected');
        var icono = $(this).data('icono');
        $('.iconValue').val(icono);
    });

    //56. Editar concepto horario:
    $(document).on('click', '.btnEditItem', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var name = $(this).data('name');
        var tipo = $(this).data('tipo');
        var fijo = $(this).data('fijo');
        var minhour = $(this).data('minhour');
        var min = $(this).data('min');
        var max = $(this).data('max');
        var qty = $(this).data('qty');
        var color = $(this).data('color');
        var icono = $(this).data('icono');
        var revisable = $(this).data('revisable');

        $('#itemId').val(id);
        $('#itemTipo option[value="' + tipo + '"]').prop("selected", true);
        $('#itemFijo').val(fijo);
        $('#itemMinHour').val(minhour);
        $('#itemName').val(name);
        $('#itemMin').val(min);
        $('#itemMax').val(max);
        $('#itemQty').val(qty);
        $('#itemColor').val(color);
        $('#itemIcono').val(icono);
        $('.iconGallery').removeClass('selected');
        $('.iconGallery[data-icono="' + icono + '"]').addClass('selected');
        if (revisable == 1) {
            $('#itemRevisable').prop('checked', true);
        } else {
            $('#itemRevisable').prop('checked', false);
        }
    });

    //57. Editar registro horario:
    $(document).on('click', '.btnRegistroHorario', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var concepto = $(this).data('concepto');
        var icono = $(this).data('icono');

        $.get("/admin/timetable/" + id + "/edit-hour", function (response, state) {
            if (response) {
                var registro = '<i class="fa fa-' + icono + '"></i> ' + concepto;
                $('#tmConcepto').html(registro);

                //console.log(response);
                $('#tmId').val(response.id);
                $('#tmComments').val(response.comments);

                var h = response.hour.split(':');
                $('#tmHora').val(h[0]);
                $('#tmMinutos').val(h[1]);
                $('#tmSegundos').val(h[2]);
            }
        });
    });

    //58. Establecer jornadas calendario laboral:
    $('.tipoJornada').on('change', function () {
        var valor = $(this).val();
        $('#tipoJornadaSelected').val(valor);
    });
    $('.dia').on('click', function () {
        var elem = $(this);
        var fecha = elem.data('fecha');

        //Opción para cambiar horario individual:
        if (elem.hasClass('cambiarHorario')) {
            var sidebar_width = $('.main-sidebar').width();
            var posX = parseInt($(this).offset().left - sidebar_width) + 20;
            var posY = $(this).position().top - 35;
            var posYAbs = $(this).offset().top - 240;

            //alert(posY);
            //alert(posYAbs);

            $('#frmChangeHourly #fecha').val(fecha);

            $('.customPopover').css({ 'left': posX + 'px', 'top': posYAbs + 'px' }).fadeIn();
        } else {
            var tipo = $('#tipoJornadaSelected').val();
            var opcion = $('.tipoJornada option:selected').text();

            if (tipo != '') {
                var user = $('#userJornada').val();
                var company = $('#companyIdFrm').val();
                var sede = $('#sedeIdFrm').val();
                var ambito = $('#ambitoJornada').val();
                var user_enabled = elem.hasClass('userEnabled') ? true : false;

                if (ambito == 'employee' && !user_enabled) {
                    return false;
                }

                var ruta = ambito == 'company' ? '/admin/work-calendar/' + fecha + '/' + tipo + '/' + company + '/' + sede + '/store' : '/admin/work-user-calendar/' + fecha + '/' + tipo + '/' + user + '/store';

                $.get(ruta, function (response, state) {
                    if (response) {
                        //Según el ámbito se renderizan unos estilos u otros:
                        if (ambito == 'company') {
                            $('.dia[data-fecha="' + fecha + '"]').css({ 'background-color': response.color, 'color': 'white' });
                            if (response.is_working != 1) {
                                $('.dia[data-fecha="' + fecha + '"] span').empty();
                            }
                        } else {
                            //Sumamos jornada a los solicitados:
                            var partial = $('.dtPartial-' + tipo).text();
                            $('.dtPartial-' + tipo).text(parseInt(partial) + 1);

                            $('.dia[data-fecha="' + fecha + '"]').append('<i class="fa fa-question-circle pendent" title="' + opcion + ' pendiente de validar"></i>');
                        }
                    } else {
                        if (ambito == 'company') {
                            $('.dia[data-fecha="' + fecha + '"]').css({ 'background-color': 'transparent', 'color': '#212529' });
                        } else {
                            //Restamos jornada a los solicitados:
                            var partial = $('.dtPartial-' + tipo).text();
                            $('.dtPartial-' + tipo).text(parseInt(partial) - 1);
                            $('.dia[data-fecha="' + fecha + '"] .fa').remove();
                        }
                    }
                });
            }
        }
    });

    //59. Marcar revisión para horario laboral:
    $(document).on('click', '.chkRev', function () {
        var id = $(this).data('id');
        var state = '';
        //Atención!!: detecta el estado previo a la acción, de modo que :checked es si queda deseleccionado:
        if ($(this).siblings('input').is(':checked')) {
            state = 0;

            $.get("/admin/timetable/revision/" + id, function (response, state) {
                showSuccess(response);
            });
        } else {
            state = 1;

            $('#timetableId').val(id);
            $('#timetableState').val(state);

            $('#modal-revision-timetable').modal({
                show: true
            });
        }
    });
    $(document).on('submit', '#frmRevisionHorario', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $('#modal-revision-timetable').modal('toggle');

        $.ajax({
            url: "/admin/timetable/revision",
            type: "POST",
            data: data,
            cache: false,
            datatype: "JSON",
            success: function success(response) {
                showSuccess(response);
            }
        });
    });

    //60. Editar contrato empleado:
    $(document).on('click', '.btnEditEmployee', function () {
        var id = $(this).data('id');

        $.get("/admin/employees/" + id + "/edit", function (response, state) {
            if (response) {
                $('#jornada_1').val(response.jornada_reducida[1]);
                $('#jornada_2').val(response.jornada_reducida[2]);
                $('#jornada_3').val(response.jornada_reducida[3]);
                $('#jornada_4').val(response.jornada_reducida[4]);
                $('#jornada_5').val(response.jornada_reducida[5]);
                $('#jornada_6').val(response.jornada_reducida[6]);
                $('#jornada_7').val(response.jornada_reducida[7]);
                $('#employeeId').val(response.id);
                $('#jobTitle').val(response.job_title);
            }
        });
    });

    //61. Modal cancelar contrato:
    $(document).on('click', '.btnCancelEmployee', function () {
        var id = $(this).data('id');
        $('#employeeIdCancel').val(id);
    });

    //62. Carrito compra, añadir o quitar producto desde tienda:
    $('.cart-act').on('click', function () {
        var product_id = $(this).siblings('span.cart-stock').data('productid');
        var employee_id = $(this).siblings('span.cart-stock').data('employeeid');
        var stock = $(this).siblings('span.cart-stock').find('label').text();
        var qty = $(this).siblings('span.cart-qty').text();
        if ($(this).hasClass('cart-add')) {
            qty++;
        } else if ($(this).hasClass('cart-subtract')) {
            qty--;
        }
        if (qty < 0) qty = 0;
        if (qty > stock) qty = stock;
        $(this).siblings('span.cart-qty').text(qty);

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/admin/cart/store",
            type: "POST",
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                product_id: product_id,
                employee_id: employee_id,
                qty: qty
            },
            cache: false,
            datatype: "JSON",
            success: function success(response) {
                if (response) {
                    //Carrito:
                    $('#float-cart .totalItems').text(response);
                    $('#float-cart').removeClass('oculto');
                }
            }
        });
    });

    //63. Carrito compra: añadir o quitar producto desde carrito:
    $('.btn-cart-qty').on('click', function () {
        var rowId = $(this).data('rowid');
        var precio = $(this).data('precio');
        var qty = $(this).parent('td').siblings('td.row-qty').text();
        var stock = $(this).parent('td').siblings('td.row-stock').text();

        if ($(this).hasClass('cart-add')) {
            qty++;
        } else if ($(this).hasClass('cart-subtract')) {
            qty--;
        }

        if (qty < 0) qty = 0;
        if (qty > stock) qty = stock;
        var importe = qty * precio;
        $(this).parent('td').siblings('td.row-qty').text(qty);
        $(this).parent('td').siblings('td.row-importe').text(importe + '€');

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/admin/cart/update",
            type: "POST",
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                row_id: rowId,
                qty: qty
            },
            cache: false,
            datatype: "JSON"
        });
    });

    //64. Detalle de equipamiento:
    $('.btn-equipment').on('click', function () {
        var id = $(this).data('productid');

        $.get("/admin/equipment/" + id + "/product", function (response, state) {
            if (response) {
                //console.log(response.description);
                var selector = '#modal-equipment-details .modal-body';
                $(selector + ' h4').text(response.producto);

                $(selector + ' .productImage').html('<img class="img-fluid" src="/img/products/' + response.Image + '">');

                $(selector + ' .ref span').text('');
                if (response.ref) {
                    $(selector + ' .ref span').text(response.ref);
                }
                $(selector + ' .price span').text('');
                if (response.price) {
                    $(selector + ' .price span').text(response.price + '€');
                }
                $(selector + ' .description span').text(response.descripcion);
            }
        });
    });

    //65. Filtrar items de presupuesto con valor económico:
    $('.btnBudgetFilter').on('change', function () {
        var valor = $('.btnBudgetFilter :checkbox').is(':checked');
        if (valor) {
            $('.itemPrint').each(function () {
                if (!$(this).is(':checked')) {
                    $(this).closest('.budget-item').fadeOut();
                }
            });
        } else {
            $('.budget-item').fadeIn();
        }
    });

    //66. Tipo de jornadas.
    $(document).on('click', '.btn-edit-holidays', function () {
        var id = $(this).data('id');
        $('#holidaysId').val(id);

        var type = $(this).data('type');
        $('#holidaysType').val(type);

        var color = $(this).data('color');
        $('#holidaysColor').val(color);

        var cumulative = $(this).data('cumulative');
        if (cumulative == 1) {
            $('#holidaysCumulative').prop('checked', true);
        }
    });

    //67. Modal configuración tipo de jornada.
    $(document).on('click', '.btn-config-day-type', function () {
        var id = $(this).data('id');
        $('#typeId').val(id);

        var type = $(this).data('type');
        $('#configDayType strong').text(type);

        $.get("/admin/day-types-config/" + id + "/index", function (response, state) {
            if (response.length > 0) {
                var html = '<table class="table mt-5">';
                html += '<thead><tr><th class="text-center">Año</th><th class="text-center">Mínimo días</th><th class="text-center">Máximo días</th></tr></thead>';
                html += '<tbody>';
                for (j = 0; j < response.length; j++) {
                    html += '<tr>';
                    html += '<td class="text-right">' + response[j].year + '</td>';
                    html += '<td class="text-right">' + response[j].min + '</td>';
                    html += '<td class="text-right">' + response[j].max + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';

                $('#typesConfigList').html(html);
            }
        });
    });

    //68. Modificar horario por usuario y día:
    $('.btnChangeTimetable').on('change', function () {
        var cambiar = $('.btnChangeTimetable :checkbox').is(':checked');
        if (cambiar) {
            $('.userEnabled').addClass('cambiarHorario');
        } else {
            $('.userEnabled').removeClass('cambiarHorario');
        }
    });

    //68.1. Guardar modificación en horario:
    $(document).on('submit', '#frmChangeHourly', function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        $.ajax({
            url: "/admin/work-user-calendar/save-change-hourly",
            type: "POST",
            data: data,
            cache: false,
            datatype: "JSON",
            success: function success(response) {
                $('.customPopover').fadeOut();
                $('.customPopover .horas, .customPopover .minutos').val('');
                $('.userEnabled[data-fecha="' + response.fecha + '"] span').text('(' + response.tiempo + ')');
            }
        });
    });

    //68.2. Cerrar popover cambio de horario:
    $(document).on('click', '.closeCP', function () {
        $('.customPopover').fadeOut();
        $('.customPopover .horas, .customPopover .minutos').val('');
    });

    //69. Popover validación de días de vacaciones:
    $('.btnOpenValidate').on('click', function (e) {
        e.preventDefault();
        var fecha = $(this).data('fecha');
        $('#fechaValidate').val(fecha);
    });

    //70. Validar día de vacaciones:
    $(document).on('click', '.btnDayValidate', function () {
        var element = $(this);
        var fecha = $('#fechaValidate').val();
        var action = 0;
        if (element.hasClass('btnValid')) {
            action = 1;
        }
        var userId = $('#userId').val();

        $('[data-toggle="popover-click"]').popover('hide');

        $.get("/admin/users/validate-holidays/" + userId + "/" + fecha + "/" + action, function (response, state) {
            $('.dia[data-fecha="' + fecha + '"] .pendent').remove();
            $('.dia[data-fecha="' + fecha + '"] .btnOpenValidate').remove();

            //Actualizamos numerador de tipo de día:
            var partial = $('.dtPartial-' + response).text();

            if (action == 1) {
                //18-02-20: no se suma el día validado pues en el contador de días seleccionados se muestran tantos los días validados como los no validados.  Si se sumase se añadirían días.
                //$('.dtPartial-'+response).text(parseInt(partial)+1);

                $('.dia[data-fecha="' + fecha + '"]').append('<i class="fa fa-check approved" title="Día de vacaciones validado"></i>');
            } else {
                $('.dtPartial-' + response).text(parseInt(partial) - 1);
            }
        });
    });

    //71. Filtrar tipo de día:
    $('.dt-selectable').on('click', function () {
        var elem = $(this);
        var dt = elem.data('dt');

        if (elem.hasClass('see')) {
            //$('.dType').fadeIn();
            elem.removeClass('see');
            elem.find('.fa').remove();
            $('.dType.dt-' + dt).fadeOut();
        } else {
            elem.addClass('see').append('<i class="fa fa-check"></i>');
            $('.dType.dt-' + dt).fadeIn();
        }
    });
});

var localeDRP = ''; //Date Picker translations:
var localeDTP = ''; //Date Time Picker translations:
if (idm == 'es') {
    localeDRP = {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancelar",
        "fromLabel": "Desde",
        "toLabel": "Hasta",
        "customRangeLabel": "Custom",
        "daysOfWeek": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        "firstDay": 1
    };

    localeDTP = {
        "format": "DD/MM/YYYY HH:mm:ss",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancelar",
        "fromLabel": "Desde",
        "toLabel": "Hasta",
        "customRangeLabel": "Custom",
        "daysOfWeek": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        "firstDay": 1
    };
} else if (idm == 'ca') {
    localeDRP = {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancel.lar",
        "fromLabel": "Des de",
        "toLabel": "Fins",
        "customRangeLabel": "Custom",
        "daysOfWeek": ["Du", "Dl", "Dm", "Dx", "Dj", "Dv", "Ds"],
        "monthNames": ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Septembre", "Octubre", "Novembre", "Dicembre"],
        "firstDay": 1
    };

    localeDTP = {
        "format": "DD/MM/YYYY HH:mm:ss",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancel.lar",
        "fromLabel": "Des de",
        "toLabel": "Fins",
        "customRangeLabel": "Custom",
        "daysOfWeek": ["Du", "Dl", "Dm", "Dx", "Dj", "Dv", "Ds"],
        "monthNames": ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Septembre", "Octubre", "Novembre", "Dicembre"],
        "firstDay": 1
    };
} else if (idm == 'en') {
    localeDRP = {
        "format": "YYYY/MM/DD",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancel",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "daysOfWeek": ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "firstDay": 1
    };

    localeDTP = {
        "format": "YYYY/MM/DD HH:mm:ss",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancel",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "daysOfWeek": ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "firstDay": 1
    };
}

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })

/******/ });