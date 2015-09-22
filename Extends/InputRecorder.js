// Input Recorder
//

/*
 * Input binary format:
 *
 * HEADER block:
 *   seed: 4 octets | initial ran_seed of succeeding BODY block in Big-Endian
 *   length: 4 octets | length in bytes of succeeding BODY block in Big-Endian
 *
 * BODY block:
 *   fxxxxxxx | f: 0 = release, 1 = press. xxxxxxx: interval in frames
 *   kkkkkkkk | k: key code. (0 = nop)
 */

CanvasMasao.InputRecorder = (function(){
    var InputRecorder = function(mc, inputdataCallback){
        this.mc=mc;
        //ひとかたまりのデータが揃ったときにコールバックする
        this.inputdataCallback = inputdataCallback;
        //前フレームのml_modeを記録
        this.prev_ml_mode=0;
        //現在のフレーム
        this.frame=0;
        //最後にキー入力を記録したフレーム
        this.last_frame=0;
        //現在記録中のデータに関する情報
        this.ran_seed=null; //最初のran_seed
        this.stage=null;    //現在のステージ
        this.recording = false;
        //バッファ
        this.buffers=[];
        this.current_buffer=null;
        this.current_buffer_size=0;
    };
    InputRecorder.prototype.init = function(){
        this.initBuffer();
        // GameKeyをフック
        var _this=this;
        var gk = this.mc.gk, _keyPressed = gk.keyPressed, _keyReleased = gk.keyReleased;
        gk.keyPressed = function(paramKeyEvent){
            var fl = gk.codekey_f[paramKeyEvent.keyCode]!==true;
            _keyPressed.call(gk, paramKeyEvent);
            //記録
            if(fl && _this.recording){
                _this.save(gk.key_code, true);
            }
        };
        gk.keyReleased = function(paramKeyEvent){
            _keyReleased.call(gk, paramKeyEvent);
            if(_this.recording){
                _this.save(paramKeyEvent.keyCode, false);
            }
        };
    };
    InputRecorder.prototype.initBuffer = function(){
        //バッファを作成
        this.current_buffer=new Uint8Array(4096);
        this.current_buffer_size=0;
    };
    InputRecorder.prototype.save = function(keyCode, pressed){
        //入力情報をバッファに保存
        var frame=this.frame, last_frame=this.last_frame;
        var sa=frame-last_frame;
        //前の入力との差は127フレームまでしか記録できないので、それを超える場合はnopをはさむ
        while(sa>127){
            this.pushData(false, 127, 0);
            sa-=127;
        }
        //キーデータ
        this.pushData(pressed, sa, keyCode);
    };
    InputRecorder.prototype.pushData = function(pressed_flag, interval, keyCode){
        if(this.current_buffer_size===this.current_buffer.length){
            //満杯なので次のバッファを作る
            this.buffers.push(this.current_buffer);
            this.initBuffer();
        }
        var sz=this.current_buffer_size, buf=this.current_buffer;
        buf[sz] = ((+pressed_flag)<<7) | (interval & 0x7F);
        buf[sz+1] = keyCode;
        this.current_buffer_size=sz+2;
    };
    InputRecorder.prototype.masaoEvent = function(g,image){
        var mc=this.mc, ml_mode=mc.mp.ml_mode;
        var prev_playing = this.prev_ml_mode===100 || this.prev_ml_mode===110,
            playing = ml_mode===100 || ml_mode===110;
        if(!prev_playing && playing){
            //ゲーム開始した
            this.frame=0;
            this.last_frame=0;
            this.stage = mc.mp.stage;
            this.ran_seed = mc.mp.ran_seed;
            this.recording=true;
        }else if(prev_playing && !playing){
            //ステージが終わった
            if(this.inputdataCallback != null){
                //全てのバッファをまとめる
                var result_buffers=this.buffers.concat(this.current_buffer.subarray(0,this.current_buffer_size));
                //lengthを計算
                var buffer_length = 0;
                result_buffers.forEach(function(buf){
                    buffer_length += buf.length * buf.BYTES_PER_ELEMENT;
                });
                //HEADER blockを作成
                var header = new Uint8Array(8);
                var header_view = new DataView(header.buffer);
                //seed
                header_view.setUint32(0, this.ran_seed, false);
                //length
                header_view.setUint32(4, buffer_length, false);
                //HEADER blockを結合
                result_buffers = [header].concat(result_buffers);

                //状況を表すオブジェクトを作る
                //種類(クリアした="clear", やられた="miss", 中断した="abort")
                var status;
                if(mc.mp.stage !== this.stage || ml_mode===260 || ml_mode >= 400){
                    //ステージが進行した or ゲームクリア画面なのでステージクリアした
                    status="clear";
                }else if(ml_mode>=300 || ml_mode===90 || ml_mode===250){
                    //ゲームオーバー画面 or ステージ開始画面
                    status="miss";
                }else{
                    status="abort";
                }
                var result={
                    status: status,
                    //入力データが表すステージ(1-4)
                    stage: this.stage,
                    //最終スコア
                    score: mc.mp.score,
                    buffers: result_buffers
                };
                this.inputdataCallback(result);
            }
            this.recording=false;
        }else{
            this.frame++;
        }
        this.prev_ml_mode = ml_mode;
    };
    InputRecorder.inject = function(mc, options){
        var _ui=mc.userInit, _us=mc.userSub;
        var inputdataCallback = null;
        if("function"===typeof options.inputdataCallback){
            inputdataCallback = options.inputdataCallback;
        }
        mc.userInit = function(){
            _ui.apply(mc);
            this.inputRecorder = new CanvasMasao.InputRecorder(this, inputdataCallback);
            this.inputRecorder.init();
        };
        mc.userSub = function(g,image){
            _us.call(mc,g,image);
            this.inputRecorder.masaoEvent(g, image);
        }
    };
    return InputRecorder;
})();

