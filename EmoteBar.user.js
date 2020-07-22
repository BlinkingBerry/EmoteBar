// ==UserScript==
// @name         Emote Bar
// @namespace    p1
// @run-at       document-start
// @version      0.1
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
		function overrideEmoteMenu () {
			function t(t) {
				createjs.Container.call(this);
				let e=world.media.emotes.themes,
					i=world.media.emotes.spriteSheet.src,
					o=this;
				client.SpriteSheet.load(i, (function(t) {
					for (let i=0;i<e.length;i++) {
						let s=e[i],
							n=new createjs.Sprite(t,"hamster_"+s);
						n.setTransform(50*i,0,.5,.5),
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
		overrideEmoteMenu();
		let emoteMenu = new box.EmoteMenu();
		world.stage.addChild(emoteMenu);
		emoteMenu.y = 437;
		emoteMenu.alpha = 0.3;
		emoteMenu.scale = world.stage.width / (world.media.emotes.themes.length * 50 + 14);
		world.stage.enableMouseOver();
	}
})();
