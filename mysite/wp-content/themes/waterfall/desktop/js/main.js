


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

	var options = {};

	if( $(this).attr('data-slidify-useprevnext') ) 
	 	options.useprevnext = ($(this).attr('data-slidify-useprevnext') == "true") ? true : false;

	if( $(this).attr('data-slidify-speed') ) 
	 	options.speed = parseInt( $(this).attr('data-slidify-speed'), 10);

	if( $(this).attr('data-slidify-auto') ) 
	 	options.auto = parseInt( $(this).attr('data-slidify-auto'), 10);

	if( $(this).attr('data-slidify-continuous') ) 
	 	options.continuous = ($(this).attr('data-slidify-continuous') == "true") ? true : false;

	$(this).slidify( options );

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
 *	WAYPOINTS AND WAYPOINT NAVIGATION
 * 	---------------------------------------------------------------------------
 */

// sticky waypoint-navigation
$('#waypointnav').waypoint('sticky', {
	wrapper: '<div class="sticky-wrapper-no-height" />',
	offset: -60
});



// handle waypoint ini and navigation behaviour
(function( waypointnav, $, undefined ) {  


	var waypoints = {};
	var navlinks = {};


	// store waypoints and the links of the waypointnav navigation
	waypoints = $('.be-a-waypoint');
	navlinks = $('#waypointnav a');


	if( waypoints.length != navlinks.length ) {
		console.log("WARNING: Number of waypoints and links of the waypoint-navigation are different :: " + waypoints.length + " waypoints and " + navlinks.length + " waypoint-navigation-links :: in main.js - window.waypointnav" );
	}



	// add waypoints 
	waypoints.each ( function( _index ) {

			var $this = $(this);

			// prevent problems through waypoints.length != navlinks.length 
			if( _index >= navlinks.length ) 
				return;

			// add attribut with index
			$this.attr("data-waypoint-index", _index );
			// add waypoint event
			$this.waypoint( triggerActiveClass, {
				offset: 200
			});

			// add id if it hasn't one
			if( !$this.attr("id") ) 
				$this.attr("id", "waypoint-target-" + _index );


	});


	// add click events to waypoints
	navlinks.each ( function( _index ) {

			var $this = $(this);

			// prevent problems through waypoints.length != navlinks.length 
			if( _index >= waypoints.length ) 
				return;

			
			// use id of waypoint and add it to the link as hash
			$(navlinks.get( _index )).attr( "href", '#' + $(waypoints.get(_index)).attr( "id" ) );

			$this.click(function( _event ){

				_event.preventDefault();

				// animate to target
				$('html, body').animate({ scrollTop: $( this.hash ).offset().top - 30 }, 400 ); 

			});


	});




	/*
     *  Change active class on the waypoint navigation 
     *  @param:     :: 
     *  @return:    
     */ 
	function triggerActiveClass ( _direction ) {

		var $this = $(this);
		var index = $this.attr("data-waypoint-index");

		// scolling up means using previous waypoint
		if( _direction == "up" ) {

			index -= 1;

			index < 0 ? index = 0 : index;

		}

		navlinks.removeClass( "active" );
		$( navlinks.get( index ) ).addClass( "active" );

	}



}( window.waypointnav = window.waypointnav || {}, jQuery ));














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














