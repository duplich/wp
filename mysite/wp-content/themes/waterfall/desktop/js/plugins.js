// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.














/*
 *  ---------------------------------------------------------------------------
 *  DROPDOWNMAKER
 *  ---------------------------------------------------------------------------
 */

/*  
    NEEDS: 
            jQuery 1.9.1 or maybe greater

    CALL: 
            <script>
                $(document).dropdownmaker( { trigger1: ".triggertype", trigger2: ".triggertype2", ... });
            </script>

    DOM: 
            It's up to you - use data-attributes for options and settings and define one or more class or id names as triggertype
*/

(function( $, undefined ) {  


        //  Add this data-attributs to your tags in your html code to call functions
        //  data-function {'dropout-open','dropout-close','dropout-toggle'}
        //  data-target-class { #nameoftarget }             // .class or #id
        //  data-default { 'dropout-opened','dropout-closed'}   :: Is dropout-widget opened or closed at start
        //
        //
        //


        // the trigger-classes or ids, change it for different naming conventin in your html or more types
        var TRIGGERS = {};

        // defines status of the btns and its class-naming for the status
        var STATUSCLASS =  {}

        // settings for this code
        var SETTINGS =  {}


        // functions available for the click-events
        var FUNCTIONS = {

            ATTR : 'data-function',
            open : 'dropout-open',
            close : 'dropout-close',
            toggle : 'dropout-toggle'

        };


        // naming of the data-target-class-attribute
        var TARGETS = {

            ATTR : 'data-target-class'

        };

        // default values which could be set by data-default-attribute
        var DEFAULTS = {

            ATTR : 'data-default',
            opened : 'dropout-opened',
            closed : 'dropout-closed'

        };

        // give it a unique .class or #id to which the window should scroll after the dropdown is closed
        var SCROLLBYCLOSE = {

            ATTR : 'data-closed-scroll-to'

        };

        // give it a unique .class or #id to which the window should scroll after the dropdown is opened
        var SCROLLBYOPEN = {

            ATTR : 'data-opened-scroll-to'

        };


        // extend
        var EXTENDONSTART = {

            ATTR : 'data-extend-onstart'

        };

        



        $.fn.dropdownmaker = function (triggers, options, statusclasses ) { 


            // triggers
            TRIGGERS = triggers || undefined;
            
            if( !TRIGGERS ) {
                console.log("WARNING: There's no trigger selector:: " + TRIGGERS + " :: in dropdownmaker() - $.fn.dropdownmaker" );
                return false;
            }
                
            // options
            SETTINGS = $.extend({

                    durationClose : 250,
                    durationOpen : 250,
                    durationToggle : 300,
                    durationScrollAfter : 400

            },options);


            // options
            STATUSCLASS = $.extend({

                opened : 'active',
                closed : 'inactive'

            },statusclasses);


            Ini();


        };


        






        /*
         *  add event listener functions and parse for default-settings on start
         */
        function Ini () {
            for( trigger in TRIGGERS ) {

                $( TRIGGERS[ trigger ] ).each( SetClickEvent );
                $( TRIGGERS[ trigger ] ).each( SetDefault );
            }
        }
        
        
            /*
             *  Set the default settings 
             *  Iterates at beginning through all trigger obj's and set their default values if it is set by its attributes
             */
             function SetClickEvent () {

                // only set a click event if it has a target-attribute and a function-attribute ...
                var target = $(this).attr( TARGETS.ATTR );
                var functions = $(this).attr( FUNCTIONS.ATTR );
           
                if( target && functions )
                    $(this).click( CallFunction );
             }




            /*
             *  Set the default settings 
             *  Iterates at beginning through all trigger obj's and set their default values if it is set by its attributes
             */
             function SetDefault () {

                  var defaulttype = $(this).attr( DEFAULTS.ATTR );
     
                  if( !defaulttype )
                    return;


                  switch( defaulttype ) {


                    case DEFAULTS.opened: 
                            $( $(this).attr( TARGETS.ATTR ) ).show();
                            RemoveStatusClasses( $(this) );
                            $(this).addClass( STATUSCLASS.opened );
                        return;


                    case DEFAULTS.closed: 
                            $( $(this).attr( TARGETS.ATTR ) ).hide();
                            RemoveStatusClasses( $(this) );
                            $(this).addClass( STATUSCLASS.closed );

                        return;


                    default:
                        console.log("WARNING: Can't find default-type:: " + defaulttype + " :: in main.js - SetDefault" );
                        return;

                }

            }





            /*
             *  Removes all status-classes from the obj - helper function
             *  @param:     obj :: DOM-Object which sould be cleaned from STATUSCLASS classes
             */
            function RemoveStatusClasses ( _obj ) {

                for( classes in STATUSCLASS ) {
                    _obj.removeClass( STATUSCLASS[classes] );
                }
            }


        /*
         *  Refreshes the status-classes for the trigger-btns to trigger styling
         *  @param:     targetclass :: unique .class or #id of the DOM-Object which sould be refreshed
         *              statusclass :: which new status should be added - choose it from STATUSCLASSS
         */
        function RefreshStatusClassesForTarget ( _targetclass, _statusclass) {

            var selector = "[" + TARGETS.ATTR + "='" + _targetclass + "']"; // type [attribute='value']
            
            $( selector ).each( function(){

                RemoveStatusClasses( $(this) );
                $(this).addClass( _statusclass );

            }); 

        }




        /*
         *  Reads the function form the data-function-attribute and calls it
         *  @param:     _event :: event-object from the event-listener
         *  @return:    undefined :: retuns nothing
         */
        function CallFunction( _event ) {

            _event.preventDefault();
            var functype = $( _event.currentTarget).attr( FUNCTIONS.ATTR );


            switch( functype ) {


                case FUNCTIONS.open: 
                        Open( _event );
                    break;


                case FUNCTIONS.close: 
                        Close( _event );
                    break;


                case FUNCTIONS.toggle: 
                        Toggle( _event );
                    break;


                default: 
                    console.log("WARNING: Can't find this function-type:: " + functype + " :: in main.js - dropoutCallFunction" );
                    return;

            }

            // general function-calls
            ExecuteAppendedFunction( _event );

        }




        /*
         *  Looks for a function provided by EXTENDONSTART.ATTR and tries to call it.
         *  @param:     _event :: event-object from the event-listener 
         */
        function ExecuteAppendedFunction( _event ){

            var onstart;

            if( onstart = $( _event.currentTarget ).attr( EXTENDONSTART.ATTR ) ) {

                var fn = GetFunctionFromString(onstart);

                if(typeof fn === 'function') {
                    fn();
                }

            }
        }

        
            /*
             *  Gets a function out of string
             *  @param:     _string :: string of a function name, with scope liek: scope.function 
             *  @return:    function :: retuns a function if it was found
             *              undefined :: if function couldn't be found
             */
            function GetFunctionFromString ( _string ){

                var scope = window;
                var scopeSplit = _string.split('.');

                for (i = 0; i < scopeSplit.length - 1; i++)
                {
                    scope = scope[scopeSplit[i]];

                    if (scope ===undefined) return;
                }

                return scope[scopeSplit[scopeSplit.length - 1]];
            }






        /*
         *  Returns an animation function-closure to animato to the given object
         *  @param:     _scrollto :: unique .class or #id to scoll to
         *              attribute :: SCROLLBYOPEN.ATTR or SCROLLBYCLOSE.ATTR
         *  @return:    function :: animation function closure
         */
        function ScrollTo ( _scrollto, _attribute ) {
            
            // scroll to 
                var scrollto = $(_scrollto).attr( _attribute );
            
                
                if( scrollto ){

                    if( !$(scrollto) )
                        return;

                    return function() { 

                        $('html, body').animate({ scrollTop: $(scrollto).offset().top }, SETTINGS.durationScrollAfter ); 

                    };
                }
        }






        /*
         *  Opens the dropout widget
         *  @param:     event :: event-object from the event-listener
         *  @return:    undefined :: retuns nothing
         */
        function Open( _event ) {

                var target = $( _event.currentTarget).attr( TARGETS.ATTR );
                if( !target ) {
                    console.log("WARNING: Can't find the target:: " + target + " :: in main.js - Open");
                    return;
                }

                $(target).slideDown( SETTINGS.durationOpen, ScrollTo( _event.currentTarget, SCROLLBYOPEN.ATTR ) );
                RefreshStatusClassesForTarget( target, STATUSCLASS.opened );
                return;

        }

            /*
             *  Force to opens a dropdown externalliy 
             *  @param:     target :: unique .class or #id of the DOM-Object which sould be opened
             *  @return:    undefined :: retuns nothing
             */
            $.fn.dropdownmaker.Open = function ( _target) {

                    if( !$( _target) ) {
                        console.log("WARNING: Can't find the target:: " + _target + " :: in main.js - dropdown.Open");
                        return;
                    }
                        
                    $( _target).slideDown( SETTINGS.durationOpen );
                    RefreshStatusClassesForTarget( _target, STATUSCLASS.opened );
                    return;

            }


        /*
         *  Closes the dropout widget
         *  @param:     event :: event-object from the event-listener
         *  @return:    undefined :: retuns nothing
         */
        function Close( _event ) {

                var target = $( _event.currentTarget ).attr( TARGETS.ATTR );
                if( !target ) {
                    console.log("WARNING: Can't find the target:: " + target + " :: in main.js - Close");
                    return;
                }
                $( target ).slideUp( SETTINGS.durationClose, ScrollTo( _event.currentTarget, SCROLLBYCLOSE.ATTR ) );
                RefreshStatusClassesForTarget( target, STATUSCLASS.closed );

                return;

        }

            /*
             *  Force to close a dropdown externalliy 
             *  @param:     target :: unique .class or #id of the DOM-Object which sould be closed
             *  @return:    undefined :: retuns nothing
             */
            $.fn.dropdownmaker.Close = function ( _target ) {

                    if( !$( _target ) ) {
                        console.log("WARNING: Can't find the target:: " + _target + " :: in main.js - dropdown.Close");
                        return;
                    }
                    $( _target ).slideUp( SETTINGS.durationClose );
                    RefreshStatusClassesForTarget( _target, STATUSCLASS.closed );

                    return;

            }


        /*
         *  Toggles opening/closing of the dropout widget
         *  @param:     event :: event-object from the event-listener
         *  @return:    undefined :: retuns nothing
         */
        function Toggle( _event ) {

                var target = $( _event.currentTarget ).attr( TARGETS.ATTR );
                if( !target ) {
                    console.log("WARNING: Can't find the target:: " + target + " :: in main.js - dropoutToggle");
                    return;
                }


                var statusclass;
                var scrollbyattr;

                if( $(target).is(':hidden') ) {

                    statusclass = STATUSCLASS.opened;
                    scrollbyattr = SCROLLBYOPEN.ATTR;

                } else {

                    statusclass = STATUSCLASS.closed;
                    scrollbyattr = SCROLLBYCLOSE.ATTR;

                }

                RefreshStatusClassesForTarget( target, statusclass );
                $(target).slideToggle( SETTINGS.durationToggle , ScrollTo( _event.currentTarget, scrollbyattr ));

                return;

        }



        


            /*
             *  Force to toggle a dropdown externalliy 
             *  @param:     target :: unique .class or #id of the DOM-Object which sould be toggled
             *  @return:    undefined :: retuns nothing
             */
            $.fn.dropdownmaker.Toggle = function ( _target ) {

                    if( !$( _target ) ) {
                        console.log("WARNING: Can't find the target:: " + _target + " :: in main.js - dropdown.ExternalToggle");
                        return;
                    }

                    RefreshStatusClassesForTarget( _target, $( _target ).is( ':hidden' ) ? STATUSCLASS.opened : STATUSCLASS.closed );
                    $( _target ).slideToggle( SETTINGS.durationToggle );
        
                    return;

            }

    

    

}( jQuery ));






















