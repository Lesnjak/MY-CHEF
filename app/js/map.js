var myLat = localStorage.getItem("myLat");
var myLon = localStorage.getItem("myLon");
if(localStorage.getItem('findPlace')){
    var elem = document.getElementById('address');
    elem.setAttribute("value", localStorage.getItem('findPlace'));
    console.log("hello");
}
$("#panel").css('margin-top',$(".header").height());
var templateDir = "/img/favicon/png_fav.png";
var templateDir1 = "/img/favicon/flag-green.png";
var chefs = [
    {
        id: "1",
        name: "Катерина Константиновна",
        latitude: 47.827558,
        longitude: 35.1609022,
        adress: "пр.Соборный,102",
        link: "/chef-card.html"

    },
    {
        id: "2",
        name: "Константин Констанинопольский",
        latitude: 47.8199447,
        longitude: 35.1700849,
        adress: "пр.Соборный,85",
        link: "/chef-card.html"

    },
    {
        id: "3",
        name: "Джеки Чак",
        latitude: 47.818412,
        longitude: 35.1723803,
        adress: "пр.Соборный,65",
        link: "/chef-card.html"

    },
    {
        id: "4",
        name: "Арнольд Шварцнегер ",
        latitude: 47.808126,
        longitude: 35.1843108,
        adress: "пр.Соборный,102",
        link: "/chef-card.html"

    }
];
var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(myLat,myLon);
    var mapOptions = {
        zoom: 12,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('address')), {
            types: ['geocode']
        });
    var icon = {
        url: templateDir,
        scaledSize: new google.maps.Size(50, 50)
    };
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.latlng,
            map: map,
            icon: icon,
            animation: google.maps.Animation.DROP
        });
        var infowindow = new google.maps.InfoWindow({
            content: props.info
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }

    chefs.forEach(function (item, index) {
        var info = '<a style="color: red;text-decoration: underline " href="' + item.link + '">'+item.name+'</a>'+"<br>"+""+item.adress+"";
        addMarker({
            latlng: {lat: item.latitude, lng: item.longitude},
            info: info,
        });
    })
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        codeAddress()
    });
    codeAddress();
}

function codeAddress() {
    var icon = {
        url: templateDir1,
        scaledSize: new google.maps.Size(35, 45)
    };
    var address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var htmlContent;
            console.log(results);
            var latlng = new google.maps.LatLng(myLat,myLon);
            map.setCenter(results[0].geometry.location);
            var address_components = results[0].address_components;
            var marker = new google.maps.Marker({
                map: map,
                position:( localStorage.getItem("myLat")||localStorage.getItem("myLon"))? latlng : results[0].geometry.location,
                icon: icon,
                animation: google.maps.Animation.DROP
            });

            var infowindow = new google.maps.InfoWindow({
                content: 'Вы здесь!'
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
            if (results[0].partial_match) {
                //htmlContent = "not a valid result";
            } else {
                //htmlContent = "<div style='width:300px; height:300px;'><table border='1'><tr><th>long_name</th><th>types</th></tr>";

                /* Added formatted Address */
                htmlContent += "<tr><td colspan='2'><strong>" + results[0].formatted_address + "</strong></td></tr>";
                /* Added formatted Address */

                for (var i = 0; i < address_components.length; i++) {
                    //htmlContent += "<tr><td>" + address_components[i].long_name + "</td><td>"
                    for (var j = 0; j < address_components[i].types.length; j++) {
                        //htmlContent += address_components[i].types[j] + " ";
                    }
                    //htmlContent += "</td></tr>";
                }

                //htmlContent += "</table>";
            }
            google.maps.event.addListener(marker, 'click', function(evt) {
                //infowindow.setContent(htmlContent);
                //infowindow.open(map, marker);
            });
            google.maps.event.trigger(marker, 'click');
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);



function activeInput() {
    var input = document.querySelector('#newLocation');
    var autocomplete = new google.maps.places.Autocomplete(input);
}




