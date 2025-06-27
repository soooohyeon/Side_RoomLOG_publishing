// 카테고리 별 리스트 출력
$(".li-category-wrap").on("click", function() {
    const categoryGroup = $(this).find(".div-category").data("category");

    $(".li-category-wrap").removeClass("ca-selected");
    $(this).addClass("ca-selected");

    if (categoryGroup == "my-write-post") {
        $(".scrap-list-wrap").addClass("none-show");
        $(".write-list-wrap").removeClass("none-show");
    } else if (categoryGroup == "my-scrap-post") {
        $(".write-list-wrap").addClass("none-show");
        $(".scrap-list-wrap").removeClass("none-show");
    }
});