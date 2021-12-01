
$(document).ready(function() {

  (function($) {
    $(".image-box").click(function(event) {
      var previewImg = $(this).children("img");

      $(this)
        .siblings()
        .children("input")
        .trigger("click");

      $(this)
        .siblings()
        .children("input")
        .change(function() {
          var reader = new FileReader();

          reader.onload = function(e) {
            var urll = e.target.result;
            $(previewImg).attr("src", urll);
            previewImg.parent().css("background", "transparent");
            previewImg.show();
            previewImg.siblings("p").hide();
          };
          reader.readAsDataURL(this.files[0]);
        });
    });

  })(jQuery);

  
    


  
  (function($) {
    $(document.body).on('change', '.selectpickeraddclass', function() {
      var valoption = $('.selectpickeraddclass').selectpicker('val');
      // alert(valoption);
      if(valoption = 1){
        $(".show-text1").addClass('show-select');
        // alert(valoption);
      }
      else{
        $("show-text1").removeClass('show-select');
        // alert(valoption);
      }
    });
   })(jQuery);

   $(".checkall label input").click(function () {
    if ($(this).is(":checked")){
      var isAllChecked = 0;
      $(".checkall label input").each(function(){
        if(!this.checked)
           isAllChecked = 1;
      })              
      if(isAllChecked == 0){ 
        $(".checkall input#all").prop("checked", true); 
        $.uniform.update('.checkall input#all');
      }     
    }else {
      $(".checkall input#all").prop("checked", false);
      $.uniform.update('.checkall input#all');
    }
  });


   var status = $('.checkall input#all').is(':checked');
   if(status == true){
    $('.checkall label input').attr('checked', status);
    $.uniform.update('.checkall label input');
   }
   else{
    
   }
   
   $('.checkall input#all').bind('click', function(){
      var status = $(this).is(':checked');
      $('.checkall label input').attr('checked', status);
      $.uniform.update('.checkall label input');
    });

   //paditech
   $('#element_avia_2_1').on('click', function(){
    
      var status = $(this).is(':checked');
      var status2 = $('#element_avia_3_1').is(':checked');
      if(status2 == true){ 
        alert(1);
        $(this).prop('checked', false);
      } 
      else{
        alert(2);
        
        $(this).prop('checked', true);
      }
      // $('.checkall label input').attr('checked', status);
    });

   $('#popupGiveRetrieveHelloCoin').bind('click', function(){
      var status = $(this).is(':checked');
      $('.checkall label input').attr('checked', status);
      $.uniform.update('.checkall label input');
    });

   //tooltip
   $(function () {
      $('[data-toggle="tooltip"]').tooltip({html:true})
    })

  $('#checked-push input').change(function () {
    if ($(this).is(":checked")) {
        $("#checked-push").addClass('active');
        $("#tab-none").addClass('active');
    }
    else {
        $("#checked-push").removeClass('active');
        $("#tab-none").removeClass('active');
    };
  });
  

});

$(document.body).on('click', '.item-button .btn' , function(){
  if($(this).hasClass('green')){
      $(this).removeClass('green');
      $(this).siblings().addClass('green');
  }
  else {
      $(this).addClass('green');
      $(this).siblings().removeClass('green');
      }
  });

// jquery coupon popup
$(document.body).on('click', '#send_coupon' , function(){
  var couponnumber   = $(".coupon-number").text();
  var couponnote  = $(".coupon-note").text();
  $("#coupon-number").val(couponnumber);
  $("#popup-coupon-note").text(couponnote);
});


$(document).ready(function() {
  (function($)
 {
    if (!$('.st-file-doc-upload').length) return;
    $('.st-file-doc-upload').each(function() {
      var fileUploadWrapper = $(this);
      var inputFile = fileUploadWrapper.find('.input-file');
      var showFileInfo = fileUploadWrapper.find('.show-file-info');
      inputFile.on('change', function() {
        var thisInputFile = $(this);
        var file = thisInputFile[0].files[0];
        var fileName = file.name;
        var fileSize = file.size;
        var fileExtension = fileName.split('.').pop().toLowerCase();
        var listExtensionArray = ['pdf'];
        var inArrayExtension = $.inArray(fileExtension, listExtensionArray);
        if(inArrayExtension >= 0){
            showFileInfo.empty().text(fileName);
        }else{
          alert('ファイル形式が正しくありません, pdf');
        }
      });
    });
  })(jQuery);
});
(function($){
    if (!$('.st-file-upload').length) return;
    $('.st-file-upload').each(function() {
      var fileUploadWrapper = $(this);
      var inputFile = fileUploadWrapper.find('.input-file');
      var showFileInfo = fileUploadWrapper.find('.show-file-info');

      inputFile.on('change', function() {
        var thisInputFile = $(this);
        var file = thisInputFile[0].files[0];
        var fileName = file.name;
        var fileSize = file.size;
        var fileExtension = fileName.split('.').pop().toLowerCase();
        var listExtensionArray = ['jpg', 'gif', 'png'];
        var inArrayExtension = $.inArray(fileExtension, listExtensionArray);
        if(inArrayExtension >= 0){
            showFileInfo.empty().text(fileName);
        }else{
          alert('ファイル形式が正しくありません, jpg,gif,png');
        }
        
      });
    });
  })(jQuery);
