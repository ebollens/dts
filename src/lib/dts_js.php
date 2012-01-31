<?php

/**
 * Class definition for DTS_JS.
 * 
 * @package     DTS
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120130
 */

/**
 * Require the JSMin utility fule used by DTS_JS::minify().
 */
require_once(dirname(__FILE__).'/utilities/jsmin.php');

/**
 * Static utility class for Javascript handling in DTS.
 * 
 * @package     DTS
 */
class DTS_JS
{
    /**
     * Minify Javascript passed as $js.
     * 
     * @param string $js
     * @see JSMin
     * @return string 
     */
    public static function minify($js) 
    {
        return JSMin::minify($js);
    }
}