// fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=%3CREQUIRED%3E&lon=%3CREQUIRED%3E", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
// 		"x-rapidapi-key": "71f6b4f193msh561e6e4b6552ca5p13ba72jsne8db3c8baa6c"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });
var ilist = {
	items: [],
	dlist: null,
	iadd: null,
	inputItem: null,
	init: function() {
	  ilist.dlist = document.getElementById("drink-list");
	  ilist.iadd = document.getElementById("ingredient-add"); 
	  ilist.inputItem = document.getElementById("drink-item");
	  ilist.iadd.addEventListener("submit", function(e){
		  e.preventDefault();
		  var listitem = document.createElement("li");
		  var listitemtext = document.createTextNode(ilist.inputItem.value);
			listitem.appendChild(listitemtext);
		  document.getElementById('ilist.add').appendChild(listitem);
		  console.log(ilist.iadd);
	  })// where method is, define function method, is add now will become push
	  
	  if (localStorage.items == undefined) {localStorage.items = "[]"; }
	  ilist.items = JSON.parse(localStorage.items);

	//   ilist.draw();

	}
  }
  window.addEventListener("DOMContentLoaded", ilist.init);
