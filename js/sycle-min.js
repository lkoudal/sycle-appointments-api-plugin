jQuery(document).ready(function($){function e(){for(var e=n.getPlace(),t=0;t<e.address_components.length;t++){var a=e.address_components[t].types[0];if(o[a]){var c=e.address_components[t][o[a]];console.log(a+" "+c),document.getElementById(a).value=c}}}function t(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){var t={lat:e.coords.latitude,lng:e.coords.longitude},a=new google.maps.Circle({center:t,radius:e.coords.accuracy});n.setBounds(a.getBounds())})}console.log("[Sycle] JS loaded"),$(".sycleapi").on("change",".sycle_apttype",function(e){var t=$("option:selected",this),a=t.attr("data-length"),n=t.attr("data-name");$(e.target).parent().find(".sycle_aptname").val(n),$(e.target).parent().find(".sycle_aptlength").val(a)}),$(".sycleapi").on("change",".sycle-booking .sycle_booking_date",function(e){var t=$(this).datepicker("getDate"),a=$.datepicker.formatDate("yy-mm-dd",t),n=$(this).parents().find("[name='sycle_aptlength']").val(),o=$(this).parents().find("[name='sycle_booking_token']").val(),c=$(this).parents().find("[name='sycle_clinic_id']").val(),s=$(this).parents().find("[name='sycle_apttype']").val(),l=$(this).parents().find("[name='sycle_aptname']").val()}),jQuery(".sycle-booking").length&&(sycle_ajax_object.hasOwnProperty("sycle_nonce")||sycle_ajax_object.hasOwnProperty("ajax_url"))&&($(".sycle-booking").validate(),$(".sycle-booking .sycle_booking_date").datepicker({minDate:new Date,onSelect:function(e,t){e!==t.lastVal&&$(this).change()}})),jQuery(".sycleclinicslist").length&&(sycle_ajax_object.hasOwnProperty("sycle_nonce")||sycle_ajax_object.hasOwnProperty("ajax_url"))&&$(".sycleclinicslist").each(function(e,t){jQuery.ajax({url:sycle_ajax_object.ajax_url,type:"post",data:{action:"sycle_get_clinics_list",_ajax_nonce:sycle_ajax_object.sycle_nonce},success:function(e){var a=$.parseJSON(e);$.each(a.clinic_details,function(e,a){$(t).find(".clinicslist").append("<li>"+a+"</li>").hide().fadeIn(350)})},error:function(e){console.log("Error:"),console.log(e)}})}),jQuery(".sycleautocomplete").length&&$(".sycleautocomplete").on("click",function(e){e.preventDefault(),n=new google.maps.places.Autocomplete(document.getElementById("sycleautocomplete"),{types:["geocode"]}),n.addListener("place_changed",function(){var t=n.getPlace(),a=n.getPlace().address_components,o={},s=[c.streetNumber,c.streetName,c.zipCode,c.stateName],l=[];a.forEach(function(e){s.forEach(function(t){e.types[0]===t.type&&l.push(e[t.display])})}),jQuery.ajax({url:sycle_ajax_object.ajax_url,type:"post",data:{action:"sycle_get_search_results",_ajax_nonce:sycle_ajax_object.sycle_nonce,addressfield:a},success:function(t){var a=$.parseJSON(t);$(e.target).closest(".sycleapi").find(".clinicslist").empty(),$.each(a.clinic_details,function(t,a){$(e.target).closest(".sycleapi").find(".clinicslist").append('<li class="clinic">'+a+"</li>").hide().fadeIn(350)})},error:function(e){console.log("Error:"),console.log(e)}})})});var a,n,o={street_number:"short_name",route:"long_name",locality:"long_name",administrative_area_level_1:"short_name",country:"long_name",postal_code:"short_name"},c={streetNumber:{display:"short_name",type:"street_number"},streetName:{display:"long_name",type:"route"},cityName:{display:"long_name",type:"locality"},stateName:{display:"short_name",type:"administrative_area_level_1"},zipCode:{display:"short_name",type:"postal_code"}}});