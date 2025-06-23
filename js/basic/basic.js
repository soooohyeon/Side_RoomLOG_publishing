// 공통 이벤트
// ---------------------------------------------------------------

$(document).ready(function () {

  // 메뉴바 css 설정
  const url = window.location.pathname;

  if (url.includes('community')) {
    $("#LI-COMMUNITY-LINK").find("a").addClass("li-menu-select");
  } else if (url.includes('notice')) {
    $("#LI-NOTICE-LINK").find("a").addClass("li-menu-select");
  } else if (url.includes('feedback')) {
    $("#LI-FEEDBACK-LINK").find("a").addClass("li-menu-select");
  } else {
    $("#LI-HOME-LINK").find("a").addClass("li-menu-select");
  }

  // ---------------------------------------------------------------
  
  // 페이지네이션에서 이전, 다음 기호에 마우스 오버시
  // 이전
  $('.previous').hover(function(){
    $(this).text("◀");
  }, function(){
    $(this).text("◁");
  });

  // 다음
  $('.next').hover(function(){
    $(this).text("▶");
  }, function(){
    $(this).text("▷");
  });

});

// ---------------------------------------------------------------

// 팔로우 - 메인, 게시판 디테일, 유저 개인 페이지
// 팔로우 하기
function goFollow(event, element, userNumber) {
  event.stopPropagation();

  console.log("userNumber : " + userNumber)

  if (userNumber > 0) {
    element.innerText = "팔로잉";
    element.setAttribute("onclick", "noFollow(event, this, userNumber)");
    element.setAttribute("class", "button-style basic-button");
  } else {
    openModal("로그인이 필요해요.<br>팔로우는 로그인 후 이용할 수 있어요!");
  }
}

// 팔로우 해제
function noFollow(event, element, userNumber) {
  event.stopPropagation();

  element.innerText = "팔로우";
  element.setAttribute("onclick", "goFollow(event, this, userNumber)");
  element.setAttribute("class", "button-style follow-btn");
}

// ---------------------------------------------------------------

// 스크랩 - 메인, 게시판 목록 적용
// 스크랩 하기
function goScrap(event, element, userNumber) {
  event.stopPropagation();

  if (userNumber > 0) {
    element.src = "../../image/layout/scrap_ok.png";
    element.setAttribute("onclick", "noScrap(event, this, userNumber)");
    element.setAttribute("alt", "scrap_ok")
  } else {
    openModal("로그인이 필요해요.<br>스크랩은 로그인 후 이용할 수 있어요!");
  };
}

// 스크랩 해제
function noScrap(event, element, userNumber) {
  event.stopPropagation();
  
  element.src = "../../image/layout/scrap_no.png";
  element.setAttribute("onclick", "goScrap(event, this, userNumber)");
  element.setAttribute("alt", "scrap_no");
}

// --------------------------------------------------------------- 
// 모달
// 모달 열기
function openModal(message, temp = 1, modalId = '#MODAL-ALERT-ONE-A') {
  return new Promise((resolve) => {
    const $modal = $(modalId);
    $modal.find('.div-alert-content').html(message);
    $modal.addClass('alert-active');

    if (temp == 2) {
      $modal.find('.alert-no').addClass('modal-coutinue');
    }

    // 확인 클릭 시 → true 반환
    $modal.find('.alert-ok').one('click', function () {
      closeModal(modalId);
      resolve(true);
    });

    // 취소 클릭 시 → false 반환
    $modal.find('.alert-no').one('click', function () {
      closeModal(modalId);
      resolve(false);
    });

    // 모달 표시
    $modal.fadeIn(200);
  });
}

// 모달 닫기
function closeModal(modalId = '.div-alert-container') {
  const $modal = $(modalId);
  $modal.removeClass('alert-active');
  $modal.fadeOut(200);
}

$(document).on('click', '.modal-close', function () {
  closeModal();
});