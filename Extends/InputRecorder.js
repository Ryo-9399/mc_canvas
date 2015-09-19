// Input Recorder
//

/*
 * Input binary format:
 *
 * BODY block:
 *   fxxxxxxx | f: 0 = release, 1 = press. xxxxxxx: interval in frames
 *   kkkkkkkk | k: key code. (0 = nop)
 */

CanvasMasao.InputRecorder = (function(){
    var InputRecorder = function(mc){
        this.mc=mc;
        //前フレームのml_modeを記録
        this.prev_ml_mode=0;
        //現在のフレーム
        this.frame=0;
        //最後にキー入力を記録したフレーム
        this.last_frame=0;
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
            if(fl){
                _this.save(gk.key_code, true);
            }
        };
        gk.keyReleased = function(paramKeyEvent){
            _keyReleased.call(gk, paramKeyEvent);
            _this.save(paramKeyEvent.keyCode, false);
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
        if(this.prev_ml_mode!==100 && ml_mode===100){
            //ゲーム開始した
            this.frame=0;
            this.last_frame=0;
        }else if(this.prev_ml_mode===100 && ml_mode!==100){
            //ステージ終わった TODO
            console.log(this.buffers, this.current_buffer.subarray(0,this.current_buffer_size));
        }else{
            this.frame++;
        }
        this.prev_ml_mode = ml_mode;
    };
    InputRecorder.inject = function(mc){
        var _ui=mc.userInit, _us=mc.userSub;
        mc.userInit = function(){
            _ui.apply(mc);
            this.inputRecorder = new CanvasMasao.InputRecorder(this);
            this.inputRecorder.init();
        };
        mc.userSub = function(g,image){
            _us.call(mc,g,image);
            this.inputRecorder.masaoEvent(g, image);
        }
    };
    return InputRecorder;
})();

