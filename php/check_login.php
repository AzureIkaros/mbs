<?php
    include 'conn.php';

    if( (isset($_POST['email']) || isset($_POST['phone'])) && isset($_POST['password'])){
        if(isset($_POST['email'])){
            $email = $_POST['email'];
            $pass = $_POST['password'];
            $result = $conn->query("select * from userinfo where email={$email}")->fetch_assoc();
            if($pass == $result['password']){
                echo true;
            }else{
                echo false;
            }
        }
        if(isset($_POST['phone'])){
            $phone = $_POST['phone'];
            $pass = $_POST['password'];
            $result = $conn->query("select * from userinfo where phone={$phone}")->fetch_assoc();
            if($pass == $result['password']){
                echo true;
            }else{
                echo false;
            }
        }
    }
?>