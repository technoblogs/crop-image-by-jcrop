<?php
$rowImageData 		= 	explode(',',$_POST['rowImageData']);
$imgDataString 		= 	$rowImageData[1];
$imgMimeType 		= 	$rowImageData[0];
$imgData 			= 	base64_decode($imgDataString);


$targ_w = $_POST['w'];
$targ_h = $_POST['h'];
$jpeg_quality = 90;


$img_r = imagecreatefromstring($imgData);
$dst_r = ImageCreateTrueColor( $targ_w, $targ_h );

imagecopyresampled($dst_r,$img_r,0,0,$_POST['x'],$_POST['y'],
$targ_w,$targ_h,$_POST['w'],$_POST['h']);


ob_start (); 
imagejpeg ($dst_r);
$image_data = ob_get_contents (); 
ob_end_clean (); 
$imgString =  $image_data_base64 = base64_encode ($image_data); 
echo $finalImage =  $imgMimeType.','.$imgString; die; ?>