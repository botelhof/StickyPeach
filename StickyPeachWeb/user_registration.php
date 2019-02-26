<?php
    if($_POST && ($_POST["email"] || $_POST["password"]))
    {
        echo $_POST['email'];
        echo $_POST['password'];
    }
    else
    {
        echo "fuckkkk";
    }
 
?>