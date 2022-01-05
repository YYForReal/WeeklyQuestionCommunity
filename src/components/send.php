<?php
$header = "From: noreply@example.com\r\n";
$header.= "MIME-Version: 1.0\r\n";
$header.= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$header.= "X-Priority: 1\r\n";

$to='bjyh345@163.com';
$subject='My Subject';
$message="这是第一封邮件";
$status = mail($to, $subject, $message, $header);

if($status)
{
    echo '<p>Your mail has been sent!</p>';
} else {
    echo '<p>Something went wrong. Please try again!</p>';
}