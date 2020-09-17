<?php
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
if (empty($_POST['formName']) && empty($_POST['formPhone'])) die();
if ($_POST)
{
http_response_code(200);
$subject = $_POST['formName'];
$authoremail = $_POST['authorEmail'];
$to = "$authoremail, joestalin14@yandex.ru";
$location = $_POST['pageLocation'];
$from = $_POST['formName'];
$msg = $_POST['formLabel'] . '<br>' . $_POST['formName'] . '<br>' . $_POST['formPhone'] . '<br>' . $_POST['pageLocation'];
$headers = "MIME-Version: 1.0\r\n";
$headers.= "Content-type: text/html; charset=UTF-8\r\n";
$headers.= "From: <" . $from . ">";
mail($to, $subject, $msg, $headers);
echo json_encode(array(
"sent" => true
));
}
else
{
echo json_encode(["sent" => false, "message" => "Something went wrong"]);
}
?>
