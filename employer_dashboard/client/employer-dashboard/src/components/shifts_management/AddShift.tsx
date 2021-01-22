import React, { useState, useRef, useCallback, useContext } from "react";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";
import ShiftForm from './ShiftForm'
import { tokenContext } from "../../context";
import { notification } from "antd";


function AddShift() {
  // Store Polygon path in state
  const [path, setPath] = useState([
    {lat: 26.379875, lng: 43.949677},
    {lat: 26.361112, lng: 43.998855},
    {lat: 26.343730, lng: 43.936485}
  ]);
  const [center, setCenter] = useState({ lat: 26.335884, lng: 43.967799 })
  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  const tokens = useContext(tokenContext)
  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
        //@ts-ignore
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        //@ts-ignore
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
          //@ts-ignore
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
      //@ts-ignore
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  const onFinish = async (values:{employees: Array<string>, shift_title: string, days_of_week: string, time: Array<any>}) => {
    const data = {
      employees: values.employees,
      name: values.shift_title,
      polygon: path,
      days_of_week: values.days_of_week,
      _from: values.time[0].format('HH:mm:ss'),
      to: values.time[1].format('HH:mm:ss'),

    }
    console.log(data);
    
    try{
      const res = await fetch(process.env.REACT_APP_API + '/shift_viewset/', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + tokens?.access,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      if(!result.success){
        notification.error({message: result.message})
        return
      }

      notification.success({message: 'Shift Has Been Added SuccessFully'})
    }
    catch(e){
      notification.error({message: 'Error Encountered'})
    }
    
      
  }

  return (
    <>
    <div className="App">
      <LoadScript
        id="script-loader"
        //@ts-ignore
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          //@ts-ignore
          center={center}
          zoom={12}
          //@ts-ignore
          version="weekly"
          
          on
          
        >
          <Polygon
            // Make the Polygon editable / draggable
            editable
            draggable
            path={path}
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />
        </GoogleMap>
      </LoadScript>
    </div>
    <ShiftForm onFinish={onFinish}/>
    </>
  );
}




export default AddShift


/**
 * import React, { useState, useEffect, useContext, useCallback, useRef } from 'react'
import {  withGoogleMap, withScriptjs } from "react-google-maps"
import {  GoogleMap, Polygon } from "@react-google-maps/api";

import { Spin } from 'antd'

const AttendanceProxyMap = withScriptjs(withGoogleMap(() => {

    const [path, setPath] = useState<Array<{ lat: number, lng: number }>>([
        {lat: 25.522615, lng: 45.121615},
        {lat: 23.261534, lng: 43.983384},
        {lat: 23.895883, lng: 46.558838}
    ]);

    const polygonRef: any = useRef(null);
    const listenersRef = useRef([]);

    const onEdit = useCallback(() => {
        if (polygonRef.current) {
          const nextPath = polygonRef.current
            .getPath()
            .getArray()
            .map((latLng: any) => {
              return { lat: latLng.lat(), lng: latLng.lng() };
            });
          setPath(nextPath);
        }
      }, [setPath]);


      const onLoad = useCallback(
        polygon => {
          polygonRef.current = polygon;
          const path = polygon.getPath();
          listenersRef.current.push(
            //@ts-ignore
            path.addListener("set_at", onEdit),
            path.addListener("insert_at", onEdit),
            path.addListener("remove_at", onEdit)
          );
        },
        [onEdit]
      );

      const onUnmount = useCallback(() => {
        listenersRef.current.forEach((lis: any) => lis.remove());
        polygonRef.current = null;
      }, []);

    console.log("The path state is", path);


    return (
        <GoogleMap
        //@ts-ignore
            mapContainerClassName="App-map"
            defaultCenter={{ lat: 24.447150, lng: 43.046962 }}
            zoom={12}
            //@ts-ignore
            version="weekly"
            on
        >
            <Polygon
                // Make the Polygon editable / draggable
                editable
                draggable
                path={path}
                // Event used when manipulating and adding points
                onMouseUp={onEdit}
                // Event used when dragging the whole Polygon
                onDragEnd={onEdit}
                //@ts-ignore
                onLoad={onLoad}
                onUnmount={onUnmount}
            />

        </GoogleMap>
    )
}))


const AddShift: React.FC = () => (
    <AttendanceProxyMap
        //@ts-ignore
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=geometry,drawing,places`}
        //@ts-ignore
        loadingElement={<div style={{ height: `100%` }} />}
        //@ts-ignore
        containerElement={<div style={{ height: `600px` }} />}
        //@ts-ignore
        mapElement={<div style={{ height: `100%` }} />}
    />
)




export default AddShift


 */