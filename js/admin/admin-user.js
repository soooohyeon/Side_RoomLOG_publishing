// 정렬 카테고리 - 선택한 정렬에 따라 select 여백 조정
$("#SELECT-SORT").click(function() {
  let selectValue = $("#SELECT-SORT");
  
  if (selectValue.val() == "kakao") {
    selectValue.css("padding", "0 25px");
  } else {
    selectValue.removeAttr("style");
  }
});