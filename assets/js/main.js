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
		//   console.log(ilist.iadd);
	  })// where method is, define function method, is add now will become push
	  
	  if (localStorage.items == undefined) {localStorage.items = "[]"; }
	  ilist.items = JSON.parse(localStorage.items);

	}
  }

  window.addEventListener("DOMContentLoaded", ilist.init);
