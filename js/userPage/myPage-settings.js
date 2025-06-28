$(document).ready(function () {

  // 한 줄 소개 30자 제한
  $("#profile-intro").on("propertychange change keyup paste input", function() {
    let $introValue = $(this);
    // basic.js
    limitUserIntroLength ($introValue);
  });
  
  
  // 프로필 이미지 미리보기
  $("#profile-image").on("change", function(event){
    const file = event.target.files[0];
    // basic.js
    setOnePreview(file);
  });
});

// 프로필 이미지 등록 버튼 호버
const $imgBtn = $("#IMG-PROFILE-IMAGE-BTN");
$('#LABEL-PROFILE-IMAGE-BTN').hover(function() {
  $imgBtn.attr("src", "../../image/userPage/profile_img_update_btn_hover.png");
}, function() {
  $imgBtn.attr("src", "../../image/userPage/profile_img_update_btn.png");
});