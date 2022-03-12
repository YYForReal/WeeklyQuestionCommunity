class MyVideo {
    constructor(videoNode) {
        this.video = videoNode;
        this.playState = false;
    }
    // 注册播放按钮事件
    registerPlayButton(playButton) {
        this.playButtonListener = ()=>{this.playOrPause()};
        this.playButton = playButton;
        playButton.addEventListener('click',this.playButtonListener );
    }
    // 注册上个视频和下个视频的按钮事件
    registerChangeButton(prevButton, nextButton) {
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.prevButtonListener = ()=>{this.changePrev()};
        this.nextButtonListener = ()=>{this.changeNext()};
        prevButton.addEventListener('click',this.prevButtonListener );
        nextButton.addEventListener('click',this.nextButtonListener );
    }
    // 注册音量播放条
    registerVolumeProgress(volumeProgress) {
        this.volumeProgress = volumeProgress;
        this.volumeProgress._value = 20;
        let _this = this;
        // 设一个数据劫持，同步改下视频的音量
        Object.defineProperty(this.volumeProgress, '_value', {
            enumerable: true,
            configurable: true,
            set: function (value) {
                console.log("change value :", _this, value);
                _this.video.volume = value / 100.0;
                _this.volumeProgress.value = value;
            },
            get: function () {
                return _this.volumeProgress.value;
            }
        })
        this.volumeEventListener = (e) => {
            console.dir(e.target,e.eventTarget);
            this.volumeProgress._value = e.target.value;
            // this.video.volume = volumeProgress.value / 100.0;
        }
        this.volumeProgress.addEventListener('input',this.volumeEventListener );
    }
    // 注册键盘事件
    registerKeyBoardEvent() {
        this.keyboardListener = (e)=>{
            console.log(e.key)

            switch (e.key) {
                case 'ArrowUp': {
                    if (this.volumeProgress._value < 100) {
                        this.volumeProgress._value++;
                    }
                    break;
                }
                case 'ArrowDown': {
                    if (this.volumeProgress._value > 0) {
                        this.volumeProgress._value--;
                    }
                    break;
                }
                case 'ArrowLeft': {
                    this.changePrev();
                    break;
                }
                case 'ArrowRight': {
                    this.changeNext();
                    break;
                }
                case ' ': {
                    this.playOrPause();
                    break;
                }   
            }

        }
        document.addEventListener('keydown', this.keyboardListener);
    }
    changePrev() {
        let len = this.videoList.length;
        this.nowIndex = ((this.nowIndex - 1 + len) % len);
        this.video.src = this.videoList[this.nowIndex];
        this.video.play();
    }
    changeNext() {
        this.nowIndex = (this.nowIndex + 1) % this.videoList.length;
        this.video.src = this.videoList[this.nowIndex];
        this.video.play();
    }
    playOrPause() {
        if (this.playState == false) {
            this.video.play();
        } else {
            this.video.pause();
        }
        this.playState = !this.playState;
    }
    // 注册视频列表
    registerVideoList(videoList) {
        this.videoList = videoList;
        this.nowIndex = 0;
        this.video.src = this.videoList[this.nowIndex];
        // this.video.play();
        // 如果播放完毕，自动进入一下个视频
        this.video.onended = ()=>{this.changeNext()};
    }
    clearAllListener(){
        if(this.playButton){
            this.playButton.clearEventListener(this.playButtonListener);
        }
        if(this.prevButton){
            this.prevButton.clearEventListener(this.prevButtonListener);
        }
        if(this.nextButton){
            this.nextButton.clearEventListener(this.nextButtonListener);
        }
        if(this.keyboardListener){
            document.clearEventListener(this.keyboardListener);
        }
        if(this.volumeEventListener){
            this.volumeProgress.clearEventListener(this.volumeEventListener);
        }
    }
}

export default MyVideo;