<?php

/**
 * Class definition for DTS_Cookie.
 * 
 * @package     DTS
 * @author      Eric Bollens
 * @copyright   Copyright (c) 2012 UC Regents
 * @license     BSD
 * @version     20120201
 */

/**
 * A static class that provides access to DTS cookies by name (excluding the DTS
 * cookie prefix). These are set by the DTS Javascript when on the SP domain.
 * 
 * @package     DTS
 */
class DTS_Cookie
{
    /**
     * The prefix of all DTS cookies.
     * 
     * This value should NOT be changed unless the value in dts.server is
     * also changed.
     * 
     * @var string
     */
    const PREFIX = 'd_';
    
    /**
     * Recursive version of stripslashes for a deep operation through array.
     * 
     * @param string|array $value
     * @return type 
     */
    protected static function stripslashes_deep($value) 
    {
        return is_array($value) ? array_map('stripslashes_deep', $value) : stripslashes($value);
    }
    
    /**
     * Get the value of the cookie by $name, excluding the DTS prefix value, 
     * which will be automaticlaly prepended.
     * 
     * @param string $name
     * @return string 
     */
    public static function get($name) 
    {
        $name = get_magic_quotes_gpc() ? addslashes(self::PREFIX.$name) : self::PREFIX.$name;

        if(!isset($_COOKIE[$name]))
            return null;

        return get_magic_quotes_gpc() ? self::stripslashes_deep($_COOKIE[$name]) : $_COOKIE[$name];
    }

    /**
     * Set the value of a cookie by $name, excluding the DTS prefix, which will
     * be automatically prepended.
     * 
     * @param string $name
     * @param string $value
     * @param int $expire
     * @param string $path
     * @return boolean 
     */
    public static function set($name, $value, $expire=0, $path='/') 
    {
        return setcookie(self::PREFIX.$name, $value, $expire, $path);
    }

    /**
     * Get an array of all cookie names with the DTS prefix.
     * 
     * @return array 
     */
    public static function get_all_names() 
    {
        $rv = array();
        foreach(array_keys($_COOKIE) as $name) 
        {
            if(strpos($name,self::PREFIX)===0) 
            {
                $rv[] = substr($name, strlen(self::PREFIX), strlen($name));
            }
        }
        return $rv;
    }
}

