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

$domain = 'localhost';
$script = 'dts/www/passthru.php';

echo 'dts.federation = { '
        .'domain:"'.$domain.'", '
        .'script:"'.$script.'"};';