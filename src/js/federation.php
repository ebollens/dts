<?php

/**
 * Definition of the dts.federation object responsible for exposing data about
 * the federated "central" host to which all device telemetry should be 
 * offloaded.
 * 
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2011-12 UC Regents
 * @license     BSD
 * @version     20120131
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

$script = 'dts/www/passthru.php';

echo 'dts.federation = { '
        .'domain:"'.$domain.'", '
        .'script:"'.$script.'"};';