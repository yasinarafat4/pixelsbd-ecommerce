<?php

if(!function_exists("theme_name")){
function theme_name (){
return env("ACTIVE_THEME") == null ? "Default" : env("ACTIVE_THEME");
}
}
