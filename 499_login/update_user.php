<?php
require 'init.php';

$userId = $_POST['userId'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];

$sql = "UPDATE manager SET first_name='{$firstName}', last_name='{$lastName}' WHERE phone_number={$userId}";
$result = $mysqli->query($sql);
echo "<script>javascript:alert('update successful!');location.href='manage_users.php';</script>";
exit();
