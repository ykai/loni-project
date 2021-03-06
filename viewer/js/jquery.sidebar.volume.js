// volume panel javascript
jQuery(function() {

  //
  // VOLUME
  //
  jQuery('#volumerendering').button();
  jQuery('#volumerendering').unbind('mouseenter').unbind('mouseleave');
  jQuery('#volumerendering').click(function() {

    jQuery('#slicing').removeClass('ui-state-active');
    jQuery('#volumerendering').addClass('ui-state-active');
    jQuery('#windowlevel-label').hide();
    jQuery('#windowlevel-volume').hide();
    jQuery('#opacity-label').show();
    jQuery('#opacity-volume').show();
    
    volumerenderingOnOff(true);
    
  });
  jQuery('#slicing').button();
  jQuery('#slicing').addClass('ui-state-active');
  jQuery('#slicing').unbind('mouseenter').unbind('mouseleave');
  jQuery('#slicing').click(function() {

    jQuery('#volumerendering').removeClass('ui-state-active');
    jQuery('#slicing').addClass('ui-state-active');
    jQuery('#opacity-label').hide();
    jQuery('#opacity-volume').hide();
    jQuery('#windowlevel-label').show();
    jQuery('#windowlevel-volume').show();
    
    volumerenderingOnOff(false);
    
  });
  jQuery('#modes').buttonset();
  
  jQuery('#fgColorVolume').miniColors({
    letterCase: 'uppercase',
    change: fgColorVolume
  });
  
  jQuery('#bgColorVolume').miniColors({
    letterCase: 'uppercase',
    change: bgColorVolume
  });
  
  jQuery('#inverted').button();
  
  jQuery('#color2').button();
  
  jQuery('#colormodes').buttonset();
  jQuery('#inverted').removeClass('ui-corner-left').addClass('ui-corner-top');
  jQuery('#color2').removeClass('ui-corner-right').addClass('ui-corner-bottom');
  
  jQuery('#windowlevel-volume').dragslider({
    range: true,
    rangeDrag: true,
    values: [0, 100],
    // connect to x.controller.js
    slide: windowLevelVolume
  });
  jQuery('#windowlevel-volume').width(140);
  
  jQuery('#opacity-volume').slider({
    slide: opacity3dVolume
  });
  jQuery('#opacity-volume').width(140);
  jQuery('#opacity-volume').hide();
  jQuery('#opacity-label').hide();
  
  jQuery('#threshold-volume').dragslider({
    range: true,
    rangeDrag: true,
    values: [0, 100],
    // connect to x.controller.js
    slide: thresholdVolume
  });
  jQuery('#threshold-volume').width(140);
  
  //
  // LABELMAP
  //
  
  jQuery('#labelmapvisibility').click(function() {

    toggleLabelmapVisibility();
  });
  

  jQuery('#opacity-labelmap').slider({
    slide: opacityLabelmap
  });
  jQuery('#opacity-labelmap').width(140);
  
  // TODO: added
  // Additional Options
  //
  
  jQuery('#colorId').keyup(function() {
  	colorIdChange();
  });
  
  jQuery('#paintBrushSize').change(function() {
  	paintBrushSize();
  });
  
  jQuery('#undoOption').click(function() {
  	toggleUndoOption();
  });
  
  jQuery('#redoOption').click(function() {
  	toggleRedoOption();
  });
  
  jQuery('#eraserOption').click(function() {
  	eraserOption();
  });
  
  // jQuery('#colorOption').miniColors({
    // opacity: 'true',
    // change: colorOption
  // });
  
  // jQuery('#brushSmallOption').click(function() {
  	// toggleBrushSmallOption();
  // });
//   
  // jQuery('#brushMediumOption').click(function() {
  	// toggleBrushMediumOption();
  // });
//   
  // jQuery('#brushLargeOption').click(function() {
  	// toggleBrushLargeOption();
  // });
  
  jQuery('#clobberOption').click(function() {
  	toggleClobberOption();
  });
  
  jQuery('#2dBucketOption').click(function() {
  	toggle2dBucketOption();
  });
  
  jQuery('#3dBucketOption').click(function() {
  	toggle3dBucketOption();
  });
  
  jQuery('#copyNext').click(function() {
  	copyNextOption();
  });
  
  jQuery('#copyPrev').click(function() {
  	copyPrevOption();
  });
  
  jQuery('#sliceNum').bind('keypress', function(e) {
  	sliceNumOption(e);
  });
  
  jQuery('#sliceXPrev').click(function() {
  	changeSliceOption('X', true);
  });
  
  jQuery('#sliceXNext').click(function() {
  	changeSliceOption('X', false);
  });
  
  jQuery('#sliceYPrev').click(function() {
  	changeSliceOption('Y', true);
  });
  
  jQuery('#sliceYNext').click(function() {
  	changeSliceOption('Y', false);
  });
  
  jQuery('#sliceZPrev').click(function() {
  	changeSliceOption('Z', true);
  });
  
  jQuery('#sliceZNext').click(function() {
  	changeSliceOption('Z', false);
  });
	
});
