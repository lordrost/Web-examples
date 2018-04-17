function buyAirTime () {
	//Get phone number
	var number = $('#phone').val().replace(/\D/g,'');
	location.href = 'buy-airtime?' + number;
}

function cashCard () {
	//Get phone number
	var number = $('#cash-card').val().replace(/\D/g,'');
	location.href = 'add-cash-card?' + number;
}

function homeButtons(id) {
	$('.home-about-content').hide();
	var el = $(id);
	el.show("fast");
}

function signUp() {
	var container = $('body');
	container.animate({
		scrollTop: $('#sign-up').offset().top - 66
	});
}

function jumpToZip() {
	var container = $('body');
	container.animate({
		//scrollTop: $('#zip-input').offset().top - 66
		scrollTop: 0
	});
}

function InputZip(){
	if( screen.width <= 767 ) {
			// is mobile..


	$('.inputphonenumber.mobile').css('bottom','255px');
	 $("#phone").focus();

			 $("input").blur(function() {
				$('.inputphonenumber.mobile').css('bottom','0px');
		});
}
else {
window.location = "/#zip-input";
}
}

function ZipFunction(input) {

var zip = document.getElementById(input);
var url = "/api/zip?" + zip.value;

if (zip.value.length > 4) {

	document.activeElement.blur();

$.getJSON(url, function(state){
	if (state != "false") {
		location.href = "/" + state;
	} else {
	$('#zip_modal').modal('show');
	zip.value="";
	}
});

}
}

function isNumberKey(evt){
var charCode = (evt.which) ? evt.which : event.keyCode
if (charCode > 31 && (charCode < 48 || charCode > 57))
	return false;
return true;
}

(function() {
// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
if (!String.prototype.trim) {
(function() {
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
String.prototype.trim = function() {
return this.replace(rtrim, '');
};
})();
}

[].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
 // in case the input is already filled..
 if( inputEl.value.trim() !== '' ) {
 classie.add( inputEl.parentNode, 'input--filled' );
 }

 // events:
 inputEl.addEventListener( 'focus', onInputFocus );
 inputEl.addEventListener( 'blur', onInputBlur );
 } );

function onInputFocus( ev ) {
 classie.add( ev.target.parentNode, 'input--filled' );
}

function onInputBlur( ev ) {
 if( ev.target.value.trim() === '' ) {
 classie.remove( ev.target.parentNode, 'input--filled' );
 }
}
})();
