(function(){
	//Define the two variables Canvas and ImageCanvas
	//ImageCanvas is canvas that the images will be displayed on.
	var canvas, imageCanvas, defaultWidth, defaultHeight;
	var img = new Image;
	var rightImage = 1;
	var imgWidth, imgHeight;
	var imageData;
  var threshold;
	function init(){
		canvas=document.getElementById('canvas');
		if (!canvas){
			alert('Did not get the canvas');
		}
		context=canvas.getContext('2d');
		if(!context){
			alert('Did not get canvas context');
			return;
		}
		// canvas.height sets the height of the canvas to the height of 
		// the screen minus 100 pixels
		// canvas.width sets the width of the canvas to the height of the
		// canvas  so the canvas is a square canvas.  This could be set to
		// window.innerWidth and the canvas width would be the width of the 
		//screen.
		canvas.height = window.innerHeight-100;
		canvas.width = canvas.height;
		// the var input creates an event handler for loading a new image
		// and file handleFiles for display that image
		var input=document.getElementById('input');
		input.addEventListener('change',handleFiles,false);
		var rangeSlider = document.getElementById('slideValue');
		rangeSlider.addEventListener('change',setSlider,false);
		}
		
		//var outline =document.getElementById('findEdges');
		//outline.addEventListener('click',findEdges,false);
function handleFiles(e){
	//var img = new Image;
	img.src=URL.createObjectURL(e.target.files[0]);
	img.onload = function(){
	if(rightImage == 1){
		context.save();
	}
	if(rightImage == 2){
	context.restore();
	context.save();
	rightImage = 1;
}

	
	if(img.height > img.width){
		imgWidth = (img.width* (canvas.height/img.height));
		imgHeight = img.height * (canvas.height/img.height);
		imgEndWidth = (img.width * (canvas.width/img.height));
		imgEndHeight = canvas.height;
		imgStartWidth = (canvas.width/2) - (imgEndWidth/2);
		imgStartHeight = (canvas.height/2) - (imgEndHeight/2);
			context.clearRect(0, 0, canvas.width, canvas.height);
	}
	if(img.height <= img.width){
		
		imgWidth = (img.width * (canvas.width/img.width));
		imgHeight = (img.height * (canvas.width/img.width));
		imgEndWidth = canvas.width;
		imgEndHeight = (img.height * (canvas.height/img.width));
		imgStartWidth = (canvas.width/2) - (imgEndWidth/2);
		imgStartHeight = (canvas.height/2) - (imgEndHeight/2);
			context.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	imageViewerDraw();
		
	}
	
	imageDrawn = 'true';
	
	}
	
	function imageViewerDraw(){
	
	context.drawImage(img, imgStartWidth, imgStartHeight, imgEndWidth, imgEndHeight);
	imageData = context.getImageData(0,0, canvas.width, canvas.height);
	
	
	}

function setSlider(){
  //alert('got into setSlider function');
  threshold = this.value;
  //findEdges(threshold);
  showValue(threshold);

  findEdges(threshold);
//   alert('about to execute findEdges function');
}

function findEdges(newValue){
	//var imageData = context.getImageData(0,0, canvas.width, canvas.height);
	var output = context.createImageData(canvas.width, canvas.height);
	var w = canvas.width, h = canvas.height;
	var inputData = imageData.data;
	var outputData = output.data;
	var threshold = newValue;
	
  //alert('threshold = '+ threshold);

//edge detection
		for (var y = 0; y < h; y+=1){
			for( var x = 0; x < h; x += 1){
	
				var i = (y * w + x) * 4;
				outputData[i] = inputData[i - w*4 -4] + inputData[i - w*4] + inputData[i- w*4 + 4] + inputData[i -4] - 8*inputData[i] +inputData[i + 4] +inputData[i + w*4 - 4] + inputData[i + w*4] + inputData[i + w*4 + 4];
				 if (outputData[i] < threshold){
					  outputData[i] = 255;
					  outputData[i+1] = 255;
					  outputData[i+2] = 255;
				  }
				  else{
					  outputData[i] = 0;
					  outputData[i+1] = 0;
					  outputData[i+2] = 0;
				  }

				  outputData[i+3] = 255;
			}
		}

	
	//put the image data back after manipulation

	context.putImageData(output, 0, 0);

}
function showValue(newValue)
{
	document.getElementById("range2").innerHTML=newValue;
   
}
	
		
		init();
}) ();
