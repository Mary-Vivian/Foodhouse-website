const url = 'https://restaurants222.p.rapidapi.com/languages';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '395d669a6dmsh52d782f3f17e3d7p1db388jsn7b6e8e89c136',
		'x-rapidapi-host': 'restaurants222.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}