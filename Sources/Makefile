all:
	cat pre.js CharacterObject.js ChipImage.js GameGraphicsForApplet.js GameKey.js GameMouse.js GameSoundForApplet.js GlobalFunctions.js IdouGamen.js ImageBuff.js KeyboardMenu.js MainProgram.js MapSystem.js MasaoConstruction.js MasaoJSS.js TagDataBase.js YukaObject.js post.js | uglifyjs -c -o ../Outputs/CanvasMasao.js 

doc:
	jsdoc GlobalFunctions.js MasaoJSS.js -d ../doc -P ../package.json -R ../README.md -c ../jsdoc.conf.json -t ../node_modules/ink-docstrap/template
