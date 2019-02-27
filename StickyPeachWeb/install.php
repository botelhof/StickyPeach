<?php

require "./config.php";

try {
    $connection = new PDO($dsn, $username, $password, $options);
    $sql = file_get_contents("initdb.sql");
    $connection->exec($sql);
    // echo $sql;
    
    $connection = null;
    echo "Database and table users created successfully.";
    
    // Create connection
    // $conn = new mysqli($host, $username, $password);

    // // Check connection
    // if ($conn->connect_error) {
    //     die("Connection failed: " . $conn->connect_error);
    // } 

} catch(PDOException $error) {
	echo $error->getMessage();
}


?>