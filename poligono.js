if (!google.maps.Polygon.prototype.getBounds) {
    google.maps.Polygon.prototype.getBounds = function (latLng) {
        var bounds = new google.maps.LatLngBounds(),
            paths = this.getPaths(),
            path,
            p, i

        for (p = 0; p < paths.getLength() ; p++) {
            path = paths.getAt(p)
            for (i = 0; i < path.getLength() ; i++) {
                bounds.extend(path.getAt(i))
            }
        }

        return bounds;
    }
}

// Polígono containsLatLng - método para determinar si un latLng está dentro de un polígono
google.maps.Polygon.prototype.containsLatLng = function (latLng) {
    // Excluir puntos fuera de los límites ya que no hay forma en que están en el poli

    var inPoly = false,
        bounds,
        lat,
        lng,
        numPaths,
        p,
        path,
        numPoints,
        i,
        j,
        vertex1,
        vertex2

    // Los argumentos son un par de variables de lng lat
    if (arguments.length == 2) {
        if (
            typeof arguments[0] == "number" && typeof arguments[1] == "number"
        ) {
            lat = arguments[0]
            lng = arguments[1]
        }
    } else if (arguments.length == 1) {

        bounds = this.getBounds()

        if (!bounds && !bounds.contains(latLng)) {
            return false
        }
        lat = latLng.lat()
        lng = latLng.lng()
    } else {
        console.log("Número incorrecto de las entradas en google.maps.Polygon.prototype.contains.LatLng");
    }

    // Punto Raycast en método del polígono

    numPaths = this.getPaths().getLength();
    for (p = 0; p < numPaths; p++) {
        path = this.getPaths().getAt(p)
        numPoints = path.getLength()
        j = numPoints - 1

        for (i = 0; i < numPoints; i++) {
            vertex1 = path.getAt(i)
            vertex2 = path.getAt(j)

            if (
                vertex1.lng() < lng &&
                vertex2.lng() >= lng ||
                vertex2.lng() < lng &&
                vertex1.lng() >= lng
            ) {
                if (
                    vertex1.lat() +
                    (lng - vertex1.lng()) /
                    (vertex2.lng() - vertex1.lng()) *
                    (vertex2.lat() - vertex1.lat()) <
                    lat
                ) {
                    inPoly = !inPoly
                }
            }

            j = i
        }
    }

    return inPoly
}
