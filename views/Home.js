import React, {useState} from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Geolocation from "@react-native-community/geolocation";

//  Showing Home Screen Components
export default function Home({ navigation }) {
    //stores the location information of the user
    const [location, setLocation] = useState({        
        latitude: 0,
        longitude: 0,        
        country: "",
        city: ""
    });

    //function for error handling
    function errorScreen(error) {
        console.log(error);
    }

    //function for gps-sensor
    function gps() {
        Geolocation.getCurrentPosition(
            (position) => {
                //  Calling opencage function
                openCage(position.coords.latitude, position.coords.longitude);
            },
            //  Calling error screen
            (error) => { 
                errorScreen(error);
            },
            //  Enabling accuracy option, setting time options
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
        );
    }
    
    //  Open cage function to retrieve data using the latitude and longitude
    function openCage (latitude, longitude) {
        let url = "https://api.opencagedata.com/geocode/v1/json?key=44a9f29b61514c1bb30d4781d418d6f3&q=" + latitude + "+" + longitude;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {           
            let city = "";           
            if ("city_district" in json.results[0].components) {
                city = json.results[0].components.city_district;
            } else if ("locality" in json.results[0].components) {
                city = json.results[0].components.locality;
            } else if ("county" in json.results[0].components) {
                city = json.results[0].components.county;
            }
            //  saves information
            setLocation({
                latitude: latitude,
                longitude: longitude,
                country: json.results[0].components.country,
                city: city
            });            
        });
    };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>TravelPal</Text>   
      <Text>{location.latitude}</Text>
      <Text>{location.longitude}</Text>
      <Text>{location.country}</Text>
      <Text>{location.city}</Text>
      <Button onPress={gps} title="FindMe"/>         
    </View>
  );
}

//  Stylesheet for Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02b2e8",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 35,
  }
});
