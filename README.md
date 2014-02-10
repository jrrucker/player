#jQuery Player
 
This jQuery Player \(what others commonly refer to as a slider\) is style agnostic.  It assumes that you will provide a resonable amount of style to integrate it with your project.  This is done intentionally to allow us to easily translate it from design to design. If you're looking for something you won't need to customize, this isn't the player for you.
 
This plugin was created by created by [Josh Rucker](http://www.joshrucker.com), [NC State Unversity Communications](http://www.ncsu.edu/university-communications/) and is distributed under the [MIT license](http://opensource.org/licenses/MIT).  

The last release of this plugin was v1.1.2 on 2014-02-10. 

##Usage Guide

###Basic Usage

The most basic usage case of the player:

	$(elem).player();

###Advanced Usage

Initilizing the player with options:

	$(elem).player({
		animationDuration: 500,
		rotates: true,
		interval: 8000,
		itemClass: 'player-item',
		hasPagers: true
	});


###Configuratble Options

The following options can be set via 

####Animation Duration

<code>animationDuration</code>: sets the animation\(transition\) speed in milliseconds between slides. Default: <code>500</code> 

####Rotation

<code>rotates</code>: enables/disables auto rotation when true. Default: <code>true</code>

####Transition Interval

<code>interval</code>: sets the length of time between transitions in milliseconds. Default: <code>8000</code>

####Item Class

<code>itemClass</code>: the CSS class that denotes a slide item. Only ttems tagged with the specified class will be presumed to be a "slide." Default: <code>'player-item'</code>

####Pagers

<code>hasPagers</code>: enables/disables control elements in the form of buttons that align to each slide. Default: <code>true</code>

## Change Log

* 2014-02-10:	(v1.1.2) Cleaned up source, added basic comments, made minor udpates to plugin organization.