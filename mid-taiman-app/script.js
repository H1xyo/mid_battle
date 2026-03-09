// 要素の取得
const videoMain = document.getElementById('video-main');
const videoSub = document.getElementById('video-sub');
const switchBtn = document.getElementById('switch-btn');

// 1. 再生・一時停止の同期
videoMain.onplay = () => videoSub.play();
videoMain.onpause = () => videoSub.pause();

// 2. シーク（スキップ・巻き戻し）の同期
// メインの再生時間が変わった瞬間、サブの時間を強制一致させる
videoMain.ontimeupdate = () => {
    // ズレを防ぐため、0.1秒以上の差がある時だけ同期
    if (Math.abs(videoMain.currentTime - videoSub.currentTime) > 0.1) {
        videoSub.currentTime = videoMain.currentTime;
    }
};

// 3. 視点切り替えのロジック
let isMainVisible = true;

switchBtn.onclick = () => {
    if (isMainVisible) {
        // 相手視点に切り替え
        // 時刻を合わせておく
        videoSub.currentTime = videoMain.currentTime;
        videoMain.style.display = 'none';
        videoSub.style.display = 'block';
        videoSub.controls = true; // 操作バーをサブに移す
        videoMain.controls = false;
        switchBtn.innerText = '自分視点に戻る';
    } else {
        // 自分視点に戻る
        // サブ側の時間をメインにコピー
        videoMain.currentTime = videoSub.currentTime;
        videoSub.style.display = 'none';
        videoMain.style.display = 'block';
        videoMain.controls = true;
        videoSub.controls = false;
        switchBtn.innerText = '相手視点を見る';
    }
    isMainVisible = !isMainVisible;
};