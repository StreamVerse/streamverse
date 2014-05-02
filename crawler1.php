<?php
include('simple_html_dom.php');
$target_url = 'http://www.dota2lounge.com/';
$html = new simple_html_dom();
$html = file_get_html($target_url);

$pattern = '#teams\/[a-zA-Z0-9\.]+[.]#';
$pattern2 = '#s\/[a-zA-Z0-9\&\.]+[.]#';

$index = 0;
foreach($html->find('div.team') as $link){
	$source = $link->style;

	if(preg_match($pattern2, $source, $matches)) {
		$games[$index] = $matches[0];
		$index++;
	}
}

for ($i = 0; $i<sizeof($games);$i++){
	echo $games[$i] . ' <b>VS</b> ' . $games[$i+1] . '<br>';
	$i++;
}

?>