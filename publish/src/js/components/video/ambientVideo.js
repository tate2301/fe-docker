// import isVisible from '@dexter/dexterui-tools/lib/utils/element/isVisible';

// export default class AmbientVideo {
//     constructor(element) {
//         this.element = element;
//         this.playBtn = this.element.querySelector('.video-play');
//         this.videos = this.element.querySelectorAll('.inline-play');
//         this.bindEvents();
//     }

//     isPlaying = video =>
//         !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

//     bindEvents() {
//         this.videos.forEach((video) => {
//             video.addEventListener('click', () => {
//                 video.classList.toggle('play-Onclick');
//                 if (this.isPlaying(video)) {
//                     video.pause();
//                 } else {
//                     video.play();
//                 }
//             });
//         });

//         this.playBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             this.videos.forEach((video) => {
//                 if (isVisible(video)) {
//                     video.classList.remove('play-Onclick');
//                     video.play();
//                 }
//             });
//         });
//     }
// }
