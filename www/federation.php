<?php

/**
 * Definition of the dts.federation object responsible for exposing data about
 * the federated "central" host to which all device telemetry should be 
 * offloaded.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120201
 */

/**
 * Require the DTS library file.
 */
require_once(dirname(dirname(__FILE__)).'/src/lib.php');

/**
 * Set document headers. Cache expires immediately as state may change within
 * federated source at any time.
 */
header('Content-Type: text/javascript');
header("Expires: Wed, 11 Jan 1984 05:00:00 GMT");
header('Content-Type: text/javascript');

/**
 * Define domain property for dts.federation by mutating $_SERVER['HTTP_HOST'].
 * 
 * @todo dts.federation.domain needs to be made configurable
 * @todo can this be pulled out into its own script so js.php can be cached?
 */
$domain = $_SERVER['HTTP_HOST'];

if(($i = strpos($domain, '://')) !== false)
    $domain = substr($domain, $i+3);
elseif(substr($domain, 0, 2) == '//')
    $domain = substr($domain, 2);

if(($i = strpos($domain, '/')) !== false)
    $domain = substr($domain, $i);

if(($i = strpos($domain, ':')) !== false)
    $domain = substr($domain, $i);

if(substr($domain, 0, 1) == '.')
    $domain = substr($domain, 1);

/**
 * Define script property for dts.federation.
 * 
 * @todo dts.federation.script needs to be made configurable
 */
$script = 'dts/www/passthru.php';

/**
 * Define cookies property for dts.federation.
 */
$cookies = '|'.implode('|', DTS_Cookie::get_all_names()).'|';

/**
 * Output dts.federation object definition with calculated values.
 */
echo 'dts.federation = {'
        .'domain:"'.$domain.'", '
        .'script:"'.$script.'", '
        .'cookies:"'.$cookies.'"'
        .'};';