/*
 *  ---------------------------------------------------------------------------
 *  TABIFY - CREATE TAB FUNCTIONALLY
 *  ---------------------------------------------------------------------------
 */

/*  
    NEEDS: 
            jQuery 1.9.1 or maybe greater

    CALL: 
            <script>
                $('#yourtabcontainer').tabify();
            </script>

    DOM: 
            It's up to you - just choose the selectors for tabs an the specific windows so, that they are indentifyed
*/


(function( $, undefined ) {  

    

    $.fn.tabify = function (options){

        // options
        var opt = $.extend({

            tabselector : '.tabs a.tab',                // unique selector for the tabs - trigger, e.g.: '.tabs a.tab'
            windowselector : '.windows > div.window',   // unique selector for the windows - triggered by the tabs, e.g.: '.windows > div.window'
            statusactiveclass : 'active',
            statusinactiveclass : 'inactive',           // class name when your tab is the current tab
            scrolltotop : true,                         // boolean :: scroll the document to top of .this when opening the tabs first
            onTabClick : function() {}

        },options);

        // helper vars
        var tabs = [];
        var windows = [];
        var $this = $(this);
        


        // call functions
        Ini();
        IniClickEvent();


        /*
         *  Initializes tabs - hides them and adds classes to tab-trigger btn
         *  @param:     :: 
         *  @return:    undefined :: retuns nothing
         */
         function Ini () {

            // ini tabs
            tabs = $this.find( opt.tabselector );
            tabs.removeClass('active');
            tabs.addClass('inactive');

            // ini windows
            windows = $this.find( opt.windowselector );     
            windows.hide();

         }



        /*
         *  Initializes click events for tabs 
         *  @param:     :: 
         *  @return:    ::
         */ 
        function IniClickEvent () {

            tabs.click( tabClicked );

        }



        /*
         *  Code for click events of tabs 
         *  @param:     _event :: event-object from click event  
         *  @return:    ::
         */ 
        function tabClicked ( _event ) {

            _event.preventDefault();

            var $this = $(this);

            if( $this.hasClass( opt.statusactiveclass ) ) {

                // tab is active -> close all windows and stop
                $this.removeClass( opt.statusactiveclass );
                $this.addClass( opt.statusinactiveclass );
                windows.filter(this.hash).slideUp();
         
            } else if ( tabs.hasClass( opt.statusactiveclass ) ) {

                // another tab is active -> open another window
                windows.slideUp().filter(this.hash).slideDown();
                toggleStatusClasses( $this );

            } else {

                // no tab is active -> open specific window by hash and execute scrollTo function
                $(this.hash).slideDown( 250, opt.scrolltotop ? $.fn.tabify.scrollTo() : function () {} );
                toggleStatusClasses( $this );
                
            }

            // function called after click - add by options ... 
            opt.onTabClick.call( this );

            return;

        }


        /*
         *  Toggles status classes  
         *  @param:     $this :: $(this)
         *  @return:    
         */ 
        function toggleStatusClasses ( $this ) { 

            // handle class toggling 
            tabs.removeClass( opt.statusactiveclass );
            tabs.addClass( opt.statusinactiveclass );
            $this.removeClass('inactive');
            $this.addClass('active');

        }



    } 


    // defines the scrollTo function - could be overritten with your own code. 
    $.fn.tabify.scrollTo = function () { 

            return function () { 
             
                    $('html, body').animate({ scrollTop: $(this).offset().top }, 400 ); 

            };

    }
    

    

})( jQuery );


















