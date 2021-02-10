ready_func=[]
$ = jQuery;

/* ---- IMAGES ----- */

function init_colorbox(){
	if ($(".colorbox-insert-image").length == 0){
		$(".field--name-field-image").show();
	}
}
ready_func.push(init_colorbox);


/* ---- IMAGES ----- */
/* ---- MENU ----- */



function sub_menu(id, depth=0) {
	if (depth>2) return;
	$("#block-biograd-th-page-title .title").before("<ul id='sub-menu'></ul>");
	var el = $("#sub-menu");
	
	$.each(Object.values(menu).sort(function(a,b){return a[2]-b[2]}), function( k, v ) {
		if (v[1] == id) {
			el.append('<li>'+v[0]+'</li>')
		}
	});
	
	if ($("#sub-menu li").length == 0) {
		if (id in menu) sub_menu( menu[id][1], depth+1);
	}
	
}

function breadcrumbs(id){
	$("#block-biograd-th-page-title .title").after("<ul id='breadcrumbs'></ul>");
	var breadcrumbs = $("#breadcrumbs");
	var i = 5;	
	while (id>0 && i>0) {
		i--;
		breadcrumbs.prepend("<li>"+menu[id][0]+"</li>");
		id = menu[id][1];
	}
	breadcrumbs.prepend("<li><a href='/'>Главная</a></li>")
}


function make_menu(){
	menu = {}
	console.time("menu");
	$("#block-views-block-breadcrumbs-block-breadcrumbs li").each( function(){
		var el = $(this);
		var ar = $("div span", el);
		var id = parseInt( $(ar[1]).text() );
		var a = $(ar[0]).html();
		var p = parseInt ( $(ar[2]).text() );
		var w = parseInt ( $(ar[3]).text() );		
		menu[id] = [a,p,w];
	});
	
	// Get current page menu id
	var done = false;
	// may be taxonomy	
	var cid = $("body").attr("class").split(" ").filter(function(x){ return x.startsWith("page-taxonomy-term-")});
	if (cid.length>0) {
		cid = parseInt(cid[0].substring(19));
		if (! isNaN(cid)) {
			sub_menu(cid); breadcrumbs(cid);
			done = true;
		}		
	}
	if (!done){
		// Menu item?
		var cid = parseInt($(".node .field--name-field-menu .field__item").first().text());
		if (! isNaN(cid)) {
			sub_menu(menu[cid][1]); breadcrumbs(cid);
		done = true;
		}
	}
	if (!done){
			// no it's main page
			sub_menu(55); breadcrumbs(55);
	} 
	
	console.timeEnd("menu");
}
ready_func.push(make_menu);



function init_menu(){
	var menu = $("section.region-top-header-form");
	var top = menu.offset().top;
	$(window).bind('scroll', function () {
    if ($(window).scrollTop() > top) {
        menu.addClass('fixed');
    } else {
        menu.removeClass('fixed');
    }
});

}
ready_func.push(init_menu);

/* ---- MENU ----- */
/* ---- PARALAX ----- */

function init_paralax(){
	
	$.get("/themes/custom/biograd_th/js/paralax.html", success=function(data){
		jq = $(".paralax-div",data); 
		console.log(jq);
		el = jq.eq(Math.floor(Math.random()*jq.length));
		console.log(el.html());
		console.log($("img.bg",el));
		$("#page").append("<div id='paralax-fg'></div>"); 
		$("#page").append("<div id='paralax-bg'></div>"); 
		$("#paralax-bg").append($("img.bg",el));
		$("#paralax-fg").append($(".content",el));

		$(window).bind('scroll', function () {
			$("#paralax-bg").css("top", $(window).scrollTop()*(-0.7)+"px");
		});
	})

}



ready_func.push(init_paralax);


/* ---- PARALAX ----- */
/* ---- Edit form rearrange ----- */


function init_edit_form(){
	$("form .field--name-field-menu").detach().appendTo(".layout-region-node-secondary");
}
ready_func.push(init_edit_form);


/* ---- Edit form rearrange ----- */


$(	function() {
	for (var i=0;i<ready_func.length; i++)
		ready_func[i]();
});



