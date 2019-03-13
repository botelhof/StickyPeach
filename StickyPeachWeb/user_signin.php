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

            //email validation
            if (count($result) > 0) {

                $sql = "SELECT * 
				FROM User
                WHERE email = :email
                AND password = :password";

                $statement = $connection->prepare($sql);
                $statement->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
                $statement->bindParam(':password', $_POST['password'], PDO::PARAM_STR);
                $statement->execute();

                $foundPassword = false;
                for($i=0; $row = $statement->fetch(); $i++){
                    writeMsg("ok", $row['id'], '');
                    $foundPassword = true;
                    break;
                }

                if ($foundPassword == false) {
                    writeMsg("error", -1, 'User credentials not valid');
                }
            } else {
                writeMsg("error", -3, 'Email is not registered');
            }

            $connection = null;
    
        } catch(PDOException $error) {
            writeMsg("error", -2, $error->getMessage());
        }
        
    }
 
?>