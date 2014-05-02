<?php
include('simple_html_dom.php');
$target_url = 'http://www.robotstxt.org//';
$html = new simple_html_dom();
$html = file_get_html($target_url);

//dota lounge
$dotaPattern = '#s\/[a-zA-Z0-9\&\.]+[.]#';
//sc2
$sc2Pattern = '#Robots#';

$index = 0;
foreach($html->find('h2') as $link){
	$source = $link->style;

	if(preg_match($sc2Pattern, $source, $matches)) {
		$games[$index] = $matches[0];
		$index++;
	}
}

for ($i = 0; $i<sizeof($games);$i++){
	echo $games[$i] . ' <b>VS</b> ' . $games[$i+1] . '<br>';
	$i++;
}

?>