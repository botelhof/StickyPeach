<?php
    if (isset($_POST)) {
        require "./utils.php";
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
                writeMsg("error", -1, "Email already exists");
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

                $last_id = $connection->lastInsertId(); 

                writeMsg("ok", $last_id, '');
            }

            $connection = null;
    
        } catch(PDOException $error) {
            writeMsg("error", -2, $error->getMessage());
        }
        
    }
 
?>