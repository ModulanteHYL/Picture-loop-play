initStatus();
var i = 1;
var timer=setInterval(() => {
    leave(getImgNode(i)).one('transitionend', (e) => {
        waiting($(e.currentTarget));
    });
    if (i === 4) { i = 0; }
    enter(getImgNode(i + 1));
    i += 1;
}, 3000);
$(document).on('visibilitychange',function(){
    if(document.hidden){
        window.clearInterval(timer);
    }else{
        timer=setInterval(() => {
            leave(getImgNode(i)).one('transitionend', (e) => {
                waiting($(e.currentTarget));
            });
            if (i === 4) { i = 0; }
            enter(getImgNode(i + 1));
            i += 1;
        }, 3000);
    }
});


function initStatus() {
    $('.images>img:nth-child(1)').addClass('enter')
        .siblings().addClass('waiting');
}
function getImgNode(index) {
    return $(`.images>img:nth-child(${index})`);
}
function leave($node) {
    return $node.addClass('leave').removeClass('enter')
}
function waiting($node) {
    return $node.addClass('waiting').removeClass('leave');
}
function enter($node) {
    return $node.addClass('enter').removeClass('waiting');
}