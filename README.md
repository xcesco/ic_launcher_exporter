ic_launcher_exporter script for Photoshop
==========================================

This script for Photoshop help you to create directly from a PSD file the collection of images to use as ic_launcher in android applications development within Eclipse with ADT plugin or Android studio IDE. The icons generated cover following resolution (for dpi-density):

 - **ldpi**: 36 x 36 px
 - **mdpi**: 48 x 48 px
 - **hdpi**: 72 x 72 px
 - **xhdpi**: 96 x 96 px
 - **xxhdpi**: 144 x 144 px
 - **xxxhdpi**: 192 x 192 px

Installation
------------
Just download the script **script/ic_launcher_exporter-1.0.0.jsx** from github repository to your photoshop plugin directory.

Usage
-----
In Photoshop, once you have opened your image, you can select script with menu `File -> Scripts -> Browse` . When dialog appears, you can select the root folder where script generate needed files. Moreover you can select project layout you are using.

For eclipse project you have to select `<project folder>/res` as root folder. If not present, script will generates folders. The generate files are:

 - `drawable-ldpi/ic_launcher.png`
 - `drawable-mdpi/ic_launcher.png`
 - `drawable-hdpi/ic_launcher.png`
 - `drawable-xhdpi/ic_launcher.png`
 - `drawable-xxhdpi/ic_launcher.png`
 - `drawable-xxxhdpi/ic_launcher.png`

For Android Studio layout, you have to select <project folder>/res as root foder. If not present, script will generate folders. The generate files are:

 - `mipmap-ldpi/ic_launcher.png`
 - `mipmap-mdpi/ic_launcher.png`
 - `mipmap-hdpi/ic_launcher.png`
 - `mipmap-xhdpi/ic_launcher.png`
 - `mipmap-xxhdpi/ic_launcher.png`
 - `mipmap-xxxhdpi/ic_launcher.png`

Supported version of Android Studio is 1.1.0. For previous version consider to use Eclipse layout.
