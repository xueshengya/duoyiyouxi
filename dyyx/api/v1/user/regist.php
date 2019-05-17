<?php
// 解决跨域：
header("Access-Control-Allow-Origin:*");

include("./config.php");

$username = $_POST['usernameval'];
$password = $_POST['passwordval'];

$sql = "insert into user (username,password) values ('$username','$password')";
// echo $sql;
$res = mysql_query($sql);

if($res) {
  echo json_encode(array(
    "res_code" => 1,
    "res_message" => "注册成功"
  ));
}else{
  echo json_encode(array(
    "res_code" => 0,
    "res_message" => "网络错误，注册失败，请重试"
  ));
}

?>