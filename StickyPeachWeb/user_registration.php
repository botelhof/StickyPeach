<?php
    if (isset($_POST)) {
        require "./config.php";
    
        try {
            $connection = new PDO($dsn, $username, $password, $options);

            $sql = "SELECT * 
				FROM User
				WHERE email = :email";

            $statement = $connection->prepare($sql);
            $statement->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
            $statement->execute();

            $result = $statement->fetchAll();

            if (count($result) > 0) {
                echo "Email already exists";
            } else {
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
                
                echo "ok";
            }

            $connection = null;
    
        } catch(PDOException $error) {
            echo $error->getMessage();
        }
        
    }
 
?>