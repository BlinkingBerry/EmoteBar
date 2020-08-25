// ==UserScript==
// @name         Emote Bar
// @namespace    p1
// @run-at       document-start
// @version      0.9.1
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
		if (typeof world !== "undefined" && typeof world.stage !== "undefined" && typeof world.stage.room !== "undefined" && typeof client !== "undefined" && typeof client.loadedSpriteSheets !== "undefined") {
			clearInterval(timer);
			onWorldLoaded();
		}
	}, 1000/60);

	function onWorldLoaded() {

/*
		let emotes = client.loadedSpriteSheets.emotes;
		let themes = [];

		emotes._animations.forEach(theme => {
			if (theme.toLowerCase().startsWith(world.player.critterId.toLowerCase())) {
				themes.push(theme);
			};
		});

		function overrideEmoteMenu(horizontal) {

			function t(t) {
				//let emoteContainer = new createjs.Container;
				createjs.Container.call(this);

				for (let i=0;i<themes.length;i++) {
					let emoteSprite = new createjs.Sprite(emotes, themes[i]);
					if (emotes.getAnimation(themes[i])) {
						emoteSprite.gotoAndPlay(themes[i]);
						if (horizontal == true) {
							emoteSprite.setTransform(50*i,0,.5,.5);
						} else {
							emoteSprite.setTransform(0,50*i,.5,.5);
						};
						//console.log(emoteSprite);
						let rawTheme = themes[i].toLowerCase().replace(world.player.critterId.toLowerCase() + "/", "");
						emoteSprite.on("click",(function () {
							world.emote(rawTheme);
						}));

						//emoteContainer.addChild(emoteSprite);
						this.addChild(emoteSprite);
					};
				};
			}

			t.prototype = Object.create(createjs.Container.prototype),
				box.EmoteMenu = t
/*
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
				box.EmoteMenu = t*/
/*		};

		let menuIsHorizontal = true;
		overrideEmoteMenu(menuIsHorizontal);
		let emoteMenu;
		let startEmoteBarX = 831;
		let startEmoteBarY = 437;
		let emoteMenuFocusAlpha = 1;
		let emoteMenuUnfocusAlpha = 0.2;

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
						emoteMenu.scale = world.stage.height / (themes.length * 50 + 12);
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
						emoteMenu.scale = world.stage.width / (themes.length * 50 + 14);
					};
				};
			} else {
				/* No Big Screen mod detected. */
/*				if (world.stage.getChildByName("emoteMenu") == undefined) {
					/*menuIsHorizontal = true;
					overrideEmoteMenu(menuIsHorizontal);*/
/*					emoteMenu = new box.EmoteMenu();
					world.stage.addChild(emoteMenu);
					emoteMenu.y = startEmoteBarY;
					emoteMenu.scale = world.stage.width / (themes.length * 50 + 14);
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
*/

		// General settings
		let emoteBarOutsideAlpha = 0.1;
		let emoteBarStartAlpha = 0.15;
		let emotesMinAlphaWhenSelecting = 0.5;
		let emoteBarEnabled = true; // Whether the emoteBar is enabled on launch.
		let startEmoteBarX = 831;
		let startEmoteBarY = 437;
		let transparencyAreaMultiplier = 1; // The emoteBar will start becoming more and more opaque when you hover below 1x the height of the emote Bar; above/left of its start.
		// ^ (above) MUST be greater than that v (below).
		let enlargeAreaMultiplier = 0.5; // The emoteBar will start becoming bigger (under the mouse) when hovering closer than half a height above/left of it.
		let maxEmoteSize = 1.5;
		let maxOffsetDown = 10;
		let maxOffsetRight = 7;

		let barIsHorizontal = true;
		let emoteBar;
		let sizeOneEmote = 0; // Will contain the size of the emoteBar in points

		let mouseWasInBoundsBefore = true;


		let emotes = client.loadedSpriteSheets.emotes;
		let themes = []; // Will contain all the emote names

		let emoteContainer; // Will contain the emote sprites


		// Get emote list from client
		emotes._animations.forEach(theme => {
			if (theme.toLowerCase().startsWith(world.player.critterId.toLowerCase())) {
				themes.push(theme);
			};
		});

		function createEmoteBar(horizontal) {
			// Used to create the horizontal or vertical bar initially with default parameters.

			emoteContainer = new createjs.Container;

			for (let index=0; index < themes.length; index++) {
				let emoteSprite = new createjs.Sprite(emotes, themes[index]);
				if (emotes.getAnimation(themes[index])) {
					emoteSprite.gotoAndPlay(themes[index]);
					if (horizontal == true) {
						emoteSprite.setTransform(50*index, 0, .5, .5);
					} else {
						emoteSprite.setTransform(0, 50*index, .5, .5);
					};
					let rawTheme = themes[index].toLowerCase().replace(world.player.critterId.toLowerCase() + "/", "");
					emoteSprite.cursor = rawTheme;
					emoteSprite.name = rawTheme;
					emoteSprite.on("click",(function () {
						world.emote(rawTheme);
					}));

					emoteContainer.addChild(emoteSprite);
				};
			};
			console.log(emoteContainer);

			return emoteContainer;
		};

		function drawEmoteBar(horizontal, enlargeFraction, relativePosition) {
			// Used to update the visual properties of the existing emoteBar.

			///TODO: SET SPRITES CURSOR TO EMOTE NAME!
		};







		onmousemove = function() {
			if ((emoteBarEnabled == true) && (world.stage.getChildByName("emoteBar") != undefined)) {
				// We only want the emoteBar to show when it is enabled.

				// If a player pressed on "mobile" or changed the screen ratio in any other way; as soon as the mouse moves, the emoteBar is recreated in the then correct orientation.
				if ((world.stage.width < world.stage.height) && (barIsHorizontal)) {
					barIsHorizontal = false;

					world.stage.removeChild(emoteBar);
					emoteBar = createEmoteBar(barIsHorizontal);
					world.stage.addChild(emoteBar);
					emoteBar.x = startEmoteBarX;
					emoteBar.scale = world.stage.height / (themes.length * 50 + 12);
				} else if ((world.stage.width > world.stage.height) && (!barIsHorizontal)) {
					if (bigScreenInstalled == true) {
						if (cardboard.mods.bigScreen.screenState[1] != "f") {
							barIsHorizontal = false;

							world.stage.removeChild(emoteBar);
							emoteBar = createEmoteBar(barIsHorizontal);
							world.stage.addChild(emoteBar);
							emoteBar.y = startEmoteBarY;
							emoteBar.scale = world.stage.width / (themes.length * 50 + 14);
						};
					} else {
						barIsHorizontal = false;

						world.stage.removeChild(emoteBar);
						emoteBar = createEmoteBar(barIsHorizontal);
						world.stage.addChild(emoteBar);
						emoteBar.y = startEmoteBarY;
						emoteBar.scale = world.stage.width / (themes.length * 50 + 14);
					};
				};

				if (world.stage.mouseInBounds == false) {
					// As the pointer is outside the game's bounds, we will make the emoteBar almost entirely transparent.

					if (barIsHorizontal) {
						// The emoteBar is at the bottom

						//emoteBar.alpha = emoteBarOutsideAlpha;
						//emoteBar.y = startEmoteBarY + maxOffsetDown;
						if (mouseWasInBoundsBefore == true) {
							mouseWasInBoundsBefore = false;
							createjs.Tween.get(emoteBar, {override: true}).to({
								alpha: emoteBarOutsideAlpha,
								y: startEmoteBarY + maxOffsetDown
							}, 400, createjs.Ease.easeIn);
						};

						/* TODO: DRAW EMOTE BAR "NORMALLY" sized! - but only if it wasn't "normally" sized (e.g. enlarged) before! */

					} else {
						// The emoteBar is at the right

						emoteBar.alpha = emoteBarOutsideAlpha;
						emoteBar.x = startEmoteBarX + maxOffsetRight;

						/* TODO: DRAW EMOTE BAR "NORMALLY" sized! - but only if it wasn't "normally" sized (e.g. enlarged) before! */
					};

				} else {
					mouseWasInBoundsBefore = true;

					let stage = document.getElementById("stage");

					if (barIsHorizontal) {
						// The emoteBar is at the bottom
						sizeOneEmote = emoteBar.getBounds().width * emoteBar.scale / themes.length;

						let relativeMousePosition = world.stage.mouseY / stage.height;
						let relativeMouseStartTransparencyRamp = (startEmoteBarY - transparencyAreaMultiplier * sizeOneEmote) / world.stage.height;
						let relativeMouseEndEnlargeRamp = (startEmoteBarY - enlargeAreaMultiplier * sizeOneEmote) / world.stage.height;
						if (relativeMousePosition < relativeMouseStartTransparencyRamp) {
							// We only change transparency.
							let relativePositionTransparencyArea = relativeMousePosition / relativeMouseStartTransparencyRamp;

							//emoteBar.alpha = emoteBarOutsideAlpha + (emoteBarStartAlpha - emoteBarOutsideAlpha) * relativePositionTransparencyArea;
							//emoteBar.y = startEmoteBarY + maxOffsetDown;
							createjs.Tween.get(emoteBar, {override: true}).to({
								alpha: emoteBarOutsideAlpha + (emoteBarStartAlpha - emoteBarOutsideAlpha) * relativePositionTransparencyArea,
								y: startEmoteBarY + maxOffsetDown
							}, 100, createjs.Ease.easeIn);

							/* TODO: DRAW EMOTE BAR "NORMALLY" sized! - but only if it wasn't "normally" sized (e.g. enlarged) before! */

						} else if (relativeMousePosition < relativeMouseEndEnlargeRamp) {
							console.log("NOW");
							// We change transparency, position, and size (of the hovered-over emote(s))!
							let relativePositionEnlargeArea = (relativeMousePosition - relativeMouseStartTransparencyRamp) / (relativeMouseEndEnlargeRamp - relativeMouseStartTransparencyRamp);

							//emoteBar.alpha = emoteBarStartAlpha + (1.0 - emoteBarStartAlpha) * relativePositionEnlargeArea;
							//emoteBar.y = startEmoteBarY + (1.0 - relativePositionEnlargeArea) * maxOffsetDown;
							createjs.Tween.get(emoteBar, {override: true}).to({
								alpha: emoteBarStartAlpha + (1.0 - emoteBarStartAlpha) * relativePositionEnlargeArea,
								y: startEmoteBarY + (1.0 - relativePositionEnlargeArea) * maxOffsetDown
							}, 100, createjs.Ease.easeIn);

							/* TODO: DRAW EMOTE BAR partially enlarged! (relative amount compared to max.: "relativePositionEnlargeArea") */

						} else {
							// We change size (of the hovered-over emote(s))

							//emoteBar.alpha = 1; // Individual emotes are slightly more transparent when far away from the mouse (aka. not enlarged/selected)
							//emoteBar.y = startEmoteBarY;
							createjs.Tween.get(emoteBar, {override: true}).to({
								alpha: 1,
								y: startEmoteBarY
							}, 100, createjs.Ease.easeIn);


							/* TODO: DRAW EMOTE BAR completely enlarged! (only those under mouse) */

						};
					} else {
						// The emoteBar is at the right

					};
				};
			};
		};




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

		function createAndDrawNewEmoteBar() {
			if (bigScreenInstalled == true) {
				if (cardboard.mods.bigScreen.screenState[1] == "f") {
					// The chat bar is inside the game canvas!

					if ((world.stage.getChildByName("emoteBar") != undefined) && (barIsHorizontal == true)) {
						world.stage.removeChild(emoteBar);
					};
					// Create Emote Bar at the side, if it's not there yet...
					if (world.stage.getChildByName("emoteBar") == undefined) {
						barIsHorizontal = false;
						emoteBar = createEmoteBar(barIsHorizontal);
						world.stage.addChild(emoteBar);
						emoteBar.x = startEmoteBarX;
						emoteBar.scale = world.stage.height / (themes.length * 50 + 12);
					};
				} else {
					if ((world.stage.getChildByName("emoteBar") != undefined) && (barIsHorizontal == false)) {
						world.stage.removeChild(emoteBar);
					};
					// Create Emote Bar at the bottom, if it's not there yet...
					if (world.stage.getChildByName("emoteBar") == undefined) {
						barIsHorizontal = true;
						emoteBar = createEmoteBar(barIsHorizontal);
						world.stage.addChild(emoteBar);
						emoteBar.y = startEmoteBarY;
						emoteBar.scale = world.stage.width / (themes.length * 50 + 14);
					};
				};
			} else {
				/* No Big Screen mod detected. */
				if (world.stage.getChildByName("emoteBar") == undefined) {
					/*barIsHorizontal is true;*/
					emoteBar = createEmoteBar(barIsHorizontal);
					world.stage.addChild(emoteBar);
					emoteBar.y = startEmoteBarY;
					emoteBar.scale = world.stage.width / (themes.length * 50 + 14);
				};
			};
			emoteBar.name = "emoteBar";


			onmousemove();

			window.emoteBar = emoteBar;

		};

		createAndDrawNewEmoteBar();



		window.addEventListener('resize', createAndDrawNewEmoteBar);


		/*
		Basic Ideas:
		- Enlarges emotes under mouse, like macOS dock (when magnification is enabled).
		- Makes emotes that are further away from the mouse (when enlarged already) slightly transparent: "emotesMinAlphaWhenSelecting" (only enlarged ones have full opaqueness)
		- Button to enable/disable emoteBar.
		- Keyboard shortcut to enable/disable emoteBar.
		--> Zoom to fixed width (always the same); then anchor to side that's farther away from cursor (gets shorter on the sides)
		*/


	}
})();