/*
 *  ---------------------------------------------------------------------------
 *  SLIDIFY - CREATE SLIDESHOW FUNCTIONALLY
 *  ---------------------------------------------------------------------------
 */

/*  
    VERSION: 1.0

    NEEDS: 
            jQuery 1.9.1 or maybe greater
            Swipe 2.0.0 from Brad Birdsall - http://swipejs.com/

    CALL: 
            <script>
                $('.slidifyme').each( function( index ) {
                    $(this).slidify();
                });
            </script>

    DOM: 
            This DOM is required for full functionallity. The part with the classes .slidenav and
            .pagination is optionally.  

            <section class="slidifyme">

                <div class="slidenav">
                    <div class="prev"> ... your semantics </div>
                    <div class="next"> ... your semantics </div>
                </div>

                <div class='slider swipe'>
                  <div class='swipe-wrap'>
                    <div> ... your semantics </div>
                    <div> ... your semantics </div>
                    <div> ... your semantics </div>
                  </div>
                </div>

                <div class="pagination">
                    <div class="pagenumber"> ... your semantics </div>
                    <div class="pagenumber"> ... your semantics </div>
                    <div class="pagenumber"> ... your semantics </div>
                    <div class="pagenumber"> ... your semantics </div>
                    <div class="pagenumber"> ... your semantics </div>
                </div>
                
            </section>
            
*/
(function( $, undefined ) {  


    $.fn.slidify = function ( options ) { 



        var $this = $(this);


        // options
        var opt = $.extend({

            useprevnext : true,
            statusactiveclass : 'active',
            startslide : 0,
            speed : 400,
            auto : 5000,
            continuous : true

        },options);



        // selector names
        var SELECTORS = {
            slider : '.slider',
            pagenumberselector : '.pagenumber',
            prevbtn : '.prev',
            nextbtn : '.next'
        }


        // holds all pagenumbers items
        var PAGENUMBERS = $this.find( SELECTORS.pagenumberselector );
    


        // calls swipe.js
        try {

            $this.mySwipe = Swipe( $this.find( SELECTORS.slider )[0], {
                startSlide: opt.startslide,
                speed: opt.speed,
                auto: opt.auto,
                continuous: opt.continuous,
                disableScroll: false,
                stopPropagation: false,
                callback: function(index, elem) { togglePosition( $this.mySwipe.getPos() ); },
                transitionEnd: function(index, elem) { }
            });

            togglePosition( $this.mySwipe.getPos() );

        } catch(err) {

            console.log("ERROR: Can't execute jQuery.slidify() :: " + err.message + " :: in plugin.js - $.fn.slidify\n" +
                        "TIP: This jQuery-PlugIn needs swipe.js :: Maybe you've forgotten to include the swipe.js from http://swipejs.com/ before the call of this PlugIn?");
            return;

        }



        /*
         *  Adds click events for next and prev buttons 
         *  @param:     :: 
         *  @return:    
         */ 
        if ( opt.useprevnext ) {

             
            // prev btn event
            $this.find( SELECTORS.prevbtn ).click( function(_event){

                _event.preventDefault();
                $this.mySwipe.prev();

            });


            // next btn event
            $this.find( SELECTORS.nextbtn ).click( function(_event){

                _event.preventDefault();
                $this.mySwipe.next();

            });


            // pagination
            PAGENUMBERS.each( function( index ){

                // create enclosure function with index
                $(this).click( makeSlideToFunction(index) );

            });
        }
        



        /*
         *  Creates an enclosure function which stores the index 
         *  @param:     index :: index-value given by .each()
         *  @return:    function :: enclosure function 
         */

        function makeSlideToFunction( index ) {
            
            /*
             *  Calls a specific slide by index - swipe.js function 
             *  @param:     index :: slide index to slite to
             *              duration :: time to slide for
             *  @return:    :: 
             */
            return function() { 
                
                $this.mySwipe.slide(index, opt.speed );
                //togglePosition( index );

            };

        }



        /*
         *  Toggles the active-class for the pagenumbers
         *  @param:     _index :: slide index
         *  @return:     ::  
         */
        function togglePosition( _index ) { 
                
                if( !PAGENUMBERS.length )
                    return;
                PAGENUMBERS.removeClass( opt.statusactiveclass );
                $(PAGENUMBERS.get( _index )).addClass( opt.statusactiveclass );

            };



    } // end slidify


}( jQuery ));
