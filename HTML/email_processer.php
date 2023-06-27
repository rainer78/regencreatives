<?php


if($_POST["message"]) {


mail("your@email.address", "Contact Us Message from Regen Creatives.com",


$_POST["name;email;comments"]. "From: an@email.address");


}


?>