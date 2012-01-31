<?php

/**
 * Base library file for the DTS PHP classes that includes DTS_Load and 
 * registers DTS_Load::lib() as a class autoloader.
 * 
 * @package     DTS
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120130
 */

/**
 * Require the DTS_Load class definition.
 */
require_once(dirname(__FILE__).'/lib/dts_load.php');

/**
 * Set DTS_Load::lib() as a class autoloader.
 */
spl_autoload_register('DTS_Load::lib');