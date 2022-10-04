var sectionHeight = function() {
  var total    = $(window).height(),
      $article = $('article').css('height','auto');

  // if ($article.outerHeight(true) < total) {
  //   var margin = $article.outerHeight(true) - $article.height();
  //   $article.height(total - margin - 20);
  // } else {
  //   $article.css('height','auto');
  // }
}

$(window).resize(sectionHeight);

$(function() {
  $("article h1, article h2, article h3").each(function(){
    $("nav.article ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
    $("nav.article ul li:first-child a").parent().addClass("active");
  });

  $("nav.article ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav.article ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });

  sectionHeight();

  $('img').on('load', sectionHeight);
});
