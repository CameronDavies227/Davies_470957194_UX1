<?php
class users{
    Private $username;
    Private $firstname;
    Private $lastname;
    Private $password;
    Private $role;    

    public function get_information( $username, $firstname, $lastname, $password, $role){
        $this->username=$username;	
        $this->firstname=$firstname;
        $this->lastname=$lastname;
        $this->password=$password;
        $this->role=$role;
    }

    public function insert_user($pdo){
        #set up query for checking how many usernames match new username
        $query1="Select count(*) from users where username=:un";
        $stmt1=$pdo->prepare($query1);
        #define new username
        $stmt1->bindParam(":un", $this->username);
        #run query
        $stmt1->execute();
        #check if any match new username in database if not insert new user
        $ct = $stmt1->fetchColumn();
        if($ct == 0){
            #this hashes the password before it is intalled
            $hashed_password=password_hash($this->password,PASSWORD_DEFAULT);
            #setting up the query
            $query = "INSERT INTO users(`username`,`firstname`, `lastname`,`password`,`role`) VALUES(:un,:fn,:ln,:p,:r)";
            $stmt=$pdo->prepare($query);
            #defining elements for the query
            $stmt->bindParam(":un", $this->username);
            $stmt->bindParam(":fn", $this->firstname);
            $stmt->bindParam(":ln", $this->lastname);
            $stmt->bindParam(":p", $hashed_password);
            $stmt->bindParam(":r", $this->role);
            #running the query
            $stmt->execute();
            return("Saved");
        } else{
            return("Not Saved");
        }
    } 

    public function update_user($pdo){
        #set up query for updating the user
        $query = "UPDATE users SET firstname=:fn,lastname=:ln,password=:p,role=:r where username=:un";
        $stmt=$pdo->prepare($query);
        #defining elements for the query
        $stmt->bindParam(":un", $this->username);
        $stmt->bindParam(":fn", $this->firstname);
        $stmt->bindParam(":ln", $this->lastname);
        $stmt->bindParam(":p", $this->password);
        $stmt->bindParam(":r", $this->role);
        #running the query
        $stmt->execute();
    }

    public function get_usernames($pdo){
        $query="SELECT * FROM users";
        $stmt=$pdo->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row;
    }

    public function search_user_by_username($pdo, $username){
        $query = "SELECT * FROM users WHERE username=?";
        $stmt = $pdo->prepare($query);
        $stmt->execute(array($username));
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row;
    }

    public function display_all_users($pdo){
        $query = "SELECT * FROM users";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $records = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $records[] = $row;
        }
    return $records;
    }

    public function delete_user($pdo, $username){
        #set up query for deleting the user
        $query = "Delete FROM users where username=?";
        $stmt = $pdo->prepare($query);
        #running the query
        $stmt->execute(array($username));
    }

    public function loginCheck($pdo,$username,$password){
        // Check if session variable is set
        if (isset($_SESSION['username'])) {
            header('Location:../view/displaybook.php');
        } else {
            // Not logged in check credentials- empty and if not empty - are correct and if correct store username in a session variable
            if (empty($username) || empty($password)) {
                header('Location:../index.php?msg=Empty credentials');
                exit();
            }else{
                $query = "SELECT * FROM users WHERE username = :un";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(":un", $username);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $stored_hashed_password = $row['password'];
                //check if credentials match
                if(password_verify($password, $stored_hashed_password)) {
                    //if credentials match, then create a session variable to store the infromation
                    session_start();
                	$_SESSION['username'] = $row['username'];
                    $_SESSION['role'] = $row['role'];
                	header('Location:../view/displaybook.php');
                	exit();
                }else {
                    header('Location: ../index.php?msg=Credentials do not match');
                    exit();
                }
            }
        }
    }

}
?>