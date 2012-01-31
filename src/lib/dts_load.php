<?php

/**
 * Class definition for DTS_Load.
 * 
 * @package     DTS
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120130
 */

/**
 * The DTS_Load static class provides a method for autoloading DTS class 
 * definition files.
 * 
 * @package     DTS
 */
class DTS_Load
{
    /**
     * Load a DTS class definition file by class $name. This method throws a
     * DTS_Load_Exception if the class definition file does not exist or the
     * class is not defined by the file.
     * 
     * @param string $name 
     * @throws DTS_Load_Exception
     */
    public static function lib($name)
    {
        $path = dirname(__FILE__).'/'.strtolower($name).'.php';
        
        if(!file_exists($path))
            throw new DTS_Load_Exception('Class definition file '.$name.' does not exist');
        
        include_once($path);
        
        if(!class_exists($name))
            throw new DTS_Load_Exception('Class definition file '.$name.' does not define the class');
    }
}
