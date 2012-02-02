<?php

/**
 * Class definition for DTS_Instance.
 * 
 * @package     DTS
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120131
 */

/**
 * A class that encapsulates the instance of DTS in js.php and passthru.php.
 * 
 * @package     DTS
 * @see         /www/js.php
 * @see         /www/passthru.php
 */
class DTS_Instance
{
    public static function render()
    {
        $dts = new DTS();
        
        $dts->add('capability.js');
        $dts->add('browser.js');
        $dts->add('userAgent.js');
        $dts->add('screen.js');
        $dts->add('server.js');
        $dts->add('server/screen.js');
        
        return $dts->render();
    }
}