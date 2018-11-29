// Js File

// for the example: http://localwp.com/index.php/rest-test/ 



jQuery(document).ready(function($) {
  
    //Product Selection
    $( '#select-product li .addtocartbutton' ).click( function(){
        
        $( '#select-product li .addtocartbutton' ).removeClass('selected');
        $( '#select-product li .addtocartbutton' ).text('Select');
        $( this ).addClass('selected');
        $( this ).text('Selected');
        
        $( '.summary-product .value' ).text(   $( this ).data('value') );
        $( '.summary-product .title' ).text(   $( this ).data('title') );

        setProductInfo();

        $('html, body').animate({
            scrollTop: $("div.size").offset().top -75
        }, 500);
    });

    // Set Grind Type
    $( '#select-grind li a' ).click( function(){
        $( '#select-grind li a' ).removeClass('selected');
        $( this ).addClass('selected');
       
        $( '.summary-grind .value' ).text(  $( this ).data('value') );
        $( '.summary-grind .title' ).text(  $( this ).data('title') );
       
        setProductInfo();

        $('html, body').animate({
            scrollTop: $("div.frequency").offset().top -75
        }, 500);
    });

    // Delivery Frequency Selection
    $( '#select-frequency li a' ).click( function(){
       
        $( '#select-frequency li a' ).removeClass('selected');
        $( this ).addClass('selected');
        $( '.summary-frequency .value' ).text( $( this ).data('value') );
        $( '.summary-frequency .title' ).text( $( this ).data('title') );

        setProductInfo();

        $('html, body').animate({
            scrollTop: $("div.summary").offset().top -75
        }, 500);
    });

    //Bag Size
    $( '#select-size li a' ).click( function(){
       
        $( '#select-size li a' ).removeClass('selected');
        $( this ).addClass('selected');
        $( '.summary-size .value' ).text( $( this ).data('value') );
        $( '.summary-size .title' ).text( $( this ).data('title') );
        setProductInfo();
        $('html, body').animate({
            scrollTop: $("div.grind").offset().top -75
        }, 500);
    });


    ////Add to Cart
    // $( '#subscribe-button' ).click( function(event){
    //     event.preventDefault();
    //     var addURL = $( '.summary-url .value' ).text();
    //     window.location.href = addURL;
    //     //setProductInfo();
    // });
    function subscribeClick( event ){
        event.preventDefault();
        var addURL = $( '.summary-url .value' ).text();
        window.location.href = addURL;
    }

    function setProductInfo(){

        
        var _product_id = $( '.summary-product .value' ).text(),
        _grind = $( '.summary-grind .value' ).text(),
        _frequency = $( '.summary-frequency .value' ).text(),
        _size = $( '.summary-size .value' ).text(),
        subButton = document.getElementById( 'subscribe-button' );

        subButton.removeEventListener( 'click', subscribeClick );

        if( '' != _product_id && '' != _grind  && '' != _frequency  && '' != _size ){

            jQuery.ajax({
                type: 'POST',
                url: d5tco_ajaxscripts.ajaxurl,
                   data: {
                    action: 'd5tco_do_task',
                    product_id: _product_id,
                    grind: _grind,
                    frequency: _frequency,
                    size: _size
                },
               dataType: 'json',
                success:function(data, textStatus, XMLHttpRequest){
    
                    jQuery( '#order-output' ).html('');
                   // jQuery( '#order-output' ).append('Data: ' + data);
                    console.log('returned ' + data.title) + ' ' + data.vid;
                    $( '.summary-price' ).text( 'Price: $' + data.price + ' '  +  $( '.summary-frequency .title' ).text() );
                    
                    var addURL = '/?add-to-cart=' + $( '.summary-product .value' ).text(); // product ID
                    addURL = addURL + '&variation_id=' + data.vid;
                    addURL = addURL + '&attribute_pa_grind=' + _grind;
                    addURL = addURL + '&attribute_pa_size=' + _size;
                    addURL = addURL + '&attribute_pa_delivery=' + _frequency;
                    $( '.summary-url .value' ).text( addURL );
                    subButton.addEventListener( 'click', subscribeClick );
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    console.log( textStatus);
                    console.log(XMLHttpRequest);
                    console.log(errorThrown);
                }
            
             });
        }else{
            $( '.summary-price' ).text( 'Select more options' );
        
        }

       
    }

    /**
     * Summary Edit Buttons
     */

    $( '.summary-product .summary-edit' ).click(function( event ){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("div.one").offset().top -75
        }, 500);
    });

    $( '.summary-size .summary-edit' ).click(function( event ){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("div.size").offset().top -75
        }, 500);
    });

    $( '.summary-grind .summary-edit' ).click(function( event ){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("div.grind").offset().top -75
        }, 500);
    });

    $( '.summary-frequency .summary-edit' ).click(function( event ){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("div.frequency").offset().top -75
        }, 500);
    });
  
});