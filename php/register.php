<?php
    include 'conn.php';
    if( (isset($_POST['email']) || isset($_POST['phone'])) && isset($_POST['password'])){
        if(isset($_POST['email'])){
            $email = $_POST['email'];
            $pass = sha1($_POST['password']);
            $result = $conn->query("insert userinfo values(null,null,'{$email}','{$pass}',NOW())");
        }
        if(isset($_POST['phone'])){
            $phone = $_POST['phone'];
            $pass = sha1($_POST['password']);
            $result = $conn->query("insert userinfo values(null,'{$phone}',null,'{$pass}',NOW())");
        }
        if($result->fetch_assoc()){
            echo true;
        }else{
            echo false;
        }
    }else{
        exit("非法操作");
    }
?>