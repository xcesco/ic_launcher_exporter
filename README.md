ic_launcher_exporter script for Photoshop
==========================================

This script for Photoshop help you to create directly from a PSD file the collection of images to create:

 - icons for launcher
 - icons for notification area
 
Icons can be used in Android applications development within Eclipse with ADT plugin or Android studio IDE. The generated icons has following resolution (for dpi-density) for launcher icons:

 - **mdpi**: 48 x 48 px
 - **hdpi**: 72 x 72 px
 - **xhdpi**: 96 x 96 px
 - **xxhdpi**: 144 x 144 px
 - **xxxhdpi**: 192 x 192 px
 
And for notification area icons:
 
 - **mdpi**: 24 x 24 px
 - **hdpi**: 36 x 36 px
 - **xhdpi**: 44 x 44 px
 - **xxhdpi**: 66 x 66 px
 - **xxxhdpi**: 88 x 88 px 

Installation
------------
Just download the script **script/ic_launcher_exporter-${version}.jsx** from github repository to your photoshop plugin directory.

Usage
-----
In Photoshop, once you have opened your image, you can select script with menu `File -> Scripts -> Browse` .

![screenshot1](https://cloud.githubusercontent.com/assets/8819631/7304940/acdb4120-e9fa-11e4-8f0f-2bf6c11a325a.jpg)

When dialog appears, you can select the root folder where script generate needed files. Moreover you can select project layout you are using.

![screenshot2](https://github.com/xcesco/wikis/blob/master/ic_launcher_exporter/dialog1.3.png)

For launcher icon the default name is `ic_launcher`. For notification icon, the default name is `ic_notification`.

For eclipse project you have to select `<project folder>/res` as root folder. If not present, script will generate needed sub-folders. The generate files are:

 - `drawable-ldpi/${file_name}.png`
 - `drawable-mdpi/${file_name}.png`
 - `drawable-hdpi/${file_name}.png`
 - `drawable-xhdpi/${file_name}.png`
 - `drawable-xxhdpi/${file_name}.png`
 - `drawable-xxxhdpi/${file_name}.png`

You can define an alternative file name just typing a name in field `file name` under `Export folder and filename` panel. When you select the genera

For Android Studio layout, you have to select <project folder>/res as root foder. If not present, script will generate needed sub-folders. The generate files are:

 - `mipmap-ldpi/${file_name}.png`
 - `mipmap-mdpi/${file_name}.png`
 - `mipmap-hdpi/${file_name}.png`
 - `mipmap-xhdpi/${file_name}.png`
 - `mipmap-xxhdpi/${file_name}.png`
 - `mipmap-xxxhdpi/${file_name}.png`

Supported version of Android Studio is 1.1.0 and above. For previous version consider to use Eclipse layout.
