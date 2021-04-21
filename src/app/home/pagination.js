function myTest() {
  $(document).ready(function () {
    $(".next").click(function () {
      $(".pagination").find(".pageNum.active").next().addClass("active");
      $(".pagination").find(".pageNum.active").prev().removeClass("active");
    });
    $(".prev").click(function () {
      $(".pagination").find(".pageNum.active").next().addClass("prev");
      $(".pagination").find(".pageNum.active").prev().removeClass("active");
    });
  });
}
