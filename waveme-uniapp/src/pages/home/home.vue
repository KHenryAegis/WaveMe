<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'NFC测试',
  },
}
</route>

<template>  
    <view class="content">  
        <view class="uni-common-mt">  
            <view class="uni-form-item uni-column">  
                <input class="uni-input" v-model="inputValue" focus placeholder="请输入NFC要写入的内容" />  
                <button type="default" @click="writeData()">写入NFC</button>  
                <button type="default" @click="readData()">读取NFC</button>  
            </view>  
        </view>  
    </view>  
</template>  

<script>  
    var NfcAdapter;  
    var NdefRecord;  
    var NdefMessage;  
    var waiting  
    var readyRead = false;  
    var readyWriteData = false;  
    var nfcAdapter, main, pendingIntent, intentFiltersArray, techListsArray, IntentFilter  

    export default {  
        data() {  
            return {  
                inputValue: '',  
                currentNFCInfo: [], //NFC 读取消息；    
                bannerShow: false,  
                remark: "",  
                message: "",  
                count: 0,  
                timestampHide: "",  
                timestampShow: ""  
            };  
        },  
        methods: {  
            listenNFCStatus() {  
                try {  
                    console.log('Init NFC...');  
                    main = plus.android.runtimeMainActivity();  
                    var Intent = plus.android.importClass('android.content.Intent');  
                    var Activity = plus.android.importClass('android.app.Activity');  
                    var PendingIntent = plus.android.importClass('android.app.PendingIntent');  
                    IntentFilter = plus.android.importClass('android.content.IntentFilter');  
                    NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter');  
                    nfcAdapter = NfcAdapter.getDefaultAdapter(main);  
                    var intent = new Intent(main, main.getClass());  
                    intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);  
                    pendingIntent = PendingIntent.getActivity(main, 0, intent, 0);  
                    var ndef = new IntentFilter("android.nfc.action.TECH_DISCOVERED");  
                    ndef.addDataType("*/*");  
                    intentFiltersArray = [ndef];  
                    techListsArray = [  
                        ["android.nfc.tech.IsoDep"],  
                        ["android.nfc.tech.NfcA"],  
                        ["android.nfc.tech.NfcB"],  
                        ["android.nfc.tech.NfcF"],  
                        ["android.nfc.tech.Ndef"],  
                        ["android.nfc.tech.NfcV"],  
                        ["android.nfc.tech.NdefFormatable"],  
                        ["android.nfc.tech.MifareClassic"],  
                        ["android.nfc.tech.MifareUltralight"]  
                    ];  

                } catch (e) {  
                    console.error(e);  
                }  
            },  
            handle_nfc_data() {  

                NdefRecord = plus.android.importClass("android.nfc.NdefRecord");  
                NdefMessage = plus.android.importClass("android.nfc.NdefMessage");  
                // main = plus.android.runtimeMainActivity();    
                var intent = main.getIntent();  

                console.log("action type:" + intent.getAction());  
                if ("android.nfc.action.TECH_DISCOVERED" == intent.getAction()) {  
                    if (readyRead) {  
                        this.__read(intent);  
                        readyRead = false;  
                    }  
                    if (readyWriteData) {  
                        this.__write(intent);  
                        readyWriteData = false;  
                    }  
                } else {  
                    // waiting.close();    
                    console.log("nfc读取失败")  
                    uni.showToast({  
                        title: "NFC获取失败.",  
                        icon: "none"  
                    });  
                }  
            },  
            __read(intent) {  
                try {  
                    var content = "";  
                    waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！");  
                    waiting.setTitle('请勿移开标签\n正在读取数据...');  
                    var tag = plus.android.importClass("android.nfc.Tag");  
                    waiting.close();  
                    var Parcelable = plus.android.importClass("android.os.Parcelable");  
                    // var rawmsgs = intent.getParcelableArrayExtra("android.nfc.extra.NDEF_MESSAGES");    
                    var rawmsgs = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);  

                    if (rawmsgs != null && rawmsgs.length > 0) {  
                        waiting.close();  
                        console.log(JSON.stringify(rawmsgs[0]));  
                        var records = rawmsgs[0].getRecords();  
                        var result = records[0].getPayload();  
                        console.log(JSON.stringify(result))  
                        if (result != null) {  
                            var s = plus.android.newObject("java.lang.String", result);  
                            console.log(s);  
                            this.currentNFCInfo = s;  
                            uni.showModal({  
                                title: 'NFC信息',  
                                showCancel: false,  
                                content: JSON.stringify(s),  
                            });  
                        } else {  
                            this.currentNFCInfo = "";  
                        }  
                    } else {  
                        console.log("NFC获取失败");  
                        uni.showToast({  
                            title: "NFC获取失败.",  
                            icon: "none"  
                        });  
                    }  

                } catch (e) {  
                    console.log(e);  
                    console.log("NFC获取失败,丢出异常");  
                    waiting.close();  
                    uni.showToast({  
                        title: "NFC获取失败,丢出异常.",  
                        icon: "none"  
                    });  
                    //TODO handle the exception    
                }  
            },  
            readData() {  
                readyRead = true;  
                //  waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！");    
                setTimeout(this.handle_nfc_data, 1000);  
            },  
            __write(intent) {  
                try {  
                    waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！");  
                    waiting.setTitle('请勿移开标签\n正在写入...');  
                    // var textBytes = plus.android.invoke(this.inputValue, "getBytes");  
                    // var typeBytes = plus.android.invoke('text/plain', 'getBytes')  
                    // 创建 NDEF 记录    
                    // var textRecord = new NdefRecord(  
                    //  NdefRecord.TNF_MIME_MEDIA, // TNF 类型    
                    //  typeBytes, // 类型（MIME 类型）    
                    //  null, // ID（留空以自动生成）    
                    //  textBytes, // 有效负载（文本的字节表示）    
                    // );  

                    // 创建包含 URI 的新 NDEF 记录  
                    var ndefRecord = NdefRecord.createUri(this.inputValue);  

                    var message = new NdefMessage([ndefRecord]);  
                    console.log('messgae=' + message)  
                    var Ndef = plus.android.importClass('android.nfc.tech.Ndef');  
                    var NdefFormatable = plus.android.importClass('android.nfc.tech.NdefFormatable');  
                    var tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);  
                    var ndef = Ndef.get(tag);  
                    if (ndef != null) {  
                        var size = message.toByteArray().length;  
                        console.log("size=" + size);  
                        ndef.connect();  
                        if (!ndef.isWritable()) {  
                            console.log("tag不允许写入");  
                            waiting.close();  
                            uni.showToast({  
                                title: "tag不允许写入.",  
                                icon: "none"  
                            });  
                            return;  
                        }  
                        if (ndef.getMaxSize() < size) {  
                            console.log("文件大小超出容量");  
                            waiting.close();  
                            uni.showToast({  
                                title: "文件大小超出容量.",  
                                icon: "none"  
                            });  
                            return;  
                        }  
                        // console.log('写入数据：' + JSON.stringify(message) + ' __TYPE__: ' + JSON.stringify(message.__TYPE__));    
                        console.log("message:" + message)  
                        ndef.writeNdefMessage(message);  

                        waiting.close();  
                        console.log("写入数据成功.");  
                        uni.showToast({  
                            title: "写入数据成功.",  
                            icon: "none"  
                        });  
                        return;  
                    } else {  
                        var format = NdefFormatable.get(tag);  
                        if (format != null) {  
                            try {  
                                format.connect();  
                                format.format(message);  
                                console.log("格式化tag并且写入message")  
                                waiting.close();  
                                return;  
                            } catch (e) {  
                                console.log("格式化tag失败.");  
                                waiting.close();  
                                uni.showToast({  
                                    title: "格式化tag失败.",  
                                    icon: "none"  
                                });  
                                return;  
                            }  
                        } else {  
                            console.log("Tag不支持NDEF");  
                            uni.showToast({  
                                title: "Tag不支持NDEF",  
                                icon: "none"  
                            });  
                            waiting.close();  
                            return;  
                        }  
                    }  
                } catch (e) {  
                    console.log("error=" + e);  
                    waiting.close();  
                    console.log('写入失败');  
                }  
            },  
            writeData() {  
                readyWriteData = true;  
                // waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！");    
                setTimeout(this.handle_nfc_data, 1000);  
            },  
        },  
        onLoad: function(option) {  
            console.log('onLoad')  
            this.listenNFCStatus()  
        },  
        onShow: function() {  
            console.log('page Show');  
            this.listenNFCStatus()  
            this.timestampShow = (new Date()).getTime();  
            console.log(this.timestampShow)  
            var TimeScale = this.timestampShow - this.timestampHide;  
            console.log(TimeScale, nfcAdapter, '134 line');  
            if (nfcAdapter == null) {  
                alert("设备不支持NFC！");  
                return;  
            }  
            if (!nfcAdapter.isEnabled()) {  
                alert("请在系统设置中先启用NFC功能！");  
                return;  
            }  
            nfcAdapter && nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);  
            if (this.count++ == 0) {  
                // this.listenNFCStatus()    
                return false;  
            } else if (TimeScale > 400) {  
                return false;  
            } else {  
                // this.readData();  
                // this.writeData();  
            }  
        },  
        onHide: function() {  
            console.log("onHide");  
            this.timestampHide = (new Date()).getTime();  
            console.log(this.timestampHide);  
        }  
    }  
</script>  

<style>  
    .content {  
        display: flex;  
        flex-direction: column;  
        align-items: center;  
        justify-content: center;  
    }  

    .logo {  
        height: 200rpx;  
        width: 200rpx;  
        margin-top: 200rpx;  
        margin-left: auto;  
        margin-right: auto;  
        margin-bottom: 50rpx;  
    }  

    .text-area {  
        display: flex;  
        justify-content: center;  
    }  

    .title {  
        font-size: 36rpx;  
        color: #8f8f94;  
    }  
</style>