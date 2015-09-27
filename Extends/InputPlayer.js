// Input Player


CanvasMasao.InputPlayer = (function(){
    var InputPlayer = function(mc, inputdata){
        this.mc = mc;
        this.inputdata = inputdata;

        //キー番号とキーコードの表
        this.keyTable = {
            //LEFT
            "1": 37,
            //UP
            "2": 38,
            //RIGHT
            "3": 39,
            //DOWN
            "4":40,
            //TR1
            "5": 32,    //暫定
            //X
            "6": 88
        };
    };
    InputPlayer.prototype.init = function(){
        //マウスを押したか
        this.mouse_f=false;
        //ステージの初期化フラグ
        this.stage_f=false;
        //再生終了フラグ
        this.end_f=false;
        this.initReader();

        //GameKeyを乗っ取る
        var gk = this.mc.gk;
        this._keyPressed = gk.keyPressed, this._keyReleased = gk.keyReleased;
        gk.keyPressed = function(paramKeyEvent){
        };
        gk.keyReleased = function(paramKeyEvent){
        };
    };
    InputPlayer.prototype.initReader = function(){
        //データの読み取りを初期化
        var buf = new Uint8Array(this.inputdata/*,0,12*/);
        console.log(buf);
        if(buf[0]!==0x4D || buf[1]!==0x0E || buf[2]!==0x50 || buf[3]!==0x0A){
            //マジックナンバーが合わない
            console.error("入力データの読み込みに失敗しました。不明なファイル形式です。");
            this.playing=false;
            return;
        }
        if(buf[4]!==0 || buf[5]!==0 || buf[6]!==0 || buf[7]!==2){
            //ハージョンが合わない（v2のみ対応）
            console.error("入力データのバージョンに対応していません。");
            this.playing=false;
            return;
        }
        this.head_idx = 12;  //読み込み開始位置
    };
    InputPlayer.prototype.initStage = function(){
        //HEADERブロックを読んで備える(this.head_idxがHEADERブロックを指している)
        if(this.inputdata.byteLength <= this.head_idx){
            //もうないのでは
            this.playing = false;
            return;
        }
        if(this.stage_f===true){
            return;
        }
        //再生中フラグ
        this.playing = true;
        //ステージを初期化直後である感じのフラグ
        this.stage_f=true;
        var v=new DataView(this.inputdata), head_idx=this.head_idx;
        //seedを読む
        var ran_seed = v.getUint32(head_idx, false);
        this.mc.mp.ran_seed = ran_seed;
        //statusも読む
        var status = v.getUint32(head_idx+5)
        //Z flagを調べる
        this.keyTable[5] = status&2 ? 90 : 32;

        var body_size = v.getUint32(head_idx+12);
        console.log(head_idx, body_size);

        //bodyを示すTypedArray
        var body_buf = this.body_buf = new Uint8Array(this.inputdata, head_idx+16, body_size);
        //次のHEADERへ進める
        this.head_idx = head_idx+16+body_size;
        this.base_frame = 0; //最終フレーム
        this.frame = 0; //現在フレーム
        var body_idx = 0;
        this.body_idx = body_idx;
    };
    InputPlayer.prototype.masaoEvent = function(g, image){
        var mc=this.mc, ml_mode=mc.mp.ml_mode, gk=mc.gk;
        if(this.mouse_f===true){
            //マウスを押していたので開放
            mc.gm.mouseReleased({
                target: mc.__canvas,
                clientX: 0,
                clientY: 0
            });
            this.mouse_f=false;
        }
        if(ml_mode===60 && this.end_f===false){
            //ゲーム開始準備完了。ゲームを開始する
            mc.gm.mousePressed({
                //MouseEventをエミュレート
                target: mc.__canvas,
                clientX: 0,
                clientY: 0,
                preventDefault: function(){}
            });
            this.mouse_f=true;
        }
        if(ml_mode===60 || ml_mode===90){
            //ステージ初期化
            this.initStage();
        }else if(this.playing && (ml_mode===100 || ml_mode===110)){
            //ゲーム中なので再生する
            this.stage_f=false;
            var d = this.frame - this.base_frame, body_buf=this.body_buf, len=body_buf.length, body_idx = this.body_idx, c1, k, keyCode;
            while(body_idx < len){
                c1 = body_buf[body_idx];
                if(((c1&0x78)>>3) !== d){
                    //もうない
                    break;
                }
                d = 0;
                body_idx++;
                if(k = c1&7){
                    //キーを取得した
                    if(k===7){
                        //次のoctetを調べてkeyCodeとする
                        keyCode=body_buf[body_idx++];
                    }else{
                        //テーブルから調べる
                        keyCode=this.keyTable[k];
                    }
                    if(c1&0x80){
                        //押した
                        this._keyPressed.call(gk, {
                            keyCode: keyCode,
                            preventDefault: function(){}
                        });
                    }else{
                        this._keyReleased.call(gk, {
                            keyCode: keyCode,
                            preventDefault: function(){}
                        });
                    }
                }
                this.base_frame = this.frame;
            }
            this.frame++;
            //書き戻す
            this.body_idx = body_idx;
            if(body_idx >= len){
                //突破した（もうデータがない）
                this.playing = false;
            }
        }else if(ml_mode>=400){
            //クリアしたので再生終了
            this.end_f = true;
        }
    };
    InputPlayer.inject = function(mc, options){
        var _ui=mc.userInit, _us=mc.userSub;
        var inputdata = null;
        if(options.inputdata instanceof ArrayBuffer){
            inputdata = options.inputdata;
        }
        mc.userInit = function(){
            _ui.apply(mc);
            this.inputPlayer = new CanvasMasao.InputPlayer(this, inputdata);
            this.inputPlayer.init();
        };
        mc.userSub = function(g,image){
            _us.call(mc,g,image);
            this.inputPlayer.masaoEvent(g, image);
        };
    };
    return InputPlayer;
})();
