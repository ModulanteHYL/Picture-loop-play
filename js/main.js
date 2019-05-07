let $images = $('.images');
let $imgs = $('.images').children('img');
let current = 1;
init();
let timer =loopStart();
    $(loopPlay).on('mouseenter', function () {
        loopStop(timer);
    }).on('mouseleave', function () {
        timer = loopStart();
    });
$(btnList).on('click', 'button', function (e) {
    let id = $(e.currentTarget).attr('id');
    let index;
    if (id === 'previous') {//上一张
        index = Modified_value(current - 1);
    } else if (id === 'next') {//下一张
        index = Modified_value(current + 1);
    } else {
        index = Number($(e.currentTarget).attr('id'));
    }
    nextPicture(index);
});
function init() {//初始化
    let firstPicture = $imgs.eq(0).clone(true);
    let lastPicture = $imgs.eq($imgs.length - 1).clone(true);
    $images.append(firstPicture);//在第一张的前面加入最后一张图
    $images.prepend(lastPicture);//在最后一张的后面加入第一张图
}
function nextPicture(index) {
    if (current === 1 && index === $imgs.length) {//当前为第一张，想跳到最后一张
        $images.css({ transform: `translateX(${(-current + 1) * 400}px)` });
        $images.one('transitionend', function () {
            $images.css({ transition: 'none' }).hide()
                .css({ transform: `translateX(${-index * 400}px)` }).show()
                .css({ transition: 'all 0.5s' });
        });
    } else if (current === $imgs.length && index === 1) {//当前为最后一张，想跳到第一张
        $images.css({ transform: `translateX(${(-current - 1) * 400}px)` });
        $images.one('transitionend', function () {
            $images.css({ transition: 'none' }).hide()
                .css({ transform: `translateX(${-index * 400}px)` }).show()
                .css({ transition: 'all 0.5s' });
        });
    } else {
        $images.css({ transform: `translateX(${-index * 400}px)` });
    }
    current = index;
}
function loopStart() {//循环播放开始
    return setInterval(function () {
        let index = Modified_value(current + 1);
        nextPicture(index);
    }, 2000);
}
function loopStop(timer){//循环播放结束
    window.clearInterval(timer);
}
function Modified_value(index) {//让index的值永远是1、2、3、4
    let num = index;
    if (num < 1) {
        num = $imgs.length;
    } else if (num > $imgs.length) {
        num = 1;
    }
    return num;
}