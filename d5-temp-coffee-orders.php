<?php

defined( 'ABSPATH' ) or die( 'No direct access' );

/*
Plugin Name: D5 Temp Coffee Orders
Plugin URI:  https://design519.com
Description: SIngle page coffee ordering wizard plugin
Version:     1.0.0
Author:      Duane Hass
Author URI:  https://design519.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

require_once('inc/display.php');
require_once('inc/functions.php');

/*
|--------------------------------------------------------------------------
| SCRIPTS AND STYLES
|--------------------------------------------------------------------------
*/

add_action( 'wp_enqueue_scripts', 'register_d5tco_scripts' );

function register_d5tco_scripts() {

  $scriptversion =  filemtime(  plugin_dir_path( __FILE__ ) . 'js/main-scripts.js');
  $styleversion =  filemtime(  plugin_dir_path( __FILE__ ) . 'css/styles.css');

  wp_enqueue_style( 'd5tco-main-styles', plugins_url( '/css/styles.css' , __FILE__ ), array(), $styleversion );
  wp_enqueue_script( 'd5tco-main-scripts', plugins_url( '/js/main-scripts.js' , __FILE__ ), array(), $scriptversion, true );

  // Set up script for use with Ajax
	wp_localize_script( 'd5tco-main-scripts', 'd5tco_ajaxscripts', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );

}

// creating Ajax call for WordPress
add_action( 'wp_ajax_nopriv_d5tco_do_task', 'd5tco_do_task' );
add_action( 'wp_ajax_d5tco_do_task', 'd5tco_do_task' );
