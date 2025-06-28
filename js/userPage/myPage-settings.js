$(document).ready(function () {

  let isCheckNick = true;
  let isCheckAgeVisible = true;

  // 닉네임 중복 검사
  $("#INPUT-NICK").on("input", function() {
    let $nickResult = $("#DIV-NICK-CHECK");
    let nickValue = $(this).val();
    const originalNick = $(this).data("original");

    // basic.js
    isCheckNick = isNickUsed($nickResult, nickValue, originalNick);
    updateJoinButton();
  });

  // --------------------------------------

  // 한 줄 소개 30자 제한
  $("#INPUT-INTRO").on("input", function() {
    let $introValue = $(this);
    // basic.js
    limitUserIntroLength ($introValue);
  });
  
  // --------------------------------------

  // 나이 공개 여부 유효성 검사
  $(`input[type="radio"][name="age-visible"]`).on("change", function() {
    let ageVisibleValue = $(this).val();
    isCheckAgeVisible = ageVisibleValue == "" ? false : true;
    updateJoinButton();
  });

  // --------------------------------------

  // 프로필 이미지 미리보기
  $("#profile-image").on("change", function(event){
    const file = event.target.files[0];
    // basic.js
    setOnePreview(file);
  });

  // --------------------------------------

  // 저장하기 버튼 유효성 검사
  function updateJoinButton() {
    const $btn = $(".disabled, .basic-button");
    if (isCheckNick && isCheckAgeVisible) {
      $btn
        .addClass("basic-button")
        .removeClass("disabled");
    } else {
      $btn
        .removeClass("basic-button")
        .addClass("disabled");
    } 
  }

});

// ---------------------------------------------------------------

// 프로필 이미지 등록 버튼 호버
const $imgBtn = $("#IMG-PROFILE-IMAGE-BTN");
$('#LABEL-PROFILE-IMAGE-BTN').hover(function() {
  $imgBtn.attr("src", "../../image/userPage/profile_img_update_btn_hover.png");
}, function() {
  $imgBtn.attr("src", "../../image/userPage/profile_img_update_btn.png");
});

// ---------------------------------------------------------------

$(document).on("click", ".basic-button", function() {
  openModal("변경하신 내용이 저장되었어요.")
});