<?php

/**
 * Passthrough script for the device telemetry stack that returns the user back
 * to the originally-requested page.
 * 
 * @package     DTS
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120131
 */

/**
 * Require the DTS library file.
 */
require_once(dirname(dirname(__FILE__)).'/src/lib.php');

/**
 * Handle standards versus quirks mode to avoid capability flip-flopping.
 */
if(isset($_GET['mode']) && $_GET['mode'] == 'standards')
    echo '<!DOCTYPE html>';

/**
 * Output minimal HTML output conforming to HTML 5
 */
?><html><head><title></title></head><body><script type="text/javascript"><?php

/**
 * Output the DTS and then use GET parameter for return path.
 */

if(isset($_GET['return']))
{
    echo DTS_Instance::render();
    echo 'window.location = "'.$_GET['return'].'"';
}

        
?></script></body></html>