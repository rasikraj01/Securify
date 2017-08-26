var x = mydata.data[0];
console.log(x[10]);

  function showinrange(a,b) {
         //console.log("in range");
         i=0;
         ctr=0;
         for(i=0;i<100;i++) {
            var x = mydata.data[i];
            dist = getDistanceFromLatLonInKm(a,b,x[22],x[23]);
            if(dist<5)
               {
                   console.log(x[10]);
                   ctr=1;
               }
        }
         if(ctr==0)
                 console.log("none");
}

var targetLL;
      var map;
      var loc;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 0, lng: 0},
          zoom: 8,
          disableDefaultUI: true
        });
        chicago = {lat: 41.850, lng: -87.650};
        map.setZoom(4);
        map.panTo(chicago);
        setTimeout("map.setZoom(6)", 2000);

         map.addListener('click', function(e) {
          map.panTo(e.latLng);
          targetLL = e.latLng;
         console.log(targetLL.lat());
        showinrange(targetLL.lat() , targetLL.lng());


        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': targetLL}, function(results, status){
          if (status === 'OK') {
          if (results[0]) {
            loc = results[0].formatted_address;
            console.log(loc + "locatop");
              $.get("http://webhose.io/filterWebContent?token=05e31117-ac3c-4128-800f-79b98b58af9f&format=json&sort=crawled&q=%22chicago%22(title%3A'murder')%20language%3Aenglish%20site_type%3Anews" , function(data) {
                  console.log("found " + data.posts.length + " rows");
              });
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }

     });
         });
      }

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
   var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2-lat1);  // deg2rad below
   var dLon = deg2rad(lon2-lon1);
   var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   var d = R * c; // Distance in km
   return d;
 }

    function deg2rad(deg) {
  return deg * (Math.PI/180);
}

/* On Scroll */
           $(window).scroll(function() {
               $('.hideme').each(function() {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it in */
        if( bottom_of_window > bottom_of_object ){

            $(this).animate({'opacity':'1'},500);

        }
               })
           });
           


         //   $(document).ready(function() {
           //
         //      setTimeout(function(){
         //         $('body').addClass('loaded');
         //         $('h1').css('color','#222222');
         //      }, 3000);
           //
         //   });

          
          