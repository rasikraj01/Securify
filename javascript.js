var x = mydata.data[0];
var counter = new Array(7);
for(i=0;i<7;i++)
     counter[i] = 0;

console.log(x[10]);

  function showinrange(a,b) {
         //console.log("in range");

         cr1=0;cr2=0;cr3=0;cr4=0;cr5=0;
         i=0;
         ctr=0;
         for(i=0;i<1000;i++) {
            var x = mydata.data[i];
            dist = getDistanceFromLatLonInKm(a,b,x[22],x[23]);
            if(dist<5)
               {
                   console.log(x[10]);
                   ctr=1;
               }
             if(x[12] == "THEFT")
                 cr1++;
             if(x[12] == "DECEPTIVE PRACTICE")
                 cr2++;
             if(x[12] == "BURGLARY")
                 cr3++;
             if(x[12] == "CRIMINAL TRESPASS")
                 cr4++;
             if(x[12] == "ASSAULT")
                 cr5++;
            str = x[9];
             strr = str[5]+str[6];
             str_int = parseInt(strr);
             console.log(str,strr,str_int);
             if(str_int%2==0)
                 {
                     counter[(str_int)/2]++;
                 }

        }
         if(ctr==0)
                 console.log("none");

      crr1 = (cr1*100/(cr1+cr2+cr3+cr4+cr5)).toPrecision(4);
      crr2 = (cr2*100/(cr1+cr2+cr3+cr4+cr5)).toPrecision(4);
      crr3 = (cr3*100/(cr1+cr2+cr3+cr4+cr5)).toPrecision(4);
      crr4 = (cr4*100/(cr1+cr2+cr3+cr4+cr5)).toPrecision(4);
      crr5 = (cr5*100/(cr1+cr2+cr3+cr4+cr5)).toPrecision(4);
      //console.log(cr1,cr2,cr3,cr4,cr5);
        makebar();
      makegraph();
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
                  $('#count').append("<p>Number of crimes reported nearby in the last 7 days = "+data.posts.length + " !</p>");
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
