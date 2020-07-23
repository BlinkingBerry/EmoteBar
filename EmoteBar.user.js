// ==UserScript==
// @name         Emote Bar
// @namespace    p1
// @run-at       document-start
// @version      0.2
// @description  Creates an emote bar at the bottom of the screen while there isn't one implemented in the game yet!
// @author       p1
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let timer = setInterval(function() {
		if (typeof world !== "undefined" && typeof world.stage !== "undefined" && typeof world.stage.room !== "undefined") {
			clearInterval(timer);
			onWorldLoaded();
		}
	}, 1000/60);

	function onWorldLoaded() {
		function overrideEmoteMenu(horizontal) {
			function t(t) {
				createjs.Container.call(this);
				let e=world.media.emotes.themes,
					i=world.media.emotes.spriteSheet.src,
					o=this;
				client.SpriteSheet.load(i, (function(t) {
					for (let i=0;i<e.length;i++) {
						let s=e[i],
						n=new createjs.Sprite(t,"hamster_"+s);
						if (horizontal == true) {
							n.setTransform(50*i,0,.5,.5);
						} else {
							n.setTransform(0,50*i,.5,.5);
						};
						n.on("click",(function () {
							world.emote(s)
						})),
							n.on("mouseover",(function () {
							o.alpha = 1.0;
						})),
							n.on("mouseout",(function () {
							o.alpha = 0.3;
						})),
							o.addChild(n)
					}
				}))
			}
			t.prototype = Object.create(createjs.Container.prototype),
				box.EmoteMenu = t
		};

		let menuIsHorizontal = true;
		overrideEmoteMenu(menuIsHorizontal);
		let emoteMenu;

		function createNewEmoteMenu() {
			// Check for SArpnt's Big Screen mod
			if (document.getElementById('menubar') != undefined) {
				if (document.getElementById('menubar').style.position == "absolute") {
					// The chat bar is inside the game canvas!

					if ((world.stage.getChildByName("emoteMenu") != undefined) && (menuIsHorizontal == true)) {
						world.stage.removeChild(emoteMenu);
					};
					// Create Emote Bar at the side, if it's not there yet...
					if (world.stage.getChildByName("emoteMenu") == undefined) {
						menuIsHorizontal = false;
						overrideEmoteMenu(menuIsHorizontal);
						emoteMenu = new box.EmoteMenu();
						world.stage.addChild(emoteMenu);
						emoteMenu.x = 831;
						emoteMenu.scale = world.stage.height / (world.media.emotes.themes.length * 50 + 12);
					};
				} else {
					if ((world.stage.getChildByName("emoteMenu") != undefined) && (menuIsHorizontal == false)) {
						world.stage.removeChild(emoteMenu);
					};
					// Create Emote Bar at the bottom, if it's not there yet...
					if (world.stage.getChildByName("emoteMenu") == undefined) {
						menuIsHorizontal = true;
						overrideEmoteMenu(menuIsHorizontal);
						emoteMenu = new box.EmoteMenu();
						world.stage.addChild(emoteMenu);
						emoteMenu.y = 437;
						emoteMenu.scale = world.stage.width / (world.media.emotes.themes.length * 50 + 14);
					};
				};
			} else {
				/* No Big Screen mod detected. */
				if (world.stage.getChildByName("emoteMenu") == undefined) {
					/*menuIsHorizontal = true;
					overrideEmoteMenu(menuIsHorizontal);*/
					emoteMenu = new box.EmoteMenu();
					world.stage.addChild(emoteMenu);
					emoteMenu.y = 437;
					emoteMenu.scale = world.stage.width / (world.media.emotes.themes.length * 50 + 14);
				};
			};
			emoteMenu.name = "emoteMenu";
			emoteMenu.alpha = 0.3;
		};

		createNewEmoteMenu();

		world.stage.enableMouseOver();

		window.addEventListener('resize', createNewEmoteMenu);
	}
})();
