bare_js=CharacterObject.js ChipImage.js GameGraphicsForApplet.js GameKey.js GameMouse.js GameSoundForApplet.js GlobalFunctions.js IdouGamen.js ImageBuff.js KeyboardMenu.js MainProgram.js MapSystem.js MasaoConstruction.js MasaoJSS.js TagDataBase.js YukaObject.js EnemyController.js
js=pre.js ${bare_js} post.js

all:
	cat ${js} | uglifyjs --rename -c -o ../Outputs/CanvasMasao.js
nouglify:
	cat ${js} > ../Outputs/CanvasMasao.js

doc:
	jsdoc GlobalFunctions.js MasaoJSS.js -d ../doc -P ../package.json -R ../README.md -c ../jsdoc.conf.json -t ../node_modules/ink-docstrap/template

doc-dev:
	jsdoc ${bare_js} -d ../doc -P ../package.json -R ../README.md -c ../jsdoc.conf.json -t ../node_modules/ink-docstrap/template
