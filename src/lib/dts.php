<?php

/**
 * Class definition for DTS.
 * 
 * @package     DTS
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120201
 */

/**
 * An instance of the DTS class accepts a series of libraries and then provides
 * a mechanism for rendering these libraries out.
 * 
 * @package     DTS
 */
class DTS
{
    /**
     * Container that stores Javascript library files added by DTS->add($js)
     * that will be rendered by DTS->render().
     * 
     * @var array 
     */
    private $_js = array();
    
    /**
     * The path to the DTS Javascript library files.
     * 
     * @var string
     */
    private $_path;
    
    /**
     * Constructor that takes a $path to the DTS Javascript file directory, or
     * else false for the parameter to accept the default path ../js.
     * 
     * @param false|string $path 
     */
    public function __construct($path = false)
    {
        $this->_path = $path ? $path : dirname(dirname(__FILE__)).'/js';
    }
    
    /**
     * Determine if a library $js has already been added to the DTS object.
     * 
     * @param string $js
     * @return bool
     */
    public function has($js)
    {
        return in_array($js, $this->_js);
    }
    
    /**
     * Add a Javascipt library file by $js to the DTS object.
     * 
     * @param string $js
     * @return bool 
     */
    public function add($js)
    {
        if(self::has($js))
            return;
        
        if($dependencies = DTS_Dependency::get($js))
            foreach($dependencies as $dependency)
                $this->add($dependency);
        
        $this->_js[] = $js;
    }
    
    /**
     * Render the DTS Javascript output from the files added to the object. If
     * any of these files does not exist, this method will fail without any
     * output and instead throw a DTS_Library_Exception.
     * 
     * @throws DTS_Library_Exception
     * @return bool 
     */
    public function render()
    {
        ob_start();
        foreach($this->_js as $js)
        {
            if($path = $this->get_path($js))
            {
                include($path);
            }
            else
            {
                ob_end_clean();
                throw new DTS_Library_Exception('File '.$js.' does not exist');
            }
        }
        
        echo 'dts.execute();';
        $contents = ob_get_contents();
        ob_end_clean();
        
        return DTS_JS::minify($contents);
    }
    
    /**
     * Set the path to the Javascript library files that will be included.
     * 
     * @param string $path 
     */
    public function set_path($path)
    {
        $this->_path = $path;
    }
    
    /**
     * Get the path for library file by $name or false if does not exist.
     * 
     * @param string $name
     * @return string|false 
     */
    public function get_path($name = '')
    {
        $path = $this->_path.'/'.str_replace('_', '/', $name);
        return file_exists($path) ? $path : false;
    }
}
