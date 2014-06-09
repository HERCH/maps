var arr = []
                for (var z = 0; z < dataArray.length; z++) {
                    arr.push([dataArray[z].lt, dataArray[z].lg])
                }

                var oldpath;
                var lastIndx = 0;

                function gDirRequest(service, waypoints, userFunction, waypointIndex, path) {
                    // set defaults
                    console.log('START SERVICE gDirRequest')

                    waypointIndex = typeof waypointIndex !== 'undefined' ? waypointIndex : 0;
                    path = typeof path !== 'undefined' ? path : [];

                    // get next set of waypoints
                    var s = gDirGetNextSet(waypoints, waypointIndex);
                    // build request object
                    var startl = s[0].shift()["location"];
                    var endl = s[0].pop()["location"];
                    var request = {
                        origin: startl,
                        destination: endl,
                        waypoints: s[0],
                        travelMode: google.maps.TravelMode.WALKING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        optimizeWaypoints: false,
                        provideRouteAlternatives: false,
                        avoidHighways: false,
                        avoidTolls: false
                    };

                    service.route(request, function (response, status) {

                        if (status == google.maps.DirectionsStatus.OK) {
                            console.log('IF {google.maps.DirectionsStatus.OK}')
                            debugger
                            path = path.concat(response.routes[0].overview_path);
                            oldpath = path
                            if (s[1] != null) {
                                lastIndx = s[1]
                                gDirRequest(service, waypoints, userFunction, s[1], path)
                            } else {
                                userFunction(path);
                            }

                        } else {
                            console.log('ELSE {google.maps.DirectionsStatus.OK}')
                            debugger
                            path = oldpath;
                            lastIndx = lastIndx + 1
                            if (s[lastIndx] != null) {
                                gDirRequest(service, waypoints, userFunction, lastIndx, path)
                            }
                            else {
                                userFunction(path);
                            }
                        }

                    });
                }

                function gDirGetNextSet(waypoints, startIndex) {

                    var MAX_WAYPOINTS_PER_REQUEST = 8;

                    var w = [];    // array of waypoints to return

                    if (startIndex > waypoints.length - 1) { return [w, null]; } // no more waypoints to process

                    var endIndex = startIndex + MAX_WAYPOINTS_PER_REQUEST;

                    // adjust waypoints, because Google allows us to include the start and destination latlongs for free!
                    endIndex += 2;

                    if (endIndex > waypoints.length - 1) { endIndex = waypoints.length; }

                    for (var i = startIndex; i < endIndex; i++) {
                        w.push(waypoints[i]);
                    }

                    if (endIndex != waypoints.length) {
                        return [w, endIndex -= 1];
                    } else {
                        return [w, null];
                    }
                }

                function main(data) {

                    // initalise directions service
                    var directionsService = new google.maps.DirectionsService();

                    var travelWaypoints = []
                    for (var i = 0; i <= data.length - 1; ++i) {
                        console.log(dataArray[i].lt + ',' + dataArray[i].lg)

                        //makeMarker(i, new google.maps.LatLng(dataArray[0].lt, dataArray[0].lg), '00ff00', abecedario[i])
                        new google.maps.Marker({
                            position: new google.maps.LatLng(dataArray[i].lt, dataArray[i].lg), map: map,
                            icon: 'http://mt.google.com/vt/icon/name=icons/spotlight/measle_8px.png&scale=1'
                        })
                        travelWaypoints.push({
                            location: new google.maps.LatLng(data[i][0], data[i][1])
                        })
                    }

                    // get directions and draw on map
                    gDirRequest(directionsService, travelWaypoints, function drawGDirLine(path) {
                        var line = new google.maps.Polyline({
                            clickable: false,
                            map: map,
                            path: path,
                            strokeColor: '#0000ff',
                            strokeOpacity: 0.8,
                            strokeWeight: 3
                        })
                    })

                }


                google.maps.event.addListenerOnce(map, 'idle', function () {
                    main(arr);
                });
