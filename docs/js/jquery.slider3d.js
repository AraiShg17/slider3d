'use strict';

function slider3d(data) {
  var slide = ".js-slider3d-unit";
  var list = ".js-slider3d-list";
  var isCurrent = "is-current";
  var next = ".js-slider3d-next";
  var prev = ".js-slider3d-prev";
  var dom = null;
  var i = 0;

  var touchStartX;
  var touchStartY;
  var touchMoveX;
  var touchMoveY;


  //クローンセット
  var cloneSet = function(){
    dom = $(slide).html().replace(/ is-current/,'');


    if($(list).length <= 1){
      //スライダー要素の数が一つだったら
      $(prev).remove();
      $(next).remove();

    } else {
      //スライダー要素の数が2個以上だったら
      while(i < 5){
        //足りない分前にcloneを作る
        if($(list+'.'+isCurrent).prevAll().length < 3){
          $(slide).prepend(dom);
        }
        //足りない分後ににcloneを作る
        if($(list+'.'+isCurrent).nextAll().length < 3){
          $(slide).append(dom);
        }
        i++;
      }i=0;
    }
  };
  cloneSet();


  //クラスセット
  var classSet = function(){
    $(list).removeAttr('data-slide3d');
    $(list+'.'+isCurrent)
      .attr('data-slide3d',0)
      .prev()
      .attr('data-slide3d',-1)
      .prev()
      .attr('data-slide3d',-2);
    $(list+'.'+isCurrent)
      .next()
      .attr('data-slide3d',1)
      .next()
      .attr('data-slide3d',2);
  };
  classSet();


  //next・prev
  $(next).on('click',function(e){
    e.preventDefault();

    $(list+'.'+isCurrent).next().addClass(isCurrent).end().removeClass(isCurrent);

    dom = $(slide).find(list).eq(0).removeClass(isCurrent);
    $(slide).append(dom);
    classSet();

  });
  $(prev).on('click',function(e){
    e.preventDefault();

    $(list+'.'+isCurrent).prev().addClass(isCurrent).end().removeClass(isCurrent);

    dom = $(slide).find(list).eq($(list).length-1).removeClass(isCurrent);
    $(slide).prepend(dom);
    classSet();

  });




  //スワイプ処理
  // 開始時
  document.querySelector(slide).addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].pageX;
    touchMoveX = event.touches[0].pageX;
  }, false);

  // 移動時
  document.querySelector(slide).addEventListener('touchmove', function(event) {
    touchMoveX = event.changedTouches[0].pageX;
  }, false);

  // 終了時
  document.querySelector(slide).addEventListener('touchend', function(event) {
    if (touchStartX + 50 < touchMoveX) {
      //前へ
      event.preventDefault();
      $(prev).trigger('click');
    } else if (touchStartX > touchMoveX + 50) {
      //次へ
      event.preventDefault();
      $(next).trigger('click');
    }
  }, false);
}
