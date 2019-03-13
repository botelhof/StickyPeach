<?php
    function writeMsg($code, $id, $error) {
        echo '{ "code":"' . $code . '", "id":' . $id . ', "error":"'. $error . '"}';
    }
?>