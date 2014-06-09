var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true })
                var directionsService = new google.maps.DirectionsService()
                var abecedario = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
                directionsDisplay.setMap(map)


                if (mydataArray.length > 0) {
                    //  CUENTA CON MACROS
                    console.log('CUENTA CON MACROS')
                    if (mydataArray.length >= 2) {
                        var start
                        var end
                        var waypts = []
                        if (mydataArray.length > 8) {
                            // TIENE BUEN SEGUIMIENTO CON MACROS
                            console.log('TIENE BUEN SEGUIMIENTO CON MACROS')
                        } else {

                            for (var i = mydataArray.length - 1; i >= 0; i--) {
                                if (i > 0) {
                                    waypts.push({
                                        location: mydataArray[i].lt + ',' + mydataArray[i].lg,
                                        stopover: true
                                    })
                                    new google.maps.Marker({
                                        position: new google.maps.LatLng(mydataArray[i].lt, mydataArray[i].lg), map: map,
                                        icon: 'http://mt.google.com/vt/icon/name=icons/spotlight/measle_8px.png&scale=1'
                                    })
                                }
                            }

                            var request = {
                                origin: mydataArray[mydataArray.length - 1].lt + ',' + mydataArray[mydataArray.length - 1].lg,
                                destination: mydataArray[0].lt + ',' + mydataArray[0].lg,
                                waypoints: waypts,
                                optimizeWaypoints: true,
                                travelMode: google.maps.TravelMode.DRIVING
                            }

                            directionsService.route(request, function (response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                    var dirs = response.routes[0].legs.length - 1
                                    var pos_i = 0
                                    for (var mkrs = dirs; mkrs >= 0; mkrs--) {
                                        var leg = response.routes[0].legs[mkrs];
                                        if (mkrs == 0) {
                                            // VERDE
                                            console.log('VERDE')
                                            makeMarker(pos_i, leg.start_location, '00ff00', abecedario[mkrs]);
                                        } else if (mkrs == dirs) {
                                            // ROJO
                                            console.log('ROJO')
                                            makeMarker(pos_i, leg.end_location, 'ff0000', abecedario[mkrs]);
                                        } else {
                                            // DEFAULT
                                            console.log('DEFAULT')
                                            makeMarker(pos_i, leg.end_location, 'ff00ff', abecedario[mkrs]);
                                        }
                                        pos_i++
                                    }
                                }
                            })
                        }
                    } else {
                        // SOLO DOS SEGUIMIENTO CON MACROS
                        console.log('SOLO DOS SEGUIMIENTO CON MACROS')
                        var request = {
                            origin: mydataArray[mydataArray.length - 1].lt + ',' + mydataArray[mydataArray.length - 1].lg,
                            destination: mydataArray[0].lt + ',' + mydataArray[0].lg,
                            optimizeWaypoints: true,
                            travelMode: google.maps.TravelMode.DRIVING
                        }
                        directionsService.route(request, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response)
                                var leg = response.routes[0].legs[0]
                                makeMarker(1, leg.start_location, '00ff00', 'A')
                                makeMarker(0, leg.end_location, 'ff0000', 'B')
                                new google.maps.Marker({
                                    position: new google.maps.LatLng(mydataArray[mydataArray.length - 1].lt, mydataArray[mydataArray.length - 1].lg), map: map,
                                    icon: 'http://mt.google.com/vt/icon/name=icons/spotlight/measle_8px.png&scale=1'
                                })
                                new google.maps.Marker({
                                    position: new google.maps.LatLng(mydataArray[0].lt, mydataArray[0].lg), map: map,
                                    icon: 'http://mt.google.com/vt/icon/name=icons/spotlight/measle_8px.png&scale=1'
                                })
                            }
                        })
                    }
                } else {
                    // SOLO UN SEGUIMIENTO CON MACRO
                    console.log('SOLO UN SEGUIMIENTO CON MACRO')
                    new google.maps.Marker({
                        position: new google.maps.LatLng(mydataArray[0].lt, mydataArray[0].lg), map: map,
                        icon: 'http://mt.google.com/vt/icon/name=icons/spotlight/measle_8px.png&scale=1'
                    })
                    makeMarker(0, new google.maps.LatLng(mydataArray[0].lt, mydataArray[0].lg), '00ff00', 'A')
                }
                //}

                function makeMarker(i, position, type, letter) {
                    debugger
                    var dtArray = dataArray[i]
                    var dt_sp
                    var d = dtArray.df !== '' ? '' : dtArray.f
                    var h = dtArray.df !== '' ? dtArray.k + '.- PUNTOS ANIDADOS :: ' + dtArray.d : dtArray.k + '.- ' + dtArray.h
                    var hc = dtArray.df !== '' ? '' : '<div class="ltr_row"><span class="ltr_l">' + dtArray.d + '</span><span class="ltr_r">' + dtArray.f + '</span></div>'
                    var c = ''

                    dt_sp = dtArray.df.split('|')
                    if (dt_sp.length > 1) {
                        for (var x = 0; x < dt_sp.length ; x++) {
                            c += '<div class="ltr_row"><span class="ltr_l">' + dt_sp[x].split("#")[0] + '</span><span class="ltr_r">' + dt_sp[x].split("#")[1] + '</span></div>'
                        }
                    }
                    c = c === '' ? hc : c

                    //var exists = false;
                    //if (c.indexOf('|') !== -1)
                    //    exists = true; // does 'abc' exist in my string?

                    //while (exists) // replace 'abc' as long as it exists
                    //{
                    //    c = c.replace('|', '<br>');

                    //    if (c.indexOf('|') !== -1)
                    //        exists = true;
                    //    else
                    //        exists = false;
                    //}

                    var infowindow = new google.maps.InfoWindow({
                        content: '<div id="cntr_iw_map" class="' + i + '-FM' + dtArray.t +
                            '" style="width: 300px;"><div class="cntr_iw_map_title">' + h +
                            '</div><div  class="cntr_iw_map_details">' + c + '</span></div></div>'
                    })

                    var makeMarkerInfo = new google.maps.Marker({
                        position: position,
                        map: map,
                        icon: "h" + "ttp://chart.apis.google.com/chart?chst=d_map_spin&chld=.6|0|" + type + "|15|_|" + letter,
                        title: i + '-FM' + dtArray.t
                    })

                    google.maps.event.addListener(makeMarkerInfo, 'click', function () {

                        if (infowindow instanceof google.maps.InfoWindow) infowindow.close()

                        lastinfowindow = infowindow.open(map, makeMarkerInfo)

                        var IW = "", IW_A = "", IW_B = "", IW_CA = "", IW_CB = "", IW_COUNT_DIVS = 0
                        IW = $('.' + makeMarkerInfo.title).css('width', 'inherit').parent().parent().parent().siblings()
                        IW_COUNT_DIVS = $(IW).length
                        IW_A = $(IW[IW_COUNT_DIVS - 2]).children()
                        $(IW_A[0]).removeClass().addClass('iw-fmx-cnt-c')
                        $(IW_A[1]).removeClass().addClass('iw-fmx-cnt-d').css({ 'position': 'absolute', 'left': 1, 'top': 1, 'overflow': 'auto', 'right': 1, 'bottom': 1 })
                        $(IW_A[2]).css({ 'right': '8px', 'top': '8px' })
                        IW_B = $(IW_A[0]).children()
                        $(IW_B[3]).removeClass().addClass('iw-bg')
                        $(IW_B[2]).children(2).children().removeClass().addClass('iw-bg')

                    })
                    google.maps.event.addListener(infowindow, 'domready', function () {

                    })
                }

                new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'UNIDAD: ' + pos.truck + ' -::- POSICIÓN: ' + pos.city,
                    icon: img,
                    animation: google.maps.Animation.DROP
                })



                var ftmxPolygon

                var fletesmexCoords = [
                    new google.maps.LatLng(19.55161536694819, -99.18667966799528),
                    new google.maps.LatLng(19.55236483041144, -99.18580535921407),
                    new google.maps.LatLng(19.55325806521799, -99.18672316591176),
                    new google.maps.LatLng(19.55239561944936, -99.1874646490237),
                    new google.maps.LatLng(19.55161536694819, -99.18667966799528)
                ];

                ftmxPolygon = new google.maps.Polygon({
                    paths: fletesmexCoords,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });

                ftmxPolygon.setMap(map);

                var isWithinPolygon = ftmxPolygon.containsLatLng(myLatlng);
                if (isWithinPolygon) {
                    console.log('esta dentro de la empresa!!!')
                } else {
                    console.log('esta FUERA de la empresa!!!')
                }
