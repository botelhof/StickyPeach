<?php
    if (isset($_POST)) {
        require "./config.php";
    
        try {
            $connection = new PDO($dsn, $username, $password, $options);

            $new_user = array(
                "email" => $_POST['email'],
                "password"  => $_POST['password']
            );

            $sql = sprintf(
                    "INSERT INTO %s (%s) values (%s)",
                    "User",
                    implode(", ", array_keys($new_user)),
                    ":" . implode(", :", array_keys($new_user))
            );

            $statement = $connection->prepare($sql);
            $statement->execute($new_user);

            $connection = null;
    
        } catch(PDOException $error) {
            echo $error->getMessage();
        }
        
    }
 
?>