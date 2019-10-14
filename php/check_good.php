<?php
    include "conn.php";

    if(isset($_GET['sid'])){
        $sid = $_GET['sid'];
        $result = $conn->query("select * from ordinary_img where sid={$sid}");
        echo json_encode($result->fetch_assoc());
    }else{
        echo "非法操作";
    }
    
?>