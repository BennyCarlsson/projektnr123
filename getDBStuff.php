<?php
require_once "firebase/src/firebaseLib.php";
class GetDBStuff{
    const DEFAULT_URL = 'https://bekannelser.firebaseio.com/';
    const DEFAULT_TOKEN = '3jvmHLqrQstqyFkrU8bUQvaPfGeLXS9jdYCn8C7s';
    const DEFAULT_PATH = '/confessions/accepted';
    private $type = "";
    private $url = "";
    private $description = "";
    private $title = "";

    function __construct(){
        $url = $_SERVER["REQUEST_URI"];
        parse_str($url, $output);
        if(isset($output['/post?key'])){
            $key = $output['/post?key'];
            $firebase = new \Firebase\FirebaseLib("https://bekannelser.firebaseio.com/", "3jvmHLqrQstqyFkrU8bUQvaPfGeLXS9jdYCn8C7s");
            if(isset($key)){
                $firebaseResult = $firebase->get("/confessions/accepted/".$key);
                if($firebaseResult !== "null"){
                    $obj = json_decode($firebaseResult);
                    $this->type = "article";
                    $this->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                    $this->description = $obj->text;
                    $this->title = "Studentens Bekännelser";
                    return;
                }
            }
        }
        else if(isset($output['/post/?key'])){
            $key = $output['/post/?key'];
            $firebase = new \Firebase\FirebaseLib("https://bekannelser.firebaseio.com/", "3jvmHLqrQstqyFkrU8bUQvaPfGeLXS9jdYCn8C7s");
            if(isset($key)){
                $firebaseResult = $firebase->get("/confessions/accepted/".$key);
                if($firebaseResult !== "null"){
                    $obj = json_decode($firebaseResult);
                    $this->type = "article";
                    $this->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                    $this->description = $obj->text;
                    $this->title = "Studentens Bekännelser";
                    return;
                }
            }
        }
        $this->type = "article";
        $this->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $this->description = "Läs studenters bekännelser från alla universitet";
        $this->title = "Studentens Bekännelser";
    }
    function getType(){
        return $this->type;
    }
    function getUrl(){
        return $this->url;
    }
    function getDescription(){
        return $this->description;
    }
    function getTitle(){
        return $this->title;
    }
}
