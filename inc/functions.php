<?php



defined( 'ABSPATH' ) or die( 'No direct access' );

// Called by the js Ajax function

function d5tco_do_task(){
    $out = filterVariations();
    //die('Time: '  . date("h:i:sa") . $out) ;
    die( $out ) ;
}

function filterVariations() {

    $product_id = $_POST['product_id'];
    $grind =  $_POST['grind'];
    $frequency =  $_POST['frequency'];
    $size =  $_POST['size'];

    $query = new WP_Query( array(

    // Need to get the attributes in to narrow down the variations now
        'post_parent' => $product_id,
        'post_status' => 'publish',
        'post_type' => 'product_variation',
        'posts_per_page' => 15,
         'meta_query' => array(
            array(
                'key'   => 'attribute_pa_size',
                'value' => $size,
            ),
            array(
                'key'   => 'attribute_pa_grind',
                'value' => $grind,
            ),
             array(
                 'key'   => 'attribute_pa_delivery',
                 'value' => $frequency,
             ),
         ),
    ) );

   // $result = 'Getting variant for: ' . $_POST['product_id'] . ' ' . $_POST['grind'] . ' ' . $_POST['frequency'] . ' ' . $_POST['size'] . ' '  ;
   $result = array();
   
   if($query->have_posts()){
        while ($query->have_posts()){
            $query->the_post(); 
             
            // $result .= '<br> id = ' . $query->post->ID;
            // $result .= '<br> title = ' . $query->post->post_title;
            // $_product = wc_get_product( $query->post->ID );
            // $result .= $_product->get_price();
          
            $result['vid'] =  $query->post->ID;
            $result['title'] =   $query->post->post_title;
            $_product = wc_get_product( $query->post->ID );
            $result['price'] =   $_product->get_price();
          // var_dump( $query->post);
        } 
     }else{
        $result['title'] =   'error';
     }
     wp_reset_query();
//var_dump($result);
     //return '{ "name":"John", "age":30, "car":null }';
    return json_encode($result);

}
