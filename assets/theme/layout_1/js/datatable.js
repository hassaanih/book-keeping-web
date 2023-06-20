$.ajaxSetup({
	beforeSend: function (xhr) {
		xhr.setRequestHeader('Authorization', localStorage.getItem('auth_token'));
	},
	statusCode: {
		401: function () {
			localStorage.removeItem('auth_token');
			window.location.href =  '#!/auth/signin';
		}
	}
});
var DatatableBasic = function () {
	// Basic Datatable examples
	var _componentDatatableBasic = function () {
		if (!$().DataTable) {
			console.warn('Warning - datatables.min.js is not loaded.');
			return;
		}

		// Setting datatable defaults
		$.extend($.fn.dataTable.defaults, {
			processing: true,
			serverSide: true,
			autoWidth: false,
			responsive: true,
			columnDefs: [{
				orderable: false,
				width: 100,
				targets: [0]
			}],
			dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
			language: {
				search: '<span>Filter:</span> _INPUT_',
				searchPlaceholder: 'Type to filter...',
				lengthMenu: '<span>Show:</span> _MENU_',
				paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
			}
		});

		// Resize scrollable table when sidebar width changes
		$('.sidebar-control').on('click', function () {
			table.columns.adjust().draw();
		});
	};

	// Select2 for length menu styling
	var _componentSelect2 = function () {
		if (!$().select2) {
			console.warn('Warning - select2.min.js is not loaded.');
			return;
		}

		// Initialize
		$('.dataTables_length select').select2({
			minimumResultsForSearch: Infinity,
			dropdownAutoWidth: true,
			width: 'auto'
		});
	};


	//
	// Return objects assigned to module
	//

	return {
		init: function () {
			_componentDatatableBasic();
			_componentSelect2();
		}
	}
}();


// Initialize module
// ------------------------------
angular.element(document).ready(function () {
	DatatableBasic.init();
});
