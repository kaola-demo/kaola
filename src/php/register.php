<?php
include "./conn.php";
$act = $_GET['act'];
$username = strtolower($_GET['username']);
$password = $_GET['password'];
// $query="SELECT * FROM user WHERE username='$user' AND password='$$pass'";
// $result=mysqli_query($conn,$query);
// $rows=mysqli_num_rows($result);
// if($rows){
// 	setcookie('id',$un,time()+24*60*60);
// 	$url1='../index.html';
// 	//echo "登录成功";
// 	echo "<script> window.location.href='$url1';</script>"; 
   
// }else{
// 	$url2='../zhuce.html';
// 	echo "<script> window.location.href='$url2';</script>";
// }
switch($act){
	case 'add':

		if($username==''||$username==null){
			echo $_GET['callback'].'({"err":"1","msg":"用户名不能为空"})';
			exit();
		}

		if($password==''||$password==null){
			echo $_GET['callback'].'({"err":"1","msg":"密码不能为空"})';
			exit();
		}
		$sql = "SELECT * FROM sheet1 WHERE username=$username";
		
		$res = mysqli_query($conn,$sql);
		
		$row = mysqli_num_rows($res);
		
		if((int)$row>0){
			echo $_GET['callback'].'({"err":"1","msg":"此用户名已被占用"})';
			exit();
		}else{
		$sql = "INSERT INTO sheet1 (username,password) VALUES('{$username}','{$password}')";
		mysqli_query($conn,$sql);

		echo $_GET['callback'].'({"err":"0","msg":"注册成功"})';
	}
		break;
		
	case 'login':
		$sql = "SELECT COUNT(*) FROM username WHERE username='{$username}' AND password='{$password}'";
		$res = mysqli_query($conn,$sql);
		
		$row = mysqli_fetch_array($res);
		
		if((int)$row[0]>0){
		
			echo $_GET['callback'].'({"err":"0","msg":"登录成功"})';
			
			exit();
		}else{
		
			echo $_GET['callback'].'({"err":"1","msg":"用户名或密码有误"})';
			
			exit();
		}
		break;
}
?>