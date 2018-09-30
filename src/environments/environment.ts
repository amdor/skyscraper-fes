// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

// export const environment = {
// 	production: false,
//     bes: "http://127.0.0.1:5000/",
// 	savedCarsEndpoint: "http://127.0.0.1:5000/saved-cars"
// };

export const environment = {
	production: true,
	bes: 'https://skyscraper-bes.herokuapp.com/',
	savedCarsEndpoint: 'https://skyscraper-bes.herokuapp.com/saved-cars',
	firebase: {
		apiKey: 'AIzaSyCDVxquLr4dXKyIq2R8-UfdQIjNdiiKJMo',
		authDomain: 'skyscraper-196419.firebaseapp.com',
		databaseURL: 'https://skyscraper-196419.firebaseio.com',
		projectId: 'skyscraper-196419',
		storageBucket: 'skyscraper-196419.appspot.com',
		messagingSenderId: '498731538493'
	}
};

