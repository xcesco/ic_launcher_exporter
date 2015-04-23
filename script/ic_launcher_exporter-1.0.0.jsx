/**

	The MIT License (MIT)

	Copyright (c) 2015 Francesco Benincasa ( abubusoft@gmail )

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

**/

/*
	PSD IC_LAUNCHER EXPORTER by Francesco Benincasa
	
	History 
	-------
	
	Version 1.0.0 - 2015/04/23
	--------------------------
	First release. You can select root folder from which create or fill subdirectory with ic_launcher files generated from actual PSD file.

*/

/* 
    The original file is 864x864.
    
    Image sizes to save:
    
    ["192px","192px", "xxxhdpi"],
    ["144px","144px", "xxhdpi"],
    ["96px", "96px", "xhdpi"],
    ["72px", "72px", "hdpi"],
    ["48px", "48px", "mdpi"],
    ["36px", "36px", "ldpi"]
    
    The various states (each image) is in a layer comp.
    
    Process:
   
    Loop through the image sizes.
    -- Save history state.
    -- Resize to the current image size.
    -- Save image
    -- Restore the history state to return to the full-sized image.
        
*/

const APP="ic_launcher psd exporter";
const VERSION="1.0.0";
const AUTHOR="Francesco Benincasa, ( abubusoft@gmail.com )";

const PROJECT_TYPE_ANDROID_STUDIO="ANDROID_STUDIO";
const PROJECT_TYPE_ECLIPSE="ECLIPSE";

function isDocumentNew(){ 
	try {
		var dummy=app.activeDocument.path.fsName;
		return false;
	}
	catch(err) {

		return true;
	}
}

function main() {

	if (documents.length == 0) {
		alert("There are no documents open.");
		return;
	}
	
	
	if(isDocumentNew()){// X's function 
		alert("New document must saved before script can proceed. Save and try again.");
		return;
	} 
	 
	
	w = app.activeDocument.width.as('px');
	h = app.activeDocument.height.as('px');
		
	if (parseInt(w)!=parseInt(h) || 864!=parseInt(w))
	{
		alert("Current size is ("+w+"x"+h+"), but image must be 864x864.");
		return;
	}
	 
	var docRef = app.activeDocument;
	 
	var layerComps = docRef.layerComps;
	var numLayerComps = layerComps.length;
	var layers = docRef.layers;
	var numLayers = layers.length;
	 
	var imageSizes = [
		["192px","192px", "xxxhdpi"],
		["144px","144px", "xxhdpi"],
		["96px", "96px", "xhdpi"],
		["72px", "72px", "hdpi"],
		["48px", "48px", "mdpi"],
		["36px", "36px", "ldpi"]
	]; 

	var proceed=false;
	var exportType=PROJECT_TYPE_ANDROID_STUDIO;
	var rootFolder=docRef.path.fsName;

	var dlg = new Window("dialog{text:'"+APP+" - "+VERSION+" by "+AUTHOR+"',alignChildren: ['fill', 'top'],  \
		preferredSize:[500, 200], \
		buh: StaticText { text:'This script creates, from current image, different resolution png to use as ic_launcher for Android Platform.'},\
		folder: Panel { \
			orientation: 'row', \
			alignChildren: 'left', \
			margins:15, \
			text: ' Base folder for export ', \
			buh: StaticText { text:'Root folder: '},\
			txtValue:EditText{ text:'' , characters: 80 , properties:{multiline:false,noecho:false,readonly:false}},\
			btnBrowse:Button{ text:'...' }\
		},\
		exportType: Panel { \
			text: ' Project structure ', \
			orientation: 'row', \
			alignChildren: 'left', \
			margins:15,\
			buh: StaticText { text:'Project structure: '},\
			ddlProjectStyle:DropDownList{properties:{items:['Android studio project','Eclipse project']}}\
		},\
		separator : Panel { width: 100%, height: 2 , margins:15},\
		buttons : Group { \
			btnSave:	Button	{ text:'Save'	, size: [120,24], alignment:['right', 'center'] },\
			btnCancel:	Button	{ text:'Cancel'	, size: [120,24], alignment:['right', 'center'] }\
		}\
	};");
	dlg.folder.txtValue.text=rootFolder;
	dlg.exportType.ddlProjectStyle.selection=0;  
	dlg.exportType.ddlProjectStyle.onChange= function(){  
		if (dlg.exportType.ddlProjectStyle.selection==0) exportType=PROJECT_TYPE_ANDROID_STUDIO;
		if (dlg.exportType.ddlProjectStyle.selection==1) exportType=PROJECT_TYPE_ECLIPSE;			
	}  
	dlg.folder.btnBrowse.onClick = function() {  
		var dir = Folder(dlg.folder.txtValue.text);
		var baseFolder = dir.selectDlg('Select a root folder to save images ');

		if (baseFolder==null)
		{
			return;
		}
		dlg.folder.txtValue.text=unescape(baseFolder);
		rootFolder=baseFolder;	
	}
	dlg.buttons.btnSave.onClick = function() {
		var folder=Folder(dlg.folder.txtValue.text);
		if(folder.exists) {
			rootFolder=dlg.folder.txtValue.text;
		} else {
			rootFolder=null;
		}
	
		if(exportType == null) {
			alert("Export type must be defined!");  
			return;
		}
		if (rootFolder==null ) {  
			alert("Root folder must exists!");  
			return;  
		}  	  
		proceed=true;
		dlg.close(1);
	}
	dlg.buttons.btnCancel.onClick = function() {     
		proceed=false;
		dlg.close(1);
	}  

	dlg.center();
	dlg.show();

	if (!proceed)
	{
		return;
	}

	var exportOptionsSaveForWeb = new ExportOptionsSaveForWeb();

	exportOptionsSaveForWeb.format = SaveDocumentType.PNG;
	exportOptionsSaveForWeb.includeProfile = true;
	exportOptionsSaveForWeb.PNG8 = false; 
	exportOptionsSaveForWeb.transparency = true; 
	exportOptionsSaveForWeb.interlaced = false; 
	exportOptionsSaveForWeb.quality = 100;

	parentFolderPath = Folder(app.activeDocument.fullName.parent).fsName;
	 
	// 1. Loop through the image sizes.
	var numImageSizes = imageSizes.length;
	for (var i = 0; i < numImageSizes; i++) {
		var currentImageSize = imageSizes[i];
		var currentImageWidth = currentImageSize[0];
		var currentImageHeight = currentImageSize[1];
		var currentImageResolution = currentImageSize[2];
		
		// Save the history state.
		var savedState = docRef.activeHistoryState;
		
		// Resize to the desired image size.
		docRef.resizeImage(currentImageWidth, currentImageHeight, null, ResampleMethod.BICUBIC);
		 
		var documentPath;
		
		if (exportType==PROJECT_TYPE_ANDROID_STUDIO)
		{
			documentPath=rootFolder+"/mipmap-"+currentImageResolution;
		} else {
			documentPath=rootFolder+"/drawable-"+currentImageResolution;
		}
		var folder=Folder(documentPath);
		if(!folder.exists) {
			folder.create();
		}
		
		var documentFile = documentPath +"/ic_launcher.png";	
		var file = new File(documentFile);
			
		// Save image
		docRef.exportDocument (file, ExportType.SAVEFORWEB, exportOptionsSaveForWeb);
			
		// Restore the history state to return to the full-sized image.
		docRef.activeHistoryState = savedState;
		
	}
	
	alert('Export complete. '+numImageSizes+' images generated.');
}

main();
