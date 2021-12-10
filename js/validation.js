// JavaScript Document
$().ready(function(){
    defaults._locale = 'vi';
    
    $('.only_number').on('keydown', function(event) {
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 187 ||
            (event.keyCode == 65 && event.ctrlKey === true) ||
            (event.keyCode >= 35 && event.keyCode <= 39)) {return;}
        else {
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {event.preventDefault();}
        }
    });

    $('.js_submit').click(function(e){
     //e.preventDefault();
        if (check_form(this)){	
		return true;		
		}		
        return false;
    });
    
    $('input[name=Name]').on('touchend, click', function () {
        if (name_hint != '') {
            show_form_hint(this, name_hint);
            return false;
        }
    });

    $('input[name=Phone]').on('touchend, click', function () {
        if (phone_hint != '') {
            show_form_hint(this, phone_hint);
            return false;
        }
    });

    $("body").on('touchend, click', function(){
        $(".js_errorMessage").remove();
    });

    function getQueryVariable(variable){
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
          return decodeURIComponent(pair[1]) || "";
        }
      }
      return(false);
    }

    function check_form(target) {
        $('.js_errorMessage').remove();

        var form = $(target).parents('form').first();
        var formInputs = {
            fio: form.find('[name="Name"]'),
            phone: form.find('[name="Phone"]')
        };
        var postParams = {
            name: formInputs.fio.val(),
            phone: formInputs.phone.val()
        };

        var rename = /^[\D+ ]*$/i,
            rephone = /^[0-9\-\+\(\) ]*$/i;
      
        if(!postParams.phone || !postParams.phone.length){
            show_form_hint(formInputs.phone, defaults.locale[defaults._locale].set_phone);
            return false;
        }

        if(!postParams.name.length){
            show_form_hint(formInputs.fio, defaults.locale[defaults._locale].set_fio);
            return false;
        }

        if(!postParams.name.length || !rename.test(postParams.name)){
            show_form_hint(formInputs.fio, defaults.locale[defaults._locale].error_fio);
            return false;
        }

        if(phone_config.locale[defaults._locale] !== undefined) {
            if(phone_config.locale[defaults._locale].numbers_min && postParams.phone.length < phone_config.locale[defaults._locale].numbers_min){
                show_form_hint(formInputs.phone, defaults.locale[defaults._locale].error_phone);
                return false;
            }

            if(phone_config.locale[defaults._locale].numbers_max && postParams.phone.length > phone_config.locale[defaults._locale].numbers_max){
                show_form_hint(formInputs.phone, defaults.locale[defaults._locale].error_phone);
                return false;
            }
        } else {
            if(!rephone.test(postParams.phone) || postParams.phone.length < 8){
                show_form_hint(formInputs.phone, defaults.locale[defaults._locale].error_phone);
                return false;
            }
        }
        return true;  
    } 

    function show_form_hint(elem, msg) {
      $(".js_errorMessage").remove();
      $('<div class="js_errorMessage">' + msg + '</div>').appendTo('body').css({
        'left': $(elem).offset().left,
        'top': $(elem).offset().top - 30,
        'background-color':'#e74c3c',
        'border': '1px dashed black',
        'border-radius': '5px',
        'color': '#fff',
        'font-family': 'Arial',
        'font-size': '14px',
        'margin': '3px 0 0 0px',
        'padding': '6px 5px 5px',
        'position': 'absolute',
        'z-index': '9999'
      });
      $(elem).focus();
    };
});

var phone_config = {
    locale: {
        vi:{
            cod: '',
            numbers_min: 8,
            numbers_max: 14,
            primer: ''
        }
    }
}; 

var defaults = {
    locale: {
            en: {
                set_fio: "Name is a required field",
                error_fio: "Name field is entered incorrectly",
                set_phone: "Phone number is a required field",
                error_phone: "The phone number is entered incorrectly",
                exit_text: "You really want to close tab?"
            },
            vi: {
                set_fio: "Bạn chưa điền họ tên",
                error_fio: "Tên không hợp lệ",
                set_phone: "Bạn chưa điền số điện thoại",
                error_phone: "Số điện thoại không hợp lệ",
                exit_text: "Bạn có chắc muốn rời đi không? Chỉ còn còn một bước đặt hàng nữa thôi!"
            }
        }
};

function cancelEvent(e){
    try {
        if (e) {
            e.returnValue = defaults.locale[defaults._locale].exit_text;
            e.cancelBubble = true;
            if (e.stopPropagation)
                e.stopPropagation();
            if (e.preventDefault)
                e.preventDefault();
        }
    } catch (err) {}
    return defaults.locale[defaults._locale].exit_text;
}


  