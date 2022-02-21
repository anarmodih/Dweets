import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      country: "",
    };
  }

  handleChange = (address) => {
    this.setState({ address },()=>console.log(address));
  };

  handleSelect = (address) => {
    var self = this,
      add = {};
    self.setState({
      address,
    });
    add["address"] = address;
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          this.setState(
            {
              lat: lat,
              lng: lng,
            },
            () => {
              add["lat"] = this.state.lat;
              add["lng"] = this.state.lng;
            }
          );
          self.props.onSelectAddress(add);
        });
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
       
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        shouldFetchSuggestions={true}
      >
      {/* {console.log(this.state.address)} */}
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Location",
                className: "location-search-input",
              })}
              className="locationautocomplete"
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {/* {console.log(suggestions)} */}
              {suggestions.map((suggestion) => {
                console.log(suggestion)
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
