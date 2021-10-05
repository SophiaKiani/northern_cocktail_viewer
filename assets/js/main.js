fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=%3CREQUIRED%3E&lon=%3CREQUIRED%3E", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
		"x-rapidapi-key": "71f6b4f193msh561e6e4b6552ca5p13ba72jsne8db3c8baa6c"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});




// let url = 'trailapi-trailapi.p.rapidapi.com'


// fetch(url).then(function (res) { 
//     console.log(res)
// });