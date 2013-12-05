


/*
 *  ---------------------------------------------------------------------------
 *  DROPDOWNMAKER PLUGIN
 *  ---------------------------------------------------------------------------
 */
$(document).dropdownmaker( { trigger1: ".dropouttrigger", trigger2: ".subleveltrigger", trigger3: ".btn-foldin" });















/*
 * 	---------------------------------------------------------------------------
 *	DARKOVERLAY BEHAVIOUR
 * 	---------------------------------------------------------------------------
 */

(function( darkoverlay, $, undefined ) {  


	/*
	 *	hides navigation dropdown when clicking the div#darkoverlay
	 */
	$('#darkoverlay').click( function(){

		darkoverlay.HideOverlay();
		if( $(document).dropdownmaker )
			$(document).dropdownmaker.Toggle(".target-id-01");

	});


	/*
	 *	fades in darkoverlay 
	 */
	darkoverlay.ShowOverlay = function() {

		$('#darkoverlay').fadeIn();

	};


	/*
	 *	fades out darkoverlay out
	 */
	darkoverlay.HideOverlay = function() {

		$('#darkoverlay').fadeOut();

	};


	/*
	 *	fade-toggle darkoverlay 
	 */
	darkoverlay.ToggleOverlay = function() {

		$('#darkoverlay').fadeToggle();

	};

}( window.darkoverlay = window.darkoverlay || {}, jQuery ));
























/*
 * 	---------------------------------------------------------------------------
 *	SWIPE.JS
 * 	---------------------------------------------------------------------------
 */


$('.slidifyme').each( function( index ) {

	$(this).slidify();

});





















/*
 * 	---------------------------------------------------------------------------
 *	TABIFY TABS FUNCTIONALITY 
 * 	---------------------------------------------------------------------------
 */

$('#quickcontact-01').tabify();








/*
 * 	---------------------------------------------------------------------------
 *	GO UP BTN
 * 	---------------------------------------------------------------------------
 */
$('.btn-gototop').click( function(event){

	event.preventDefault();
	//console.log($(this).hash.offset().top);
	$('html, body').animate({ scrollTop: $(this.hash).offset().top }, 400 );

});




















/*
 * 	---------------------------------------------------------------------------
 *	BREADCRUMP DRAGABLE ON OVERFLOW
 * 	Uses hammer.js-jQuery to get touch-events
 * 	---------------------------------------------------------------------------
 */

(function( breadcrump, $, undefined ) {  


	

	var dragobj = $('.hsliding');
	var dragobjcontainer = $('.breadcrump');


	// return if breadcrump components don't exist.
	if( !dragobj.length || !dragobjcontainer.length )
		return;


	var hammertime = dragobj.hammer({ prevent_default: true, drag_block_horizontal: true,
        drag_block_vertical: true }); // gets the hammer.js jquery plugin

	//Hammer.plugins.fakeMultitouch();

	// ini drag-object position
	dragobj.prevPosX = dragobj.offset().left;

	console.log(dragobj.prevPosX);

	// calculate max & min drag boundaries
	var mindrag;
	var maxdrag = 0;
	calculateBounds();



	// refresh boundaries for the breadcrump - depends on windows size
	/*$(window).resize(function() {
	   calculateBounds();
	   //console.log(mindrag + ' -> ' + maxdrag);
	});*/



		// calculate boundaries for the breadcrump 
		function calculateBounds () {
			console.log(' scrollWidth: ' + dragobj[0].scrollWidth);
			mindrag = $(window).width() - dragobj[0].scrollWidth;
			mindrag > 0 ? mindrag = 0 : mindrag; 
			maxdrag = 0;

		}

		


	// save position on drag-start
	hammertime.on("dragstart dragend", function(event) {
		
		calculateBounds();
		dragobj.prevPosX = dragobj.offset().left;

	});

		// stop children from doing their normal job when draging ...
		hammertime.children().on("dragstart drag dragend", function(event) {
			event.preventDefault();
			if(!event.gesture) {
            	return;
        	}
        	event.gesture.preventDefault();
		});




	// change position during drag
    hammertime.on("drag dragleft dragright dragup dragdown", function(event) {

    	if(!event.gesture) {
            return;
        }
        event.gesture.preventDefault();
  		dragobj.offset({ left: getPosInBounds(event) });
    });



    // calculate position of the bradcrump inside the boundaries
    function getPosInBounds (event) {

 		var targetPos = dragobj.prevPosX + event.gesture.deltaX;
 		targetPos > maxdrag ? targetPos = maxdrag : targetPos;
 		targetPos < mindrag ? targetPos = mindrag : targetPos;
    	return targetPos;

    }


}( window.breadcrump = window.breadcrump || {}, jQuery ));














