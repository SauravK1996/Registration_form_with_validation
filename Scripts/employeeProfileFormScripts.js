$(document).ready(function(){
    $(".error").hide();
    var newPhoneId = 1;
    var $regexname = /^([a-zA-Z\s]{3,16})$/;
    var $regexemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    var $regexaadhar = /^([0-9]{12})$/; 
    var $regexpannumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
    var $regexphone = /^[6-7-8-9]+[0-9]{9}/g;
    var $regexAddress = /^(?!\s*$).+/;
    var addAddressField = $(".address-clone").clone().html()+'<button type="button" class="remove-address-button">Remove</button>';
    var addPhoneField = $(".phone-number-clone").clone().html()+'<div class="remove-btn"><button type="button" class="remove-phone-button">Remove</button></div>';
    var captchaAnswer = 0;
    
    var countries = {
        India:["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"],
        Pakistan:["Balochistan", "North-West Frontier Province", "Punjab", "Sindh", "Islamabad Capital Territory", "Federally Administered Tribal Areas"],
        China:["Anhui", "Fujian", "Gansu", "Guangdong", "Guizhou", "Hainan", "Hebei", "Heilongjiang", "Henan", "Hubei", "Hunan", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Qinghai", "Shaanxi", "Shandong", "Shanxi", "Sichuan", "Yunnan", "Zhejiang", "Guangxi", "Nei Mongol", "Ningxia", "Xinjiang", "Xizang (Tibet)", "Beijing", "Chongqing", "Shanghai", "Tianjin"],
        Nepal:["Bagmati", "Bheri", "Dhawalagiri", "Gandaki", "Janakpur", "Karnali", "Kosi", "Lumbini", "Mahakali", "Mechi", "Narayani", "Rapti", "Sagarmatha", "Seti"],
        Bhutan:["Bumthang", "Chukha", "Dagana", "Gasa", "Haa", "Lhuntse", "Mongar", "Paro", "Pemagatshel", "Punakha", "Samdrup Jongkhar", "Samtse", "Sarpang", "Thimphu", "Trashigang", "Trashiyangste", "Trongsa", "Tsirang", "Wangdue Phodrang", "Zhemgang"],
        SriLanka:["Central", "North Central", "North Eastern", "North Western", "Sabaragamuwa", "Southern", "Uva", "Western"],
        Japan:["Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu", "Gumma", "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa", "Kagoshima", "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano", "Nagasaki", "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokushima", "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yamanashi"],
        Afghanistan:["Badakhshan", "Badghis", "Baghlan", "Balkh", "Bamian", "Daykondi", "Farah", "Faryab", "Ghazni", "Ghowr", "Helmand", "Herat", "Jowzjan", "Kabul", "Kandahar", "Kapisa", "Khost", "Konar", "Kondoz", "Laghman", "Lowgar", "Nangarhar", "Nimruz", "Nurestan", "Oruzgan", "Paktia", "Paktika", "Panjshir", "Parvan", "Samangan", "Sar-e Pol", "Takhar", "Vardak", "Zabol"]
    }

    function fillCountry(id){
        $.each(countries,function(index,value){
            $(id).append('<option value='+index+'>'+index+'</option>');
        });

    }
    fillCountry(".currentCountry");
    
    $('#addressField').on('change',".currentCountry",function(event){  
        var country = $(this).val();
        
        if(country.length === 0){
            $(this).parents('.addressInputs').find('.currentState').append("<option>--select country first--</option>");
        }else{ 
            
            $(this).parents('.addressInputs').find('.currentState').empty();
    
            var len = countries[country].length;
            for(var i=0;i<len;i++) {
                $(this).parents('.addressInputs').find('.currentState').append("<option value="+countries[country][i]+">"+ countries[country][i] +"</option>");
            }
        }
    });
    
    //dynamically adding address field
    $("#addressField").on("click",".add-address-button",function(){
        
        $('#addressField').append('<div class="row addressInputs removable-address-field">'+addAddressField+'</div>');
        fillCountry(".currentCountry");
    })

    //dynamically removing address field
    $("#addressField").on("click",".remove-address-button",function(){
        $(this).parents(".removable-address-field").remove(); 
    })

    //dynamically adding phone numbers
    
    $("#phoneNumberField").on("click",".add-phone-button",function(){
        $('#phoneNumberField').append('<div class="row removable-phone-field">'+addPhoneField+'</div>');
    })
    
    
    //dynamically removing phone numbers
    $("#phoneNumberField").on("click",".remove-phone-button",function(){ 
        $(this).parents(".removable-phone-field").remove(); 
    }); 


    
// refresh captcha
$("#refreshCaptcha").click(function(){
    $('.captchaError').hide();
    captchaCode();
    return false;
});


function captchaCode(){
    $("#answer").val('');
    $("canvas").remove("#canvasId");

    var x = Math.floor(Math.random() * 90) + 10;
    var y = Math.floor(Math.random() * 90) + 10;

    var operatorArray = ["+","-","*","/"];

    var rand = Math.floor(Math.random()*4);
    var operator = operatorArray[rand];

    switch(operator){
        case "+": captchaAnswer = x + y; break;
        case "-": captchaAnswer = x - y; break;
        case "*": captchaAnswer = x * y; break;
        case "/": captchaAnswer = Math.floor(x / y); break;
    }

    var question = x + "" + operator + "" + y;
    var newCanvas = $('<canvas/>',{'width':200,'height':90,id:'canvasId'});

    $("#answer").before(newCanvas);  

    if(x < y){
        captchaCode();
    }else{
        draw();
    }
    
    function draw() { 
        var canvas = document.getElementById("canvasId");
        if (canvas.getContext) {
            var context = canvas.getContext("2d");
            context.font = "bold 35pt Georgia";
            var gradient = context.createLinearGradient(120, 120, 200, 100);
            gradient.addColorStop("0.5", "magenta");
            gradient.addColorStop("1.0", "blue");
            gradient.addColorStop("1.0", "red");
            context.strokeStyle = gradient;
            context.strokeText(question, 130, 140);
        }
    }
}
captchaCode();

    
    //drag and drop event for profile  image
    $('#profileImage').addClass('dragging').removeClass('dragging');

    $('#profileImage').on('dragover', function() {
        $('#profileImage').addClass('dragging');
    }).on('dragleave', function() {
        $('#profileImage').removeClass('dragging');
    }).on('drop', function(e) {
        $('#profileImage').removeClass('dragging hasImage');
    
        if (e.originalEvent) {
            var file = e.originalEvent.dataTransfer.files[0];

            if(isFileImage(file)){
                var reader = new FileReader();
                reader.readAsDataURL(file);
                
                reader.onload = function(e) {
                    $('#profileImage').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
                    $('#employeeProfileImage').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
                };
            }else{
                resetImage();
                alert("Please insert an image file.")
            }
        }
    });

    $('#profileImage').on('click', function(e) {
        $('#imageInputFile').click();
    });

    window.addEventListener("dragover", function(e) {
        e = e || event;
        e.preventDefault();
    }, false);
    window.addEventListener("drop", function(e) {
        e = e || event;
        e.preventDefault();
    }, false);
    
    function isFileImage(file) {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
     
        return file && acceptedImageTypes.includes(file['type'])
    }

    function resetImage(){
        $('#profileImage').css('background-image','none').replaceWith('<div id="profileImage"><div class="drag-drop"></div><label class="image-label">Click to browse or drag an image here</label></div></div>');
        $('#profileImage').on('click', function(e) {
            $('#imageInputFile').click();
        });
    }

    $('#imageInputFile').change(function(e) {
        var input = e.target;
        if (input.files && input.files[0]) {
            var file = input.files[0];
           
            if(isFileImage(file)){
                var reader = new FileReader();
                reader.readAsDataURL(file);
                
                reader.onload = function(e) {
                    $('#profileImage').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
                    $('#employeeProfileImage').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
                };
            }else{
                resetImage();
                alert("Please insert an image file.");
            }
            
        }
    });
    
    
    //reset all the input fields
    $("body").on("click",".reset",function(){    
        $('input:not(:radio),textarea').val('');
        $('#male')[0].checked = false; 
        $('#female')[0].checked = false; 
        $('#others')[0].checked = false;
        $('.currentCountry').prop('selectedIndex',0); 
        $('.currentState').empty().append("<option>--select country first--</option>"); 
        $('.error').hide();
        resetImage();
        $(".removable-phone-field").remove();
        $('.removable-address-field').remove();
        $(".delete-alternate-phone-number").remove(); 
        captchaCode();
        return false;
    });


    
    $('#employee-details').hide();
    $('#employee-profile-form').show();
    
    $("body").on("focus","input,select,textarea",function(){  
        $(this).css("background-color", "azure");
    });
    
    $("body").on("blur","input,select,textarea",function(){  
        $(this).css("background-color", "#f0f0f0");
    });

    function checkProfileImage(userInput){
        if(userInput === 'none'){
            $('.profilePhotoError').show();
        }else{
            $('.profilePhotoError').hide();
        }
    }
    function checkName(userInput){
        if(userInput.val().trim() === ""){
            userInput.next().show();
            return true;
        }else if(!userInput.val().match($regexname)){
                userInput.next().show();
            }else{
                userInput.next().hide();
        } 
        
           
    };
    
    function checkGender(){
       
        if (!($("input[name='gender']:checked").val())){
            $('.genderError').show();
            return true;
        }else{
            $('.genderError').hide();
           
        }  
    };
    
    function checkEmail(userInput){
        if (!$(userInput).val().match($regexemail)) {
            $('.emailError').show();
            return true;
        }else{
            $('.emailError').hide();
           
        } 
    };
    function checkAadhar(userInput){
        if (!$(userInput).val().match($regexaadhar)) {
             $('.aadharNumberError').show();
             return true;
         }else{
             $('.aadharNumberError').hide();
             
         }
     };
     function checkPhone(userInput){
        if(!$(userInput).val().match($regexphone)) {
            userInput.next().show();
            return true;
        }else{
            userInput.next().hide();
           
        }
     };
     function checkCaptchaValue(userInput){
        if(userInput.val() === "" || parseInt(userInput.val()) !== captchaAnswer){
            $('.captchaError').show();
            return true;
        }else{
            $('.captchaError').hide();
           
        }
     };
     function checkPanNumber(userInput){
        $(userInput).val($(userInput).val().toUpperCase());
        if (!$(userInput).val().match($regexpannumber)) {
            $('.panNumberError').show();
            return true;
        }else{
            $('.panNumberError').hide();
           
        }
     };
     function checkAddress(userInput){
        if (!userInput.val().match($regexAddress)){
            userInput.next().show();
            return true;
        }else{
            userInput.next().hide();
           
        }    
     };
      
     $(".container").on("blur keydown",".check",function(){
        checkName($(this));
    });
    
    $(".middleName").on('keypress blur',function(){
        if ($(this).val() !== "") {
            if(!$(this).val().match($regexname)){
                $('.middleNameError').show();
            }else{
                $('.middleNameError').hide();
            }
        }else{
            $('.middleNameError').hide();
        }
    });
    $(".container").on("blur",".gender",function(){
        checkGender($(this));
    });

    $(".container").on("blur keypress",".email",function(){
        checkEmail($(this));
    }); 

    $(".container").on("blur keypress keyup",".aadhar, .phone,.answer",function(event){
        var unicode=event.charCode? event.charCode : event.keyCode;
        
        if(unicode!=8 && unicode<48||unicode>57){
            return false;
        }else if($(this).hasClass('phone')){
            checkPhone($(this));
        }else if($(this).hasClass('aadhar')){
            checkAadhar($(this));
        }else if($(this).hasClass('answer')){
            checkCaptchaValue($(this));
        } 
    });
    
    $(".container").on("blur keypress keyup",".phone",function(event){
        var unicode=event.charCode? event.charCode : event.keyCode;
        
        if(unicode!=8 && unicode<48||unicode>57){
            return false;
        }else{
            checkPhone($(this));
        } 
    });
    
    $(".container").on("blur keypress",".pan-number",function(){
        checkPanNumber($(this));
    });

    $(".container").on("blur keypress",".checkAddress",function(){
        checkAddress($(this));
    });
   
   

    
    //validation on the click of register button
    $('body').on('click',".register",function(){
        var fnameError = checkProfileImage($('#profileImage').css('background-image'));
        var fnameError = checkName($(".firstName"));
        var mnameError = checkName($(".middleName"));
        var lnameError = checkName($(".lastName"));
        var genderError = checkGender($(".gender"));
        var emailError = checkEmail($(".email"));
        var aadharError = checkAadhar($(".aadhar"));
        var panNumberError = checkPanNumber($(".pan-number"));
        var phoneError = checkPhone($(".phone"));
        var currentAddressError = checkAddress($(".currentAddress"));
        var currentCountryError = checkAddress($(".currentCountry"));
        var currentStateError = checkAddress($(".currentState"));
        var currentCityError = checkAddress($(".currentCity"));
        var currentZipCodeError = checkAddress($(".currentZipCode"));
        var captchaError = checkCaptchaValue($(".answer"));

        
        if((fnameError || mnameError || lnameError || genderError  || emailError || aadharError || 
            panNumberError || phoneError ||currentAddressError ||currentCountryError ||
            currentStateError || currentCityError || currentZipCodeError ||captchaError)=== true) {
            captchaCode();
            return false;
         } else {
            alert("data saved successfully.");
           
            $.each($('.phone-number-input'),function(key,value){
                var currentPhone = $(value).find('.phone').val();
                var employeeAlternatePhoneNumber = '<div class="row">'+
                                                        '<div class="col-left">'+
                                                            '<label for="employeePhone">Phone</label>'+
                                                        '</div>'+
                                                        '<div class="phone-number-input">'+
                                                            '<input type="text" value="'+currentPhone+'">'+
                                                        '</div>'+
                                                    '</div>';
                $('#employeePhoneNumberField').last().append(employeeAlternatePhoneNumber);
            });

            $.each($('.addressInputs'),function(key,value){
                var currentAddress = $(value).find('.currentAddress').val();
                var currentCountry =$(value).find('.currentCountry').val();
                var currentState =$(value).find('.currentState').val();
                var currentCity =$(value).find('.currentCity').val();
                var currentZipCode =$(value).find('.currentZipCode').val();

                var employeeAlternateaddresss = '<div class="row">'+
                                                    '<div class="row">'+
                                                        '<div class="col-left">'+
                                                            '<label for="employeePresentAddress">Address</label>'+
                                                        '</div>'+
                                                    '<div class="col-right">'+
                                                        '<textarea  row="3" cols="50" >'+currentAddress+'</textarea>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="row">'+
                                                    '<div class="col-left">'+
                                                        '<label for="employeePresentCountry">Country</label>'+
                                                    '</div>'+
                                                    '<div class="col-right">'+
                                                        '<input type="text" value="'+currentCountry+'"  >'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="row">'+
                                                    '<div class="col-left">'+
                                                        '<label for="employeePresentState">State</label>'+
                                                    '</div>'+
                                                    '<div class="col-right">'+
                                                        '<input type="text" value="'+currentState+'"  >'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="row">'+
                                                   '<div class="col-left">'+
                                                        '<label for="employeePresentCity">City</label>'+
                                                    '</div>'+
                                                    '<div class="col-right address-input">'+
                                                        '<input type="text" value="'+currentCity+'" />'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="row">'+
                                            '<div class="col-left">'+
                                            '<label for="employeePresentZipCode">Zip Code</span></label>'+
                                            '</div>'+
                                            '<div class="col-right address-input">'+
                                                '<input type="text" value="'+currentZipCode+'" />'+
                                                
                                            '</div>'+
                                            '</div>'+
                                            '</div>';


                $('#emloyeeAddressField').last().append(employeeAlternateaddresss);
            });

            $('#employeeFirstName').val($(".firstName").val());
            $('#employeeMiddleName').val($(".middleName").val());
            $('#employeeLastName').val($(".lastName").val());
            $('#employeeGender').val($(".gender").val());
            $('#employeeEmail').val($(".email").val());
            $('#employeeAadhar').val($(".aadhar").val());
            $('#employeePanNumber').val($(".pan-number").val());
            
            $('.register-reset-button').hide();
            $('input,textarea').css('border-top-style','hidden')
                               .css('border-right-style','hidden')
                               .css('border-left-style','hidden')
                               .css('border-bottom-style','hidden')
                               .css('padding','12px')
                               .css('margin','0')
                               .css('background','none')
                               .css('color','white')
                               .css('box-shadow','0px 0px 0px 0px');
            $('label').css('color','black');
            $('.information-label > label > h2').css('color','blue');
            $('input,textarea').prop( "disabled", true);
            $('#employee-profile-form').hide();
            $('#employee-details').show();
     
         }
        

    });
    
});