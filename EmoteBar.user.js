// ==UserScript==
// @name         Emote Bar
// @namespace    p1
// @run-at       document-start
// @version      0.6
// @updateURL    https://github.com/p1-BCMC/EmoteBar/raw/master/EmoteBar.user.js
// @downloadURL  https://github.com/p1-BCMC/EmoteBar/raw/master/EmoteBar.user.js
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
		let startEmoteBarX = 831;
		let startEmoteBarY = 437;
		let emoteMenuFocusAlpha = 1;
		let emoteMenuUnfocusAlpha = 0.3;

		// Check for SArpnt's Big Screen mod
		let bigScreenInstalled = false;
		if (typeof cardboard != "undefined") {
			if (cardboard.mods.bigScreen != undefined) {
				// and one last check, because if Big Screen mod fails to load in time, it does create that hook in cardboard, but it's empty...
				if (cardboard.mods.bigScreen.screenState != undefined) {
					bigScreenInstalled = true;
				};
			};
		};

		function createNewEmoteMenu() {
			if (bigScreenInstalled == true) {
				if (cardboard.mods.bigScreen.screenState[1] == "f") {
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
						emoteMenu.x = startEmoteBarX;
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
						emoteMenu.y = startEmoteBarY;
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
					emoteMenu.y = startEmoteBarY;
					emoteMenu.scale = world.stage.width / (world.media.emotes.themes.length * 50 + 14);
				};
			};
			emoteMenu.name = "emoteMenu";
			emoteMenu.alpha = emoteMenuUnfocusAlpha;

		};

		createNewEmoteMenu();

		onmousemove = function(e){
			if (document.elementFromPoint(e.clientX, e.clientY).id == "stage") {

				let stage = document.getElementById("stage");

				if (menuIsHorizontal == true) {
					// The Emote Bar is at the bottom
					if ((world.stage.mouseY / stage.height) > (startEmoteBarY / world.stage.height)) {
						if (emoteMenu.alpha < emoteMenuFocusAlpha) {
							emoteMenu.alpha = emoteMenuFocusAlpha;
						};
					} else {
						if (emoteMenu.alpha == emoteMenuFocusAlpha) {
							emoteMenu.alpha = emoteMenuUnfocusAlpha;
						};
					};
				} else {
					// The Emote Bar is at the side
					if ((world.stage.mouseX / stage.width) > (startEmoteBarX / world.stage.width)) {
						if (emoteMenu.alpha < emoteMenuFocusAlpha) {
							emoteMenu.alpha = emoteMenuFocusAlpha;
						};
					} else {
						if (emoteMenu.alpha == emoteMenuFocusAlpha) {
							emoteMenu.alpha = emoteMenuUnfocusAlpha;
						};
					};
				};

			} else {
				if (emoteMenu.alpha == emoteMenuFocusAlpha) {
					emoteMenu.alpha = emoteMenuUnfocusAlpha;
				};
			};
		};

		window.addEventListener('resize', createNewEmoteMenu);
	}
})();
