<?php

class DTS_Instance
{
    public static function render()
    {
        $dts = new DTS();
        
        $dts->add('core.js');
        $dts->add('capability.js');
        $dts->add('browser.js');
        $dts->add('userAgent.js');
        $dts->add('screen.js');
        $dts->add('server.js');
        $dts->add('federation.php');
        
        return $dts->render();
    }
}