import { Params, Option } from "./MasaoOption";
import { MasaoConstruction } from "./MasaoConstruction";
import { makeKnownDefaultParameters, KnownParameterKey } from "./MasaoParameters";

class TagDataBase {
	tag_kazu: number;
	params!: Params;
	options: Option;

	constructor() {
		this.tag_kazu = 0;
		this.options = {};
		this.initParameter();
	}

	initParameter() {
		this.params = makeKnownDefaultParameters();

		var str2 = "";
		var str3 = "";
		for (var i = 0; i <= 59; i++) {
			str2 = str2 + ".";
			str3 = str3 + "..";
		}
		var j;
		var str1;
		for (var k = 0; k <= 2; k++) {
			for (j = 0; j <= 29; j++) {
				str1 = `map${k}-${j}`;
				this.params[str1] = ".";
			}
		}
		for (k = 0; k <= 2; k++) {
			for (j = 0; j <= 29; j++) {
				str1 = `map${k}-${j}-s`;
				this.params[str1] = ".";
			}
		}
		for (k = 0; k <= 2; k++) {
			for (j = 0; j <= 29; j++) {
				str1 = `map${k}-${j}-t`;
				this.params[str1] = ".";
			}
		}
		for (k = 0; k <= 2; k++) {
			for (j = 0; j <= 29; j++) {
				str1 = `map${k}-${j}-f`;
				this.params[str1] = ".";
			}
		}
		for (k = 0; k <= 2; k++) {
			for (j = 0; j <= 29; j++) {
				str1 = `layer${k}-${j}`;
				this.params[str1] = str3;
			}
		}
		for (k = 0; k <= 2; k++) {
			for (j = 0; j <= 29; j++) {
				str1 = `layer${k}-${j}-s`;
				this.params[str1] = str3;
			}
		}
		for (k = 0; k <= 2; k++) {
			for (j = 0; j <= 29; j++) {
				str1 = `layer${k}-${j}-t`;
				this.params[str1] = str3;
			}
		}
		for (k = 0; k <= 2; k++) {
			for (j = 0; j <= 29; j++) {
				str1 = `layer${k}-${j}-f`;
				this.params[str1] = str3;
			}
		}

		this.tag_kazu = Object.keys(this.params).length;
	}

	getValue<K extends string>(paramString: K): K extends KnownParameterKey ? string : string | null {
		var s = this.params[paramString];
		if ("undefined" !== typeof s) {
			return s as any;
		}
		console.warn("Error : No param " + paramString);
		return null as any;
	}

	getValueInt(paramString: string) {
		var s = this.params[paramString];
		if ("undefined" !== typeof s) {
			var j;
			j = parseInt(s);
			if (isNaN(j)) j = -1;
			return j;
		}
		console.warn("Error : No param " + paramString);
		return -1;
	}

	setValue(paramString1: string, paramString2: string) {
		this.params[paramString1] = paramString2;
		return true;
	}

	setValueFromHTML(paramApplet: MasaoConstruction) {
		for (var name in this.params) {
			var str = paramApplet.getParameter(name);
			if (str != null) {
				this.params[name] = str;
			}
		}
		return true;
	}

