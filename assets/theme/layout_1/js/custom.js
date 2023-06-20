$(document).ready(function () {
	
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	try {
		// Single picker
		$('.daterange-single').daterangepicker({
			singleDatePicker: true,
			locale: {
				format: 'DD-MMM-YYYY'
			}
		});
	}
	catch (e) {
		console.log(e);
	}

	try {
		jQuery.timeago.settings.allowFuture = true;
		jQuery(".timeago").timeago();
	}
	catch (e) {
		console.log(e);
	}

	try {
		$(".uniformstyled").uniform();
	}
	catch (e) {
		console.log(e);
	}

	try {
		$('.kv-fileinput-caption').removeClass('icon-visible');
	}
	catch (e) {
		console.log(e);
	}

	_componentSweetAlert();

});

var _componentSwitchery = function() {
	if (typeof Switchery == 'undefined') {
		console.warn('Warning - switchery.min.js is not loaded.');
		return;
	}

	// Initialize multiple switches
	var elems = Array.prototype.slice.call(document.querySelectorAll('.form-check-input-switchery'));
	elems.forEach(function(html) {
	var switchery = new Switchery(html);
	});

	// Colored switches
	var elems = Array.prototype.slice.call(document.querySelectorAll('.form-check-input-switchery-primary'));
	elems.forEach(function(primary) {
		var switchery = new Switchery(primary, { color: '#2196F3' });
	});

	var elems = Array.prototype.slice.call(document.querySelectorAll('.form-check-input-switchery-danger'));
	elems.forEach(function(danger) {
		var switchery = new Switchery(danger, { color: '#EF5350' });
	});

	var elems = Array.prototype.slice.call(document.querySelectorAll('.form-check-input-switchery-warning'));
	elems.forEach(function(warning) {
		var switchery = new Switchery(warning, { color: '#FF7043' });
	});

	var elems = Array.prototype.slice.call(document.querySelectorAll('.form-check-input-switchery-info'));
	elems.forEach(function(info) {
		var switchery = new Switchery(info, { color: '#00BCD4' });
	});

};


//var swalInit = undefined;

// Sweet Alerts
var _componentSweetAlert = function () {
	if (typeof swal == 'undefined') {
		console.warn('Warning - sweet_alert.min.js is not loaded.');
		return;
	}

	// Defaults
	swalInit = swal.mixin({
		buttonsStyling: false,
		confirmButtonClass: 'btn btn-primary',
		cancelButtonClass: 'btn btn-light'
	});
};


var _componentSelect2 = function() {

	if (!$().select2) {
		console.warn('Warning - select2.min.js is not loaded.');
		return;
	}


	// Default initialization
	$('.select').select2({
		minimumResultsForSearch: Infinity
	});

	// Select with search
	$('.select-search').select2({
		minimumInputLength: 2,
		minimumResultsForSearch: Infinity
	});
};

function appAlert(title, errors, type) {
	conf = {};

	conf.type = type;

	if (title) {
		if (title instanceof Array) {
			var output = '';
			$.each(title, function (index, value) {
				output += '<div>' + value + '</div>';
			});
		}
		else {
			conf.title = title;
		}
	}
	else {
		conf.title = '';
	}


	if (errors) {
		if (errors instanceof Array) {
			conf.text = '';
			$.each(errors, function (index, value) {
				conf.text += '<div>' + value + '</div>';
			});
		}
		else {
			conf.text = errors;
		}
	}

	/*
	conf.html = true;
	if(type == 'error')
		conf.confirmButtonColor = '#EF5350';
	else if(type == 'info')
		conf.confirmButtonColor = '#2196F3';
	else 
		conf.confirmButtonColor = '#66BB6A';
	*/
	swalInit.fire(conf);
}