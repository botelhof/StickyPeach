<?php

/**
 * Configuration for database connection
 *
 */

$host       = "localhost";
$username   = "id8836583_stickyuser1";
$password   = "tCzZr69f7WF4pnx";
$dbname     = "id8836583_stickypeachdb";
$charset = 'utf8mb4';

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$dsn = "mysql:host=$host;dbname=$dbname;port=3306;charset=$charset";


?>