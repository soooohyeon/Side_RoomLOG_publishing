$(document).ready(function () {

  // 한 줄 소개 30자 제한
  $("#profile-intro").on("propertychange change keyup paste input", function() {
    let introValue = $(this).val();
    let introLength = Array.from(introValue).length;

    if (introLength > 30) {
      const trimmed = Array.from(introValue).slice(0, 30).join("");
      $(this).val(trimmed);
    }
  });

  // 프로필 이미지 미리보기
  $("#profile-image").on("change", function(event){
    const file = event.target.files[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    $("#IMG-PROFILE").attr("src", imageURL);
    console.log(imageURL);
  });
  
});

// 프로필 이미지 등록 버튼 호버
  $('#DIV-PROFILE-IMG').hover(function() {
    $imgBtn = $(this).find("#IMG-PROFILE");
    $imgBtn.attr("src", "../../image/login/profile_img_add_hover.png");
  }, function(){
    $imgBtn = $(this).find("#IMG-PROFILE");
    $imgBtn.attr("src", "../../image/login/profile_img_add.png");
  });