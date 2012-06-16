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
    ?>
        
    dts.execute();
    
    var regex = new RegExp("[\\?&]return=([^&#]*)");
    var results = regex.exec(window.location.search);
    if(results != null){
        var loc = decodeURIComponent(results[1].replace(/\+/g, " "));
        if(loc.indexOf('?') == -1) loc += "?";
        if(loc.indexOf('?') < loc.length-1) loc += "&";
        loc += dts.server.loopProtector;
        window.location = loc;
    }
    
    <?php
}

        
?></script></body></html>