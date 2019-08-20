import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import params from "../params";

const homePlace = {
	description: "Home",
	geometry: { location: { lat: 7.1195, lng: 34.845 } }
};
const workPlace = {
	description: "Work",
	geometry: { location: { lat: 7.1195, lng: 34.845 } }
};

class GooglePlacesInput extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		try {
			return (
				<GooglePlacesAutocomplete
					placeholder="Search"
					minLength={10} // minimum length of text to search
					autoFocus={false}
					returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
					listViewDisplayed="auto" // true/false/undefined
					fetchDetails={true}
					renderDescription={row => row.description} // custom description render
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						console.log(data, details);
						var local = {
							city: "",
							state: "",
							district: "",
							number: "",
							street: "",
							latitude: "",
							longitude: "",
							zipcode: "",
							description: ""
						};
						if (details && details.address_components) {
							details.address_components.forEach(detail => {
								if (detail.types.includes("street_number")) {
									local.number = detail.short_name;
								} else if (detail.types.includes("route")) {
									local.street = detail.short_name;
								} else if (
									detail.types.includes("sublocality_level_1")
								) {
									local.district = detail.short_name;
								} else if (
									detail.types.includes(
										"administrative_area_level_2"
									)
								) {
									local.city = detail.short_name;
								} else if (
									detail.types.includes(
										"administrative_area_level_1"
									)
								) {
									local.state = detail.short_name;
								} else if (
									detail.types.includes("postal_code")
								) {
									local.zipcode = detail.short_name;
								}
							});
							local.latitude = details.geometry.location.lat;
							local.longitude = details.geometry.location.lng;
							local.description = data.description;
						}
						if (this.props && this.props.navigation)
							this.props.navigation.navigate(
								"AdicionarLactente",
								local
							);
					}}
					getDefaultValue={() => ""}
					query={{
						key: params.google_places_key,
						language: "pt-br" // language of the results
						// types: '(cities)' // default: 'geocode'
					}}
					styles={{
						textInputContainer: {
							width: "100%"
						},
						description: {
							fontWeight: "bold"
						},
						predefinedPlacesDescription: {
							color: "#1faadb"
						}
					}}
					currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
					currentLocationLabel="Localização Atual"
					nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
					GoogleReverseGeocodingQuery={
						{
							// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
						}
					}
					GooglePlacesSearchQuery={{
						// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
						rankby: "distance"
					}}
					filterReverseGeocodingByTypes={[
						"locality",
						"administrative_area_level_3"
					]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
					predefinedPlaces={[homePlace, workPlace]}
					debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
					//   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
					//   renderRightButton={() => <Text>Custom text after the input</Text>}
				/>
			);
		} catch (e) {
			console.log("Debug: ", e);
		}
	}
}

export default GooglePlacesInput;
