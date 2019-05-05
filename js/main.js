window.$=jQuery;
$('.images>img:nth-child(1)').addClass('enter');
$('.images>img:nth-child(2)').addClass('waiting');
$('.images>img:nth-child(3)').addClass('waiting');
$('.images>img:nth-child(4)').addClass('waiting');
var i=1;
setInterval(()=>{
    $(`.images>img:nth-child(${i})`).addClass('leave').removeClass('enter')
    .on('transitionend',(e)=>{
        $(e.currentTarget).addClass('waiting').removeClass('leave');
    });
    if(i===4){
        i=0;
    }
    $(`.images>img:nth-child(${i+1})`).addClass('enter').removeClass('waiting');
    i+=1;   
},3000);
