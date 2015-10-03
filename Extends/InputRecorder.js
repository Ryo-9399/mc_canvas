// Input Recorder
//

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
        this.tr1_key = 0;   //TR1に該当するキー（Space or Z）
        //最後のコンティニュー情報
        this.prev_cpoint_con = 0;
        this.prev_cpoint_stage = 0;
        this.prev_cpoint_x = 32;
        this.prev_cpoint_y = 320;
        this.continued = false; //プレイごとに管理
        //バッファ
        this.allbuf=[]; //全ステージ通しのデータが入ったバッファ
        this.buffers=[];
        this.current_buffer=null;
        this.current_buffer_size=0;
    };
    InputRecorder.prototype.init = function(){
        // GameKeyをフック
        var _this=this;
        var gk = this.mc.gk, _keyPressed = gk.keyPressed, _keyReleased = gk.keyReleased;
        gk.keyPressed = function(paramKeyEvent){
            var fl = gk.codekey_f[paramKeyEvent.keyCode]!==true;
            _keyPressed.call(gk, paramKeyEvent);
            //記録
            if(fl && _this.recording){
                _this.save(paramKeyEvent.keyCode, true);
            }
        };
        gk.keyReleased = function(paramKeyEvent){
            _keyReleased.call(gk, paramKeyEvent);
            if(_this.recording){
                _this.save(paramKeyEvent.keyCode, false);
            }
        };

        this.reset();
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
        //前の入力との差は15フレームまでしか記録できないので、それを超える場合はnopをはさむ
        while(sa>15){
            this.pushData(false, 15, 0);
            sa-=15;
        }
        //キーデータ
        this.pushData(pressed, sa, keyCode);
        this.last_frame = frame;
    };
    InputRecorder.prototype.saveCurrentPressing = function(){
        //今のフレームを記録
        var gk=this.mc.gk, codekey_f=gk.codekey_f;
        for(var i=0; i<256; i++){
            if(codekey_f[i]===true){
                this.pushData(true, this.frame-this.last_frame, i);
                this.last_frame=this.frame;
            }
        }
    };
    InputRecorder.prototype.pushData = function(pressed_flag, interval, keyCode){
        //3bitのキーコード
        var k1 = this.keyBits(keyCode);
        if(k1!==7){
            //1 octetであらわす
            this.addToBuffer(((+pressed_flag)<<7) | ((interval & 15)<<3) | (k1&7));
        }else{
            //2 octetsであらわす
            this.addToBuffer(((+pressed_flag)<<7) | ((interval & 15)<<3) | 7);
            this.addToBuffer(keyCode);
        }
    };
    InputRecorder.prototype.addToBuffer = function(char){
        //実際にbufferをいじる
        if(this.current_buffer_size===this.current_buffer.length){
            //満杯なので次のバッファを作る
            this.buffers.push(this.current_buffer);
            this.initBuffer();
        }
        this.current_buffer[this.current_buffer_size++] = char;
    };
    InputRecorder.prototype.reset = function(){
        //タイトル画面時の初期化
        this.allbuf=[];
        this.buffers=[];
        this.prev_cpoint_con = 0;
        this.prev_cpoint_stage = 0;
        this.prev_cpoint_x = 0;
        this.prev_cpoint_y = 0;
    };
    InputRecorder.prototype.masaoEvent = function(g,image){
        var mc=this.mc, mp=mc.mp, ml_mode=mp.ml_mode;
        var prev_playing = this.prev_ml_mode===100 || this.prev_ml_mode===110,
            playing = ml_mode===100 || ml_mode===110;
        if(!prev_playing && playing){
            //ゲーム開始した
            this.initBuffer();
            this.frame=0;
            this.last_frame=0;
            this.stage=mp.stage;
            this.tr1_key=0;
            this.ran_seed=mp.ran_seed;
            this.recording=true;
            //コンティニュー関係の初期化
            this.continued=false;
            this.prev_cpoint_con = mp.cpoint_con;
            this.prev_cpoint_stage = mp.cpoint_stage;
            this.prev_cpoint_x = mp.cpoint_x;
            this.prev_cpoint_y = mp.cpoint_y;

            //0フレーム目の入力を記録
            this.saveCurrentPressing();
        }else if(prev_playing && !playing){
            //ステージが終わった

            //全てのバッファをまとめる
            var result_buffers=this.buffers.concat(this.current_buffer.subarray(0,Math.ceil(this.current_buffer_size/4)*4));
            //lengthを計算
            var buffer_length = 0;
            result_buffers.forEach(function(buf){
                buffer_length += buf.length * buf.BYTES_PER_ELEMENT;
            });
            //種類(クリアした="clear", やられた="miss", 中断した="abort")
            var status;
            if(mp.stage !== this.stage || ml_mode===260 || ml_mode >= 400){
                //ステージが進行した or ゲームクリア画面なのでステージクリアした
                status="clear";
            }else if(ml_mode>=300 || ml_mode===90 || ml_mode===250){
                //ゲームオーバー画面 or ステージ開始画面
                status="miss";
            }else{
                status="abort";
            }
            //最終スコア
            var score=mp.score;

            //HEADER blockを作成
            var header = new Uint8Array(16);
            var header_view = new DataView(header.buffer);
            //seed
            header_view.setUint32(0, this.ran_seed, false);
            //stage
            header_view.setUint8(4, this.stage);
            //status
            /// 1bit目（clearかどうか）
            var status_octet = status==="clear" ? 1 : 0;
            /// 2bit目（TR1がZかどうか）
            status_octet |= this.tr1_key===90 ? 2 : 0;
            header_view.setUint8(5, status_octet);
            //reserved
            header_view.setUint16(6,0);
            //score
            header_view.setUint32(8, score, false);
            //length
            header_view.setUint32(12, buffer_length, false);
            //HEADER blockを結合
            result_buffers = [header].concat(result_buffers);

            //クリアデータに必要か？
            var required = status==="clear" || this.continued;

            //状況を表すオブジェクトを作る
            var result={
                status: status,
                continued: this.continued,
                required: required,
                //入力データが表すステージ(1-4)
                stage: this.stage,
                //最終スコア
                score: score,
                buffer: this.singlify(result_buffers)
            };
            if(this.inputdataCallback != null){
                this.inputdataCallback(result);
            }
            //記録
            if(required){
                //クリアのログを残す
                this.allbuf = this.allbuf.concat(result_buffers);
                if(ml_mode>=400 && this.inputdataCallback != null){
                    //全部終わったので結果をアレする
                    //METADATA blockを作る
                    var metadata = new Uint8Array([0x4D, 0x0E, 0x50, 0x0A,
                                                  0x00, 0x00, 0x00, 0x02,
                                                  0x00, 0x00, 0x00, 0x0C
                    ]);
                    this.allbuf = [metadata].concat(this.allbuf);
                    setTimeout(function(){
                        this.inputdataCallback({
                            status: "all",
                            stage: this.stage,
                            score: score,
                            buffer: this.singlify(this.allbuf)
                        });
                    }.bind(this),0);
                }
            }
            if(ml_mode===50){
                //タイトルに戻った
                this.reset();
            }
            this.recording=false;
        }else if(playing){
            this.frame++;
            if(this.prev_cpoint_con !== mp.cpoint_con || this.prev_cpoint_stage !== mp.cpoint_stage || this.prev_cpoint_x !== mp.cpoint_x || this.prev_cpoint_y != mp.cpoint_y){
                //コンティニューされた
                this.continued=true;
                this.prev_cpoint_con = mp.cpoint_con;
                this.prev_cpoint_stage = mp.cpoint_stage;
                this.prev_cpoint_x = mp.cpoint_x;
                this.prev_cpoint_y = mp.cpoint_y;
            }
        }
        this.prev_ml_mode = ml_mode;
    };
    InputRecorder.prototype.singlify = function(buffers){
        //buffersはじつはTypedArrayの配列
        //バッファのサイズを計算する
        for(var sum=0, i=0, l=buffers.length; i<l; i++){
            var buf=buffers[i];
            sum+=buf.length*buf.BYTES_PER_ELEMENT;
        }
        //全て
        var result = new ArrayBuffer(sum);
        var buf1, buf2;
        //コピーする
        for(sum=0, i=0; i<l; i++){
            buf=buffers[i];
            var size=buf.length*buf.BYTES_PER_ELEMENT;
            //Uint8Arrayを介してコピー
            buf1=new Uint8Array(result, sum, size);
            buf2=new Uint8Array(buf.buffer, 0, size);
            buf1.set(buf2);
            sum+=size;
        }
        return result;
    };
    InputRecorder.prototype.keyBits = function(keyCode){
        //keyCodeをアレにする
        if(keyCode===0){
            //nop
            return 0;
        }else if(keyCode===37 || keyCode===100){
            //LEFT
            return 1;
        }else if(keyCode===38 || keyCode===104){
            //UP
            return 2;
        }else if(keyCode===39 || keyCode===102){
            //RIGHT
            return 3;
        }else if(keyCode===40 || keyCode===98){
            //DOWN
            return 4;
        }else if(keyCode===88){
            //X
            return 6;
        }else if(this.tr1_key===keyCode){
            //TR1
            return 5;
        }else{
            if(this.tr1_key===0){
                //まだTR1が定まっていない
                if(keyCode===90){
                    //Z
                    this.tr1_key=90;
                    return 5;
                }else if(keyCode===32){
                    //Space
                    this.tr1_key=32;
                    return 5;
                }
            }
            //その他のキーだ
            return 7;
        }
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

