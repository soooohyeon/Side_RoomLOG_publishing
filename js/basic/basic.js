// 공통 이벤트


$(document).ready(function () {
  
  // 페이지네이션에서 이전, 다음 기호에 마우스 오버시
  // 이전
  $('.previous').hover(function(){
    $(this).text("◀")
  }, function(){
    $(this).text("◁")
  });

  // 다음
  $('.next').hover(function(){
    $(this).text("▶")
  }, function(){
    $(this).text("▷")
  });

});

// 메인, 게시판, 게시글 상세보기 적용
// 스크랩 하기
function goScrap(event, element) {
  event.stopPropagation();

  element.src = "../../image/layout/scrap_ok.png";
  element.setAttribute("onclick", "noScrap(event, this)");
  element.setAttribute("alt", "scrap_ok");
}

// 스크랩 해제
function noScrap(event, element) {
  event.stopPropagation();
  
  element.src = "../../image/layout/scrap_no.png";
  element.setAttribute("onclick", "goScrap(event, this)");
  element.setAttribute("alt", "scrap_no");
}