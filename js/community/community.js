// 정렬 카테고리 선택한 정렬에 따라 select 여백 조정
$("#SELECT-SORT").click(function() {
  let selectValue = $("#SELECT-SORT");
  
  if (selectValue.val() == "comment") {
    selectValue.css("padding", "0 15px");
  } else if (selectValue.val() == "scrap") {
    selectValue.css("padding", "0 30px");
  } else {
    selectValue.removeAttr("style");
  }
});

// 게시글에 이미지가 존재할 경우 조정
document.querySelectorAll('.div-post-info-wrap').forEach(wrap => {
  const imgWrap = wrap.querySelector('.div-post-img img');
  if (imgWrap && imgWrap.complete && imgWrap.naturalWidth > 0) {
    wrap.classList.add('has-img');
  }
});
