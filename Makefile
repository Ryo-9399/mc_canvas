all:
	cat pre.js CharacterObject.js GameGraphicsForApplet.js GameKey.js GameMouse.js GameSoundForApplet.js GlobalFunctions.js IdouGamen.js ImageBuff.js KeyboardMenu.js MainProgram.js MapSystem.js MasaoConstruction.js TagDataBase.js YukaObject.js post.js | uglifyjs -c -o CanvasMasao.js 
