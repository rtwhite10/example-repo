This project is just an example of recent work of mine. It won't run and will compile with errors as it is missing a lot of dependencies. Essentially this is an order form. It uses Material-ui, Formik, Airbnb date selection, and google maps API. 

Everything is in the OrderPage directory

The DatesAndRecomendations components showcase some async handling and google API integration. I leveraged an npm module as the UI component but all the logic for finding matching zones is handled with a google.maps instance that is mounted higher up the component tree and gives access to all the google maps methods. 

These zones are created on a separate maps page(not included) and are queried from the back end which this component tests to see if the auto-suggested address exists in matched zones.

Thanks for looking!