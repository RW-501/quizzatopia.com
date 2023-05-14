<?php

     // 	echo "cheeeee 22222222222";

   
		$DB_HostName = "sql312.epizy.com";

		$DB_Name = "epiz_34195327_quizzatopia_db";

		$DB_User = "epiz_34195327";

		$DB_Pass = "C6GHXG69YF";

	//Check to see if we can connect to the server

	$db_conx = mysqli_connect($DB_HostName, $DB_User, $DB_Pass, $DB_Name);
	//$connection = mysql_connect($DB_HostName, $DB_User, $DB_Pass);

	//echo "SuccessConX" . $DB_HostName . "      ";

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
} else {
	//echo "SuccessConX";
}
//set currency to us
setlocale(LC_MONETARY,"en_US");

//The Security Code
	function clean_Input($db_conx,$input)
{
    	$outPut1 =  mysqli_real_escape_string($db_conx, $input);

    $output2 = htmlspecialchars($outPut1);
    
    return $output2;
}
// $output = clean_Input($db_conx,$input);


///The $ Code
	function add_dollar_sign_input($input){
		
		$input = money_format("%.2n", $input);
		$output = "$input"; 
		
		return $output;
	}
// $output = add_dollar_sign_input($number);


///The $ Code
	function remove_dollar_sign_input($input){
		
		$output = str_replace("$","","$input");
		
		return $output;
	}
 //  $output = remove_dollar_sign_input($number);











/// main
/// include_once("../../../db_Conx/db_Conx/index.php");


/// folder
/// include_once("../../db_Conx/index.php");
		
		//$path = $_SERVER['DOCUMENT_ROOT'];
  // $path .= "/HoodAwards/Includes/db_Conx/index.php";
   //include($path);
   

// Set your timezone!!
date_default_timezone_set('America/Chicago');
	    //$now =date('Y-m-d H:i:s');

function time_elapsed_string($datetime, $full = false) {
    $now = new DateTime;
    $ago = new DateTime($datetime);
    $diff = $now->diff($ago);

    $diff->w = floor($diff->d / 7);
    $diff->d -= $diff->w * 7;

    $string = array(
        'y' => 'year',
        'm' => 'month',
        'w' => 'week',
        'd' => 'day',
        'h' => 'hour',
        'i' => 'minute',
        's' => 'second',
    );
    foreach ($string as $k => &$v) {
        if ($diff->$k) {
            $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
        } else {
            unset($string[$k]);
        }
    }

    if (!$full) $string = array_slice($string, 0, 1);
    return $string ? implode(', ', $string) . ' ago' : 'just now';
}




/*
echo time_elapsed_string('2013-05-01 00:22:35');
echo time_elapsed_string('@1367367755'); # timestamp input
echo time_elapsed_string('2013-05-01 00:22:35', true);
*/




?>
