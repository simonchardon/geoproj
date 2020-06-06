import React, { useEffect} from "react";
import mapboxgl from "mapbox-gl";
import Marker from "../components/marker";
import ReactDOM from "react-dom";
import Popup from "../components/popup";





// @ts-ignore
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;


type Props = {
    longitude: number,
    latitude: number,
    position: any,
    comp: string
}

const Map = (props: Props) => {

    let mapContainer: any;

    useEffect(():void => {

        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [props.longitude, props.latitude],
            zoom: 12
        });

        if (props.comp === 'index'){
            const coordinate: any[] = [];

            props.position.forEach((res: any) => {
                const coor = JSON.parse(res.st_asgeojson).coordinates;
                coordinate.push(coor);
            })

            const geojson = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'properties': {},
                            'coordinates': coordinate
                        }
                    }
                ]
            };

            map.on('load', function() :void {
                // @ts-ignore
                map.addSource('LineString', {
                    'type': 'geojson',
                    'data': geojson
                } );
                map.addLayer({
                    'id': 'LineString',
                    'type': 'line',
                    'source': 'LineString',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#BF93E4',
                        'line-width': 4
                    }
                });
            });

            const coordinates = geojson.features[0].geometry.coordinates;
            const bounds = coordinates.reduce(function (bounds, coord) {
                return bounds.extend(coord);
            }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
            map.fitBounds(bounds, {
                padding: 40
            });

        }

        props.position.forEach((res: any) => {
            const coor = JSON.parse(res.st_asgeojson).coordinates;
            const markerNode = document.createElement("div");
            ReactDOM.render(<Marker  />, markerNode);
            const popupNode = document.createElement("div");
            ReactDOM.render(<Popup coor={coor} datetime={res.datetime} />, popupNode);
            new mapboxgl.Marker(markerNode)
                .setLngLat({lng: coor[0], lat: coor[1]})
                .setPopup(new mapboxgl.Popup({ offset: 15 }).setDOMContent(popupNode))
                .addTo(map);
        })

    },[props, mapContainer]);

    return (
        <div
            ref={(el): void => {
                mapContainer = el;
            }}
            className="mapContainer container"
        />
    );

}


export default Map;