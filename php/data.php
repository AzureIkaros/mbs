<?php
    include 'conn.php';

    $result = $conn->query("select * from ordinary_img");
    $arrdata = array();
    for($i=0;$i<$result->num_rows;$i++){
        $arrdata[$i]=$result->fetch_assoc();
    }
    echo json_encode($arrdata);
?>