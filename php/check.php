<?php
    include 'conn.php';
    if( (isset($_POST['email']) || isset($_POST['phone'])) ){
        if(isset($_POST['email'])){
            $email = $_POST['email'];
            $result = $conn->query("select * from userinfo where email='{$email}'");
        }
        if(isset($_POST['phone'])){
            $phone = $_POST['phone'];
            $result = $conn->query("select * from userinfo where phone='{$phone}'");
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