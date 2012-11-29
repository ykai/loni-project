goog.require('X.renderer3D');
goog.require('X.renderer2D');
goog.require('X.mesh');
goog.require('X.matrix');
goog.require('X.volume');
goog.require('X.cube');

/**
 * Setup all UI elements once the loading was completed.
 */
function setupUi() {

  // VOLUME
  if (_data.volume.file != null) {
    
    // update threshold slider
    jQuery('#threshold-volume').dragslider("option", "max", volume.max);
    jQuery('#threshold-volume').dragslider("option", "min", volume.min);
    jQuery('#threshold-volume').dragslider("option", "values",
        [4, volume.max]);
    volume.lowerThreshold = 4;
    
    // update window/level slider
    jQuery('#windowlevel-volume').dragslider("option", "max", volume.max);
    jQuery('#windowlevel-volume').dragslider("option", "min", volume.min);
    jQuery('#windowlevel-volume').dragslider("option", "values",
        [volume.min, volume.max]);
    
    // update 3d opacity
    jQuery('#opacity-volume').slider("option", "value", 5);
    volume.opacity = 0.05; // re-propagate
    volume.modified();
    
    // update 2d slice sliders
    var dim = volume.dimensions;
    jQuery("#yellow_slider").slider("option", "disabled", false);
    jQuery("#yellow_slider").slider("option", "min", 0);
    jQuery("#yellow_slider").slider("option", "max", dim[0] - 1);
    jQuery("#yellow_slider").slider("option", "value", volume.indexX);
    jQuery("#red_slider").slider("option", "disabled", false);
    jQuery("#red_slider").slider("option", "min", 0);
    jQuery("#red_slider").slider("option", "max", dim[1] - 1);
    jQuery("#red_slider").slider("option", "value", volume.indexY);
    jQuery("#green_slider").slider("option", "disabled", false);
    jQuery("#green_slider").slider("option", "min", 0);
    jQuery("#green_slider").slider("option", "max", dim[2] - 1);
    jQuery("#green_slider").slider("option", "value", volume.indexZ);
    
    jQuery('#volume .menu').removeClass('menuDisabled');
    
	jQuery('#volume .menu').stop().animate({
	 'marginLeft': '-2px'
	}, 1000);
	has_volume = true;
    
  } else {
    
    if (!has_volume) {
	    // no volume
	    jQuery('#volume .menu').addClass('menuDisabled');
	    jQuery("#yellow_slider").slider("option", "disabled", true);
	    jQuery("#red_slider").slider("option", "disabled", true);
	    jQuery("#green_slider").slider("option", "disabled", true);
    }
	
  }
  
  // LABELMAP
  if (_data.labelmap.file != null) {
    
    jQuery('#labelmapSwitch').show();
    
    jQuery('#opacity-labelmap').slider("option", "value", 99);
    volume.labelmap.opacity = 0.99; // re-propagate
    

  } else {
    
    // no labelmap
    jQuery('#labelmapSwitch').hide();
    
  }

  // MESH
  if (_data.mesh.file != null) {
    
    jQuery('#opacity-mesh').slider("option", "value", 100);
    mesh.opacity = 1.0; // re-propagate
    
    mesh.color = [0, 0, 1];
    
    jQuery('#mesh .menu').removeClass('menuDisabled');
    
	jQuery('#mesh .menu').stop().animate({
	 'marginLeft': '-2px'
	}, 1000);
	has_mesh = true;
    
  } else {
    
    if (!has_mesh) {
	    // no mesh
	    jQuery('#mesh .menu').addClass('menuDisabled');
    }
  
  }
  
  // SCALARS
  if (_data.scalars.file != null) {
    
    var combobox = document.getElementById("scalars-selector");
    combobox.value = 'Scalars 1';
    
    jQuery("#threshold-scalars").dragslider("option", "disabled", false);
    jQuery("#threshold-scalars").dragslider("option", "min",
        mesh.scalars.min * 100);
    jQuery("#threshold-scalars").dragslider("option", "max",
        mesh.scalars.max * 100);
    jQuery("#threshold-scalars").dragslider("option", "values",
        [mesh.scalars.min * 100, mesh.scalars.max * 100]);
    
  } else {
    
    var combobox = document.getElementById("scalars-selector");
    combobox.disabled = true;
    jQuery("#threshold-scalars").dragslider("option", "disabled", true);
    
  }
  
  // FIBERS
  if (_data.fibers.file != null) {
    
    jQuery('#fibers .menu').removeClass('menuDisabled');
    
    jQuery("#threshold-fibers").dragslider("option", "min", fibers.scalars.min);
    jQuery("#threshold-fibers").dragslider("option", "max", fibers.scalars.max);
    jQuery("#threshold-fibers").dragslider("option", "values",
        [fibers.scalars.min, fibers.scalars.max]);
	jQuery('#fibers .menu').stop().animate({
	 'marginLeft': '-2px'
	}, 1000);
	has_fibers = true;
    
  } else {
    
    if (!has_fibers) {
	    // no fibers
	    jQuery('#fibers .menu').addClass('menuDisabled');
    }
    
  }
  
}

function volumerenderingOnOff(bool) {

  if (!volume) {
    return;
  }
  
  volume.volumeRendering = bool;
  

}

function thresholdVolume(event, ui) {

  if (!volume) {
    return;
  }
  
  volume.lowerThreshold = ui.values[0];
  volume.upperThreshold = ui.values[1];
  

}

function windowLevelVolume(event, ui) {

  if (!volume) {
    return;
  }
  
  volume.windowLow = ui.values[0];
  volume.windowHigh = ui.values[1];
  

}

function opacity3dVolume(event, ui) {

  if (!volume) {
    return;
  }
  
  volume.opacity = ui.value / 100;
  

}

function volumeslicingX(event, ui) {

  if (!volume) {
    return;
  }
  
  volume.indexX = Math
      .floor(jQuery('#yellow_slider').slider("option", "value"));
  
}

function volumeslicingY(event, ui) {

  if (!volume) {
    return;
  }
  
  volume.indexY = Math.floor(jQuery('#red_slider').slider("option", "value"));
  
}

function volumeslicingZ(event, ui) {

  if (!volume) {
    return;
  }
  
  volume.indexZ = Math.floor(jQuery('#green_slider').slider("option", "value"));
  
}

function fgColorVolume(hex, rgb) {

  if (!volume) {
    return;
  }
  
  volume.maxColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  

}

function bgColorVolume(hex, rgb) {

  if (!volume) {
    return;
  }
  
  volume.minColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  

}

//
// LABELMAP
//
function opacityLabelmap(event, ui) {

  if (!volume) {
    return;
  }
  
  volume.labelmap.opacity = ui.value / 100;
  

}

function toggleLabelmapVisibility() {

  if (!volume) {
    return;
  }
  
  volume.labelmap.visible = !volume.labelmap.visible;

}

////////////////////////////////////////////////
// TODO: Additional Options
////////////////////////////////////////////////

function toggleUndoOption() {

	if (!volume) {
		return;
	}

	losp_performundo(volume._labelmap);
}

function toggleRedoOption() {

	if (!volume) {
		return;
	}
	
losp_checkimage(volume._labelmap);
	// TODO: Need to redo
	//window.console.log('redo');
}

function colorOption(hex, rgba) {

	if (!volume) {
		return;
	}

	var rgbaColor = [rgba.r, rgba.g, rgba.b, rgba.a];
	//window.console.log(rgbaColor);

}

function toggleBrushSmallOption() {

	if (!volume) {
		return;
	}

	// TODO: Need to make default cursor size
	//document.body.style.cursor = 'default';
	losp_slices._brush._size = 1;
	//window.console.log('small');
}

function toggleBrushMediumOption() {

	if (!volume) {
		return;
	}

	// TODO: Need to make medium cursor size
	//document.body.style.cursor = "url('../gfx/medium.png'), default";
	losp_slices._brush._size = 3;
	//window.console.log('medium');
}

function toggleBrushLargeOption() {

	if (!volume) {
		return;
	}

	// TODO: Need to make large cursor size
	//document.body.style.cursor = "url('../gfx/large.png'), default";
	losp_slices._brush._size = 5;
	//window.console.log('large');
}

function toggleClobberOption() {

	if (!volume) {
		return;
	}

	// TODO: Need to set clobber variable
	if ($('#clobberOption').prop('checked')) {
		losp_slices._brush._clobber = true;
	} else {
		losp_slices._brush._clobber = false;
	}

}

function toggle2dBucketOption() {

	if (!volume) {
		return;
	}

	// TODO: Do nothing for now
	if ($('#2dBucketOption').prop('checked')) {
		//document.body.style.cursor = "url('../gfx/paint.png'), default";
		losp_slices._brush._mode = 2;
	} else {
		//document.body.style.cursor = 'default';
		losp_slices._brush._mode = 1;
	}

}

function toggle3dBucketOption() {

	if (!volume) {
		return;
	}

	// TODO: Do nothing for now
	if ($('#3dBucketOption').prop('checked')) {
		//document.body.style.cursor = "url('../gfx/paint.png'), default";
	} else {
		//document.body.style.cursor = 'default';
	}

}

function toggleCopyOption() {

	if (!volume) {
		return;
	}

	// TODO: Need to redo

	var e = document.getElementById('copyPasteOption');
	var selectedView = e.options[e.selectedIndex].value;
	// yellow, red or green

	//window.console.log('copy: ' + selectedView);
}

function togglePasteOption() {

	if (!volume) {
		return;
	}

	// TODO: Need to redo

	var e = document.getElementById('copyPasteOption');
	var selectedView = e.options[e.selectedIndex].value;
	// yellow, red or green

	//window.console.log('paste: ' + selectedView);
}


/////////////////////////////////////////////
// TODO: end of added functions
/////////////////////////////////////////////

//
// MESH
//
function toggleMeshVisibility() {

  if (!mesh) {
    return;
  }
  
  mesh.visible = !mesh.visible;
  

}

function meshColor(hex, rgb) {

  if (!mesh) {
    return;
  }
  
  mesh.color = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  

}

function opacityMesh(event, ui) {

  if (!mesh) {
    return;
  }
  
  mesh.opacity = ui.value / 100;
  

}

function thresholdScalars(event, ui) {

  if (!mesh) {
    return;
  }
  
  mesh.scalars.lowerThreshold = ui.values[0] / 100;
  mesh.scalars.upperThreshold = ui.values[1] / 100;
  

}

function scalarsMinColor(hex, rgb) {

  if (!mesh) {
    return;
  }
  
  mesh.scalars.minColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  

}

function scalarsMaxColor(hex, rgb) {

  if (!mesh) {
    return;
  }
  
  mesh.scalars.maxColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  

}

//
// Fibers
//
function toggleFibersVisibility() {

  if (!fibers) {
    return;
  }
  
  fibers.visible = !fibers.visible;
  

}

function thresholdFibers(event, ui) {

  if (!fibers) {
    return;
  }
  
  fibers.scalars.lowerThreshold = ui.values[0];
  fibers.scalars.upperThreshold = ui.values[1];
  

}