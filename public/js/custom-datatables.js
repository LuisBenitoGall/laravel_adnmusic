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
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ({

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(52);


/***/ }),

/***/ 52:
/***/ (function(module, exports) {

/* DATATABLES: */

//Enlace para widget de traducciones:
function linkTranslations(objid, schema, title) {
    return '<a href="#" class="btn btn-sm btn-info btn-translations" rel="tooltip" title="' + title + '" data-toggle="modal" data-target="#modal-translations" data-id="' + objid + '" data-schema="' + schema + '"><i class="fa fa-globe"></i></a>';
}

$(document).ready(function () {
    //Configuración general datatables:
    $.extend(true, $.fn.dataTable.defaults, {
        dom: "Blfrtip",
        buttons: ['excel', 'print', 'pdf'],
        "language": {
            "url": "/plugins/datatables/lang/" + idm + ".json"
        },
        initComplete: function initComplete() {
            //Búsqueda automática al clicar sobre el td.filtro:
            var api = this.api();
            api.$('td.filtro').click(function () {
                api.search(this.innerHTML).draw();
            });
        }
    });

    $('.dTable').DataTable({
        stateSave: true //Guarda página al refrescar. 
    });

    //Tabla users:
    if ($('#tblUsers').length > 0) {
        var user = $('#sessionUser').val();
        var tokenDT = $('meta[name="csrf-token"]').attr('content');

        $('#tblUsers').DataTable({
            "serverSide": false,
            /*"processing": true,*/
            "ajax": {
                "type": "GET",
                "url": "/api/admin/users/" + user,
                "error": function error(reason) {
                    console.log(reason);
                }
            },
            "columns": [{ data: 'id' }, { data: 'id', className: 'text-right' }, { data: 'email' }, { data: 'Role' }, { data: 'id', className: 'text-center' }, { data: 'id', className: 'text-right' }],
            "columnDefs": [{ "targets": 0,
                "render": function render(data, type, row) {
                    return row['name'] + ' ' + row['surname'];
                }
            }, { "targets": 1,
                "render": function render(data, type, row) {
                    return row['alta'];
                }
            }, { "targets": 3,
                "render": function render(data, type, row) {
                    if (row['Role']) {
                        return row['Role'];
                    } else {
                        return '';
                    }
                }
            }, { "targets": 4,
                "render": function render(data, type, row) {
                    if (row['Image']) {
                        return '<img src="/img/users/' + row['Image'] + '" width="50">';
                    } else {
                        return '<i class="fa fa-user-circle icono"></i>';
                    }
                }
            }, { "targets": 5,
                "render": function render(data, type, row) {
                    //Estado:
                    if (row['editar']) {
                        var checked = row['state'] == 1 ? 'checked' : '';
                        var estado = '<label class="custom-chk-rdb" rel="tooltip" title="' + txtUsuarioOnOff + '">';
                        estado += '<input type="checkbox" name="state" ' + checked + ' ><span class="chk" data-id="' + row['id'] + '" data-ctrl="users/state"></span>';
                        estado += '</label>';
                    } else {
                        var estado = '';
                    }

                    //Ver usuario:
                    if (row['ver']) {
                        var ver = '<a href="/admin/users/' + row['id'] + '" class="btn btn-primary btn-sm" rel="tooltip" title="' + txtVer + '"><i class="fa fa-eye"></i></a>';
                    } else {
                        var ver = '';
                    }

                    //Editar:
                    if (row['editar']) {
                        var editar = '<a href="/admin/users/' + row['id'] + '/edit" class="btn btn-sm btn-info btn-module" rel="tooltip" title="' + txtEditar + '"><i class="fa fa-edit"></i></a>';
                    } else {
                        var editar = '';
                    }

                    // Notificar:
                    var notif = '<a href="#" class="btn btn-warning btn-sm btn-notif" rel="tooltip" title="' + txtNotificar + '" data-toggle="modal" data-target="#modal-new-notification" data-id="' + row['id'] + '" data-user="' + row['name'] + ' ' + row['surname'] + '"><i class="fa fa-bell"></i></a>';

                    //Eliminar:
                    if (row['eliminar']) {
                        var eliminar = '<form method="POST" action="users/' + row['id'] + '" class="frm-inline" role="form" accept-charset="UTF-8">';
                        eliminar += '<input name="_method" type="hidden" value="DELETE">';
                        eliminar += '<input type="hidden" name="_token" value="' + tokenDT + '">';
                        eliminar += '<button type="submit" class="btn btn-sm btn-danger frm-confirm" rel="tooltip" title="' + txtUsuarioEliminar + '" data-msg="' + txtUsuarioConfirmEliminar + '"><i class="fa fa-trash"></i></button>';
                        eliminar += '</form>';
                    } else {
                        var eliminar = '';
                    }

                    return estado + ' ' + ver + ' ' + editar + ' ' + notif + ' ' + eliminar;
                }
            }]
        });
    }

    //Tabla products:
    if ($('#tblProducts').length > 0) {
        var user = $('#sessionUser').val();
        var tokenDT = $('meta[name="csrf-token"]').attr('content');

        $('#tblProducts').DataTable({
            "serverSide": false,
            /*"processing": true,*/
            "ajax": {
                "type": "GET",
                "url": "/api/admin/products/" + user,
                "error": function error(reason) {
                    console.log(reason);
                }
            },
            "columns": [{ data: 'id' }, { data: 'id' }, { data: 'id', className: 'text-center' }, { data: 'id', className: 'text-right' }],
            "columnDefs": [{ "targets": 0,
                "render": function render(data, type, row) {
                    return row['producto'];
                }
            }, { "targets": 1,
                "render": function render(data, type, row) {
                    if (row['Company']) {
                        return row['Company'];
                    } else {
                        return row['Nombre'] + ' ' + row['surname'];
                    }
                }
            }, { "targets": 2,
                "render": function render(data, type, row) {
                    if (row['doc']) {
                        return '<img src="/img/products/' + row['doc'] + '" width="60">';
                    } else {
                        return '<i class="fa fa-gift icono"></i>';
                    }
                }
            }, { "targets": 3,
                "render": function render(data, type, row) {
                    //Estado:
                    if (row['editar']) {
                        var checked = row['state'] == 1 ? 'checked' : '';
                        var estado = '<label class="custom-chk-rdb" rel="tooltip" title="' + txtProductoOnOff + '">';
                        estado += '<input type="checkbox" name="state" ' + checked + ' ><span class="chk" data-id="' + row['id'] + '" data-ctrl="products/state"></span>';
                        estado += '</label>';
                    } else {
                        var estado = '';
                    }

                    //Translations:
                    if (row['editar']) {
                        var trans = linkTranslations(row['id'], 'products', txtTraducciones);
                    } else {
                        var trans = '';
                    }

                    //Solicitar:
                    var solicita = '<a href="#" class="btn btn-sm btn-info btn-module btnOrderProduct" rel="tooltip" title="' + txtProductoPedir + '" data-toggle="modal" data-target="#modal-order-product" data-id="' + row['id'] + '" data-product="' + row['name'] + '"><i class="fa fa-shopping-basket"></i></a>';

                    //Editar:
                    if (row['editar']) {
                        var editar = '<a href="/admin/products/' + row['id'] + '/edit" class="btn btn-sm btn-info btn-module" rel="tooltip" title="' + txtProductoEditar + '"><i class="fa fa-edit"></i></a>';
                    } else {
                        var editar = '';
                    }

                    //Eliminar:
                    if (row['eliminar']) {
                        var eliminar = '<form method="POST" action="/admin/products/' + row['id'] + '" class="frm-inline" role="form" accept-charset="UTF-8">';
                        eliminar += '<input name="_method" type="hidden" value="DELETE">';
                        eliminar += '<input type="hidden" name="_token" value="' + tokenDT + '">';
                        eliminar += '<button type="submit" class="btn btn-sm btn-danger frm-confirm" rel="tooltip" title="' + txtProductoEliminar + '" data-msg="' + txtProductoConfirmEliminar + '"><i class="fa fa-trash"></i></button>';
                        eliminar += '</form>';
                    } else {
                        var eliminar = '';
                    }

                    return estado + ' ' + trans + ' ' + solicita + ' ' + editar + ' ' + eliminar;
                }
            }]
        });
    }

    //Tabla budgets:
    if ($('#tblBudgets').length > 0) {
        var user = $('#sessionUser').val();
        var tokenDT = $('meta[name="csrf-token"]').attr('content');

        $('#tblBudgets').DataTable({
            "serverSide": false,
            /*"processing": true,*/
            "ajax": {
                "type": "GET",
                "url": "/api/admin/budgets/" + user,
                "error": function error(reason) {
                    console.log(reason);
                }
            },
            "columns": [{ data: 'bkey' }, { data: 'id', className: 'text-right' }, { data: 'Customer' }, { data: 'situacion' }, { data: 'id', className: 'text-right' }],
            "columnDefs": [{ "targets": 1,
                "render": function render(data, type, row) {
                    return row['alta'];
                }
            }, { "targets": 4,
                "render": function render(data, type, row) {
                    //Editar:
                    if (row['editar']) {
                        var editar = '<a href="/admin/budgets/' + row['id'] + '/edit" class="btn btn-sm btn-info btn-module" rel="tooltip" title="' + txtEditar + '"><i class="fa fa-edit"></i></a>';
                    } else {
                        var editar = '';
                    }

                    //Eliminar:
                    /*var eliminar = '<form method="POST" action="/admin/budget-form/'+row['id']+'" class="frm-inline" role="form" accept-charset="UTF-8">';
                        eliminar += '<input name="_method" type="hidden" value="DELETE">';
                        eliminar += '<input type="hidden" name="_token" value="'+tokenDT+'">';
                        eliminar += '<button type="submit" class="btn btn-sm btn-danger frm-confirm" rel="tooltip" title="'+txtEliminar+'" data-msg="'+txtFormConfirmEliminar+'"><i class="fa fa-trash"></i></button>';
                    eliminar += '</form>';*/

                    return editar;
                }
            }]
        });
    }

    //Tabla budget forms:
    if ($('#tblBudgetForms').length > 0) {
        var user = $('#sessionUser').val();
        var tokenDT = $('meta[name="csrf-token"]').attr('content');

        $('#tblBudgetForms').DataTable({
            "serverSide": false,
            /*"processing": true,*/
            "ajax": {
                "type": "GET",
                "url": "/api/admin/budget-forms/" + user,
                "error": function error(reason) {
                    console.log(reason);
                }
            },
            "columns": [{ data: 'name' }, { data: 'Company' }, { data: 'id', className: 'text-right' }],
            "columnDefs": [{ "targets": 2,
                "render": function render(data, type, row) {
                    //Editar:
                    if (row['editar']) {
                        var editar = '<a href="/admin/budgets-forms/' + row['id'] + '/edit" class="btn btn-sm btn-info btn-module" rel="tooltip" title="' + txtEditar + '"><i class="fa fa-edit"></i></a>';
                    } else {
                        var editar = '';
                    }

                    //Eliminar:
                    var eliminar = '<form method="POST" action="/admin/budget-form/' + row['id'] + '" class="frm-inline" role="form" accept-charset="UTF-8">';
                    eliminar += '<input name="_method" type="hidden" value="DELETE">';
                    eliminar += '<input type="hidden" name="_token" value="' + tokenDT + '">';
                    eliminar += '<button type="submit" class="btn btn-sm btn-danger frm-confirm" rel="tooltip" title="' + txtEliminar + '" data-msg="' + txtFormConfirmEliminar + '"><i class="fa fa-trash"></i></button>';
                    eliminar += '</form>';

                    return editar + ' ' + eliminar;
                }
            }]
        });
    }

    //Tabla budget form patterns:
    if ($('#tblBudgetFormPatterns').length > 0) {
        var form = $('#formId').val();

        $('#tblBudgetFormPatterns').DataTable({
            "serverSide": false,
            /*"processing": true,*/
            "ajax": {
                "type": "GET",
                "url": "/api/admin/budget-form-patterns/" + form,
                "error": function error(reason) {
                    console.log(reason);
                }
            },
            "columns": [{ data: 'pattern' }, { data: 'pattern' }, { data: 'Sede' }, { data: 'pattern', className: 'text-right' }],
            "columnDefs": [{ "targets": 1,
                "render": function render(data, type, row) {
                    var pattern = '';
                    row['segments'].forEach(function (valor, indice, array) {
                        pattern += valor;
                    });
                    return pattern;
                }
            }, { "targets": 3,
                "render": function render(data, type, row) {
                    //Eliminar:
                    var eliminar = '<a href="/admin/budgets-forms/remove-pattern/' + form + '/' + row['slug'] + '" class="btn btn-sm btn-danger btn-confirm" rel="tooltip" title="' + txtEliminar + '" data-msg="' + txtPatronConfirmEliminar + '"><i class="fa fa-trash"></i></a>';

                    return eliminar;
                }
            }]
        });
    }

    //Tabla budget form blocks:
    if ($('#tblBudgetFormBlocks').length > 0) {
        var form = $('#formId').val();
        var tokenDT = $('meta[name="csrf-token"]').attr('content');

        $('#tblBudgetFormBlocks').DataTable({
            "serverSide": false,
            /*"processing": true,*/
            "ajax": {
                "type": "GET",
                "url": "/api/admin/budget-form-items/" + form,
                "error": function error(reason) {
                    console.log(reason);
                }
            },
            "columns": [{ data: 'name' }, { data: 'id', className: 'text-right' }],
            "columnDefs": [{ "targets": 1,
                "render": function render(data, type, row) {
                    //Translations:
                    var trans = linkTranslations(row['id'], 'budget_form_items', txtTraducciones);

                    //Editar:
                    var editar = '<a href="#" class="btn btn-sm btn-info btn-module btnEditFormBlock" rel="tooltip" title="' + txtEditar + '" data-toggle="modal" data-target="#modal-edit-block" data-name="' + row['name'] + '" data-id="' + data + '"><i class="fa fa-edit"></i></a>';

                    //Eliminar:
                    var eliminar = '<form method="POST" action="/admin/budget-form-items/' + row['id'] + '" class="frm-inline" role="form" accept-charset="UTF-8">';
                    eliminar += '<input name="_method" type="hidden" value="DELETE">';
                    eliminar += '<input type="hidden" name="_token" value="' + tokenDT + '">';
                    eliminar += '<button type="submit" class="btn btn-sm btn-danger frm-confirm" rel="tooltip" title="' + txtEliminar + '" data-msg="' + txtBloqueConfirmEliminar + '"><i class="fa fa-trash"></i></button>';
                    eliminar += '</form>';

                    return trans + ' ' + editar + ' ' + eliminar;
                }
            }]
        });
    }

    //Tabla budget form items:
    if ($('#tblBudgetFormItems').length > 0) {
        var form = $('#formId').val();
        var tokenDT = $('meta[name="csrf-token"]').attr('content');

        $('#tblBudgetFormItems').DataTable({
            "serverSide": false,
            /*"processing": true, */
            //scrollX: true,
            //fixedColumns: true,
            "ajax": {
                "type": "GET",
                "url": "/api/admin/budget-form-items/" + form + "/1",
                "error": function error(reason) {
                    console.log(reason);
                }
            },
            "columns": [{ data: 'name' }, { data: 'Bloque' }, { data: 'price', className: 'text-right' }, { data: 'id', className: 'text-right' }],
            "columnDefs": [{
                "targets": 0,
                "width": "50%"
            }, { "targets": 2,
                "render": function render(data, type, row) {
                    return data + '€';
                }
            }, { "targets": 3,
                "render": function render(data, type, row) {
                    //Translations:
                    var trans = linkTranslations(row['id'], 'budget_form_items', txtTraducciones);

                    //Editar:
                    var editar = '<a href="#" class="btn btn-sm btn-info btn-module btnEditFormItem" rel="tooltip" title="' + txtEditar + '" data-toggle="modal" data-target="#modal-edit-item" data-name="' + row['name'] + '" data-id="' + data + '" data-price="' + row['price'] + '"><i class="fa fa-edit"></i></a>';

                    //Eliminar:
                    var eliminar = '<form method="POST" action="/admin/budget-form-items/' + row['id'] + '" class="frm-inline" role="form" accept-charset="UTF-8">';
                    eliminar += '<input name="_method" type="hidden" value="DELETE">';
                    eliminar += '<input type="hidden" name="_token" value="' + tokenDT + '">';
                    eliminar += '<button type="submit" class="btn btn-sm btn-danger frm-confirm" rel="tooltip" title="' + txtEliminar + '" data-msg="' + txtItemConfirmEliminar + '"><i class="fa fa-trash"></i></button>';
                    eliminar += '</form>';

                    return trans + ' ' + editar + ' ' + eliminar;
                }
            }]

        });
    }

    //Tabla permissions:
    if ($('#tblPermissions').length > 0) {
        var tokenDT = $('meta[name="csrf-token"]').attr('content');

        $('#tblPermissions').DataTable({
            "serverSide": false,
            /*"processing": true, */
            //scrollX: true,
            //fixedColumns: true,
            "ajax": {
                "type": "GET",
                "url": "/api/admin/permissions",
                "error": function error(reason) {
                    console.log(reason);
                }
            },
            "columns": [{ data: 'name' }, { data: 'module' }, { data: 'description' }, { data: 'id', className: 'text-right' }],
            "columnDefs": [{ "targets": 3,
                "render": function render(data, type, row) {
                    //Editar:
                    var editar = '<a href="#" class="btn btn-sm btn-info btn-module btnEditPermission" rel="tooltip" title="' + txtEditar + '" data-toggle="modal" data-target="#modal-edit-permission" data-name="' + row['name'] + '" data-id="' + data + '" data-name="' + row['name'] + '" data-description="' + row['description'] + '"><i class="fa fa-edit"></i></a>';

                    return editar;
                }
            }]
        });
    }
});

/***/ })

/******/ });