// join-required

$(document).ready(function () {

  let isCheckNick = false;
  let isCheckBirth = false;
  let isCheckAgeVisible = true;

  // 닉네임 중복 검사
  $("#nickname").on("propertychange change keyup paste input", function() {
    let nickValue = $(this).val();
    let nickLength = Array.from(nickValue).length;
    let nickResult = $("#DIV-NICK-CHECK")

    if (nickLength < 2) {
      isCheckNick = false;
      nickResult.removeAttr("style");
      nickResult.text("최소 2글자 이상 입력하세요");
    } else if (nickLength > 12) {
      isCheckNick = false;
      const trimmed = Array.from(nickValue).slice(0, 12).join("");
      $(this).val(trimmed);
    } else {  // 2 ~ 12자 이내일 때 중복 검사
      
      // 중복검사 패스
      nickResult.text("좋은 닉네임이에요!");
      nickResult.css("color", "#064973");
      isCheckNick = true;

      // 중복됨
      // nickResult.text("다른 닉네임을 입력해 주세요");
      // nickResult.css("color", "#FF0000");
      // isCheckNick = false;
    }
    updateJoinButton();
  });

  // 생년월일 유효성 검사
  $("#birth").on("input", function() {
    let birthValue =$(this).val();
    isCheckBirth = birthValue == "" ? false : true;
    updateJoinButton();
  });

  // 나이 공개 여부 유효성 검사
  $(`input[type="radio"][name="age-visible"]`).on("change", function() {
    let ageVisibleValue = $(this).val();
    isCheckAgeVisible = ageVisibleValue == "" ? false : true;
    updateJoinButton();
  });

  // 회원가입 유효성 검사
  function updateJoinButton() {
    const $btn = $(".btn-no-join, .btn-go-join");
    if (isCheckNick && isCheckBirth && isCheckAgeVisible) {
      $btn
        .removeAttr("disabled")
        // .attr("type", "submit")
        .addClass("btn-go-join")
        .removeClass("btn-no-join");
    } else {
      $btn
        .attr("disabled", true)
        .removeClass("btn-go-join")
        .addClass("btn-no-join");
    } 
  }
});

// 회원 가입 버튼 클릭 시
$(document).on("click", ".btn-go-join", function() {
  location.href="join-optional.html";
});