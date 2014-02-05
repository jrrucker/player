/**
 * @name jQuery Player
 * @author Josh Rucker, NC State Unversity Communications
 * @copyright (cc) Josh Rucker (http://www.ncsu.com)
 * 
 */

;(function( $, window, document, undefined ){

	var Player = function( elem, options ){
		this.elem = elem;
		this.$elem  = $( elem );
		this.options = options;
		this.metadata = this.$elem.data('player-options');
	};
	
	Player.prototype = {
		
		defaults: {
			animationDuration: 500,
			rotates: true,
			interval: 8000,
			itemClass: 'player-item',
			hasPagers: true,
			minRotateWidth: 0
		},
		
		init: function() {
			
			this.config = $.extend( {}, this.defaults, this.options, this.metadata );
			
			this.$container = this.$elem;
			this.$items = this.$elem.find( '.' + this.config.itemClass );
			this.$currentItem = this.$items.first().addClass( "current-player-item" );
						
			this.features = {};
			this.isAnimating = false;
			
			if( !!this.config.hasPagers ){
				this.features.pagers = new this.Pagers( this );
				this.features.pagers.init();
			}
			
			if( !!this.config.rotates){
				
				if(this.config.minRotateWidth > 0){

					if($('body').width() >= this.config.minRotateWidth){
						
						// start rotation
						this.rotate();
						
					}
					
				} else {
					
					// start rotation
					this.rotate();
				
				}
				
				// kill rotation on button click
				this.features.pagers.$container.find("button").on('click.player',$.proxy(function(){
					clearInterval(this.t);
				}, this ));
				
				// if resize width set
				if(this.config.minRotateWidth > 0){
					this.resize();
				}
			}
			
			return this;
			
		},
		
		Pagers: function ( parent ) {
			
			var self = this;
			self.parent = parent;
						
			self.init = function(){
				
				self.$container = $( '<div class="player-pagers" />' );
				
				for(var i = 0, j = parent.$items.length; i < j; i++){
					self.$container.append( $( '<button type="button" class="' + ((i === 0) ? 'active ' : '') + 'pager-pagers-item" data-pager-page="' + i + '">Slide ' + i + '</button>' ));
				}
				
				self.$container.appendTo( parent.$elem );
				self.bindEvents();
				
			};

			self.bindEvents = function(){
				
				self.$container.on( 'click.player', 'button', $.proxy( self.click, this ) );
			
			};
			
			self.click = function( event ){
				
				if(!self.parent.isAnimating){
					
					var $button = $( event.currentTarget ),
						pageNum = parseInt ( $button.data( 'pager-page' ), 10 );
					
					if(!$button.hasClass("active")){
								
						parent.$elem.find("button").removeClass("active");
						$button.addClass("active");
							
						parent.stageNext(pageNum);
						parent.move();
					
					}
					
				}
				
			};
			
		},
		
		rotate: function (){
			
			var self = this;
			
			self.t = setInterval(function() {
				
				var $currButton = self.features.pagers.$container.find("button.active");
				var currIndex = parseInt( $currButton.data( 'pager-page' ), 10 );
				var nextIndex = 0;
				
				if(currIndex < (self.$items.length-1)){
					nextIndex = currIndex + 1;
				}

				// update active button
				var $nextButton = self.features.pagers.$container.find("button:eq(" + (nextIndex) + ")");
				self.$elem.find("button").removeClass("active");
				$nextButton.addClass("active");
				
				// transition slide
				self.stageNext(nextIndex);
				self.move();
				
			}, this.config.interval );
			
		},
		
		resize: function(){
			
			var self = this;
			
			// stop player auto rotation on small devices
			$(window).resize(function(){
				
				if($('body').width() < self.config.minRotateWidth){
					clearInterval(self.t);
				} 
				
			});
			
		},
		
		stageNext: function(next){
			
			this.$nextItem = this.$elem.find( '.' + this.config.itemClass + ':eq(' + next + ')' );
		
		},
		
		move: function (){
			
			var self = this;
			self.isAnimating = true;
						
			self.$currentItem.fadeOut( self.config.animationDuration, function(){
				
				self.$nextItem.fadeIn( self.config.animationDuration, function(){
					
					self.$currentItem.removeClass("current-player-item");
					self.$currentItem = self.$nextItem;
					self.$currentItem.addClass("current-player-item");
					self.isAnimating = false;
					
				});
				
			});
			
		}

	};
	
	Player.defaults = Player.prototype.defaults;
	
	$.fn.player = function( options ){
		return this.each( function () {
			new Player( this, options ).init();
		});
	};
	
})( jQuery, window, document );