	setValueStage1() {
		this.params["map0-0"] = "............................................................";
		this.params["map0-1"] = "............................................................";
		this.params["map0-2"] = "............................................................";
		this.params["map0-3"] = "............................................................";
		this.params["map0-4"] = "............................................................";
		this.params["map0-5"] = "............................................................";
		this.params["map0-6"] = "............................................................";
		this.params["map0-7"] = "............................................................";
		this.params["map0-8"] = "............................................................";
		this.params["map0-9"] = "............................................................";
		this.params["map0-10"] = "............................................................";
		this.params["map0-11"] = "............................................................";
		this.params["map0-12"] = "............................................999.............";
		this.params["map0-13"] = "............................................999.............";
		this.params["map0-14"] = "............................................................";
		this.params["map0-15"] = "............................................aaa.............";
		this.params["map0-16"] = "............................................................";
		this.params["map0-17"] = "............................................................";
		this.params["map0-18"] = "...............................99...........................";
		this.params["map0-19"] = "............................................................";
		this.params["map0-20"] = "............................................................";
		this.params["map0-21"] = "............................................................";
		this.params["map0-22"] = "...12...............12.....9.9...aaa.....aa.aaaaaaaa...12...";
		this.params["map0-23"] = ".............B............aaaaa..............9.aaaaa........";
		this.params["map0-24"] = ".........aaaaa..........................B...aaaaaaaa........";
		this.params["map0-25"] = "....9.9.............................aaaaa...9.9aa999........";
		this.params["map0-26"] = "....aaa...............B.............9.9.9...aaaaaaaa........";
		this.params["map0-27"] = "...........aaaaaa..aaaaaa....................9.aaaaa........";
		this.params["map0-28"] = ".A........aaaaaaa..aaaaaa............D......aaaaaaaa........";
		this.params["map0-29"] = "bbbbbbbbbbbbbbbbb..bbbbbb.bbbbbbbbbbbbbbbbbbbbbbbbbb5bbbbbb.";

		this.params["map1-0"] = "............................................................";
		this.params["map1-1"] = "............................................................";
		this.params["map1-2"] = "............................................................";
		this.params["map1-3"] = "............................................................";
		this.params["map1-4"] = "............................................................";
		this.params["map1-5"] = "............................................................";
		this.params["map1-6"] = "............................................................";
		this.params["map1-7"] = "............................................................";
		this.params["map1-8"] = "............................................................";
		this.params["map1-9"] = "............................................................";
		this.params["map1-10"] = "............................................................";
		this.params["map1-11"] = "............................................................";
		this.params["map1-12"] = "............................................................";
		this.params["map1-13"] = "............................................................";
		this.params["map1-14"] = "............................................................";
		this.params["map1-15"] = "............................................................";
		this.params["map1-16"] = "............................................................";
		this.params["map1-17"] = "............................................................";
		this.params["map1-18"] = "............................................................";
		this.params["map1-19"] = "............................................................";
		this.params["map1-20"] = "............................................................";
		this.params["map1-21"] = "............................................................";
		this.params["map1-22"] = "...12....12.....12.....12....12....12.......................";
		this.params["map1-23"] = "............................................................";
		this.params["map1-24"] = "............................................................";
		this.params["map1-25"] = "...................O........................................";
		this.params["map1-26"] = ".................aaaa...................feef................";
		this.params["map1-27"] = ".............aaaaaaaaaaa................e..e..............E.";
		this.params["map1-28"] = "..........O..aaaaaaaaaaa.O.....O........feefeef..feeeefeeeef";
		this.params["map1-29"] = "..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.......e..e..e..e....e....e";

		this.params["map2-0"] = "............................................................";
		this.params["map2-1"] = "............................................................";
		this.params["map2-2"] = "............................................................";
		this.params["map2-3"] = "............................................................";
		this.params["map2-4"] = "............................................................";
		this.params["map2-5"] = "............................................................";
		this.params["map2-6"] = "............................................................";
		this.params["map2-7"] = "............................................................";
		this.params["map2-8"] = "............................................................";
		this.params["map2-9"] = "............................................................";
		this.params["map2-10"] = "............................................................";
		this.params["map2-11"] = "............................................................";
		this.params["map2-12"] = "............................................................";
		this.params["map2-13"] = "............................................................";
		this.params["map2-14"] = "............................................................";
		this.params["map2-15"] = "............................................................";
		this.params["map2-16"] = "............................................................";
		this.params["map2-17"] = "............................................................";
		this.params["map2-18"] = "............................................................";
		this.params["map2-19"] = "............................................................";
		this.params["map2-20"] = "............................................................";
		this.params["map2-21"] = "........................................................8...";
		this.params["map2-22"] = "..................99........12.....12....12....12.......a...";
		this.params["map2-23"] = "..................dd...................................aaa..";
		this.params["map2-24"] = "..e.ef...................9.9.9.9......................aaaaa.";
		this.params["map2-25"] = "..e..e.............................................F.aaaaaaa";
		this.params["map2-26"] = "..e..e.......E..............................aaaaaaaaaaaaaaaa";
		this.params["map2-27"] = "..e..e.feeefeeef..99...................F....aaaaaaaaaaaaaaaa";
		this.params["map2-28"] = "..feef.e...e...e..dd...aaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaa";
		this.params["map2-29"] = "..e..e.e...e...e.......aaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaa";
	}

	setValueFromHTMLText(paramString: string) {
		var str1 = "";
		var arrayOfString1 = new Array(1000);
		var arrayOfString2 = new Array(1000);
		var i = 0;
		for (var m = 0; m <= 999; m++) {
			arrayOfString1[m] = null;
			arrayOfString2[m] = null;
		}
		this.initParameter();

		str1 = String(paramString);

		var j = str1.indexOf("<body ");
		if (j < 0) {
			j = str1.indexOf("<BODY ");
		}
		if (j >= 0) {
			str1 = str1.substring(j, str1.length);
		}
		j = str1.indexOf("<applet ");
		if (j < 0) {
			j = str1.indexOf("<APPLET ");
		}
		if (j >= 0) {
			str1 = str1.substring(j, str1.length);
		}
		j = str1.lastIndexOf("</applet>");
		if (j < 0) {
			j = str1.lastIndexOf("</APPLET>");
		}
		if (j >= 0) {
			str1 = str1.substring(0, j + 1 + 8);
		}
		var flag301 = true;
		for (;;) {
			j = str1.indexOf("<!--");
			if (j < 0) {
				flag301 = false;
				break;
			}
			var str2 = String(str1.substring(j + 4, str1.length));

			var k = str2.indexOf("-->");
			if (k < 0) {
				break;
			}
			str1 = String(str1.substring(0, j + 1) + str2.substring(k + 3, str2.length));
		}
		if (flag301) str1 = String(str1.substring(0, j + 1));
		var n = 0;
		i = 0;
		for (;;) {
			j = str1.indexOf("param");
			if (j < 0) {
				j = str1.indexOf("PARAM");
			}
			if (j < 0) {
				break;
			}
			str1 = String(str1.substring(j + 5, str1.length));

			j = str1.indexOf("name");
			if (j < 0) {
				j = str1.indexOf("NAME");
			}
			if (j < 0) {
				break;
			}
			j = str1.indexOf("=");
			if (j < 0) {
				break;
			}
			str1 = String(str1.substring(j + 1, str1.length));

			j = str1.indexOf('"');
			if (j >= 0 && j <= 7) {
				str1 = String(str1.substring(j + 1, str1.length));

				j = str1.indexOf('"');
				if (j < 0) {
					break;
				}
				arrayOfString1[n] = String(str1.substring(0, j));
			} else {
				j = str1.indexOf(" ");
				if (j < 0) {
					break;
				}
				if (j == 0) {
					str1 = String(str1.substring(1, str1.length));

					j = str1.indexOf(" ");
					if (j < 0) {
						break;
					}
				}
				arrayOfString1[n] = String(str1.substring(0, j));
			}
			j = str1.indexOf("value");
			if (j < 0) {
				j = str1.indexOf("VALUE");
			}
			if (j < 0) {
				break;
			}
			j = str1.indexOf("=");
			if (j < 0) {
				break;
			}
			str1 = String(str1.substring(j + 1, str1.length));

			j = str1.indexOf('"');
			if (j >= 0 && j <= 7) {
				str1 = String(str1.substring(j + 1, str1.length));

				j = str1.indexOf('"');
				if (j < 0) {
					break;
				}
				arrayOfString2[n] = String(str1.substring(0, j));
			} else {
				j = str1.indexOf(" ");
				if (j < 0) {
					break;
				}
				if (j == 0) {
					str1 = str1.substring(1, str1.length);

					j = str1.indexOf(" ");
					if (j < 0) {
						break;
					}
				}
				arrayOfString2[n] = String(str1.substring(0, j));
			}
			n++;
			i++;
		}
		for (m = 0; m < i; m++) {
			this.setValue(arrayOfString1[m], arrayOfString2[m]);
		}
		return true;
	}
}

export { TagDataBase };