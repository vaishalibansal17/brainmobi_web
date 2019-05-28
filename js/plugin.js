function Throttle() {
    this.debounce = function(a, b, c) {
        var d;
        return function() {
            var e = this, f = arguments, g = c && !d;
            clearTimeout(d), d = setTimeout(function() {
                d = null, c || a.apply(e, f);
            }, b), g && a.apply(e, f);
        };
    };
}

function PageType() {
    this.getType = function() {
        for (var a, b = $("body").attr("class"), c = [ "home", "about", "services", "projects", "case-study", "team", "member", "contact", "jobs", "job", "culture", "press" ], d = 0; d < c.length; d++) -1 !== b.indexOf("page-type--" + c[d]) && (a = c[d]);
        return a;
    }, this.type = this.getType(), this.getPageBackground = function() {
        return $(".page__background");
    }, this.pageBackground = this.getPageBackground(), this.getMain = function() {
        return $(".main");
    }, this.main = this.getMain(), this.onNewPageLoad = function() {
        this.pageBackground = this.getPageBackground(), this.main = this.getMain();
    }, this.onPageLeave = function() {
        this.pageBackground = this.main = this.nextPage = null;
    };
}

function Resize() {
    var a = this;
    this.getBrowserWidth = function() {
        return FLD.Window.width();
    }, this.BrowserWidth = this.getBrowserWidth(), this.getBrowserHeight = function() {
        return FLD.Window.height();
    }, this.BrowserHeight = this.getBrowserHeight(), this.Recalculate = function() {
        this.BrowserHeight = this.getBrowserHeight(), this.BrowserWidth = this.getBrowserWidth();
    }, $(window).on("resize", function() {
        a.Recalculate();
    }), $(window).load(function() {
        a.Recalculate();
    });
}

function HomeProjects() {
    var a = this;
    this.numberOfProjects = $("[data-home-project]").length, this.getProjects = function() {
        for (var a = [], b = 0; b < this.numberOfProjects; b++) a.push($('[data-home-project="' + (b + 1) + '"]'));
        return a;
    }, this.projects = this.getProjects(), this.getFlags = function() {
        for (var a = [], b = 0; b < this.numberOfProjects; b++) a.push(null);
        return a;
    }, this.flags = this.getFlags(), this.getContent = function() {
        for (var a = [], b = 0; b < this.numberOfProjects; b++) a.push($('[data-home-project="' + (b + 1) + '"]').find(".home-project__content"));
        return a;
    }, this.content = this.getContent(), this.checkForOverlap = function(b) {
        if ("home" === FLD.PageType.type) {
            var c = this.projects[b][0].getBoundingClientRect(), d = this.flags[b];
            c.top <= FLD.Resize.BrowserHeight / 2 && c.bottom > FLD.Resize.BrowserHeight / 2 ? "active" !== d && (this.changePaginationLink(b + 1), 
            d = "active") : "inactive" !== d && (d = "inactive");
            var e = a.content[b], f = e[0].getBoundingClientRect(), g = .5 * FLD.Resize.BrowserHeight - f.height / 2, h = .15 * FLD.Resize.BrowserHeight - f.height / 2, i = (f.top - g) / (h - g);
            i >= 0 && 1 >= i ? e.css({
                opacity: 1 - i
            }) : 0 > i ? e.css({
                opacity: 1
            }) : i > 1 && e.css({
                opacity: 0
            });
        }
    }, this.onNewPageLoad = function() {
        "home" === FLD.PageType.type && (this.projects = this.getProjects(), this.flags = this.getFlags(), 
        this.content = this.getContent(), this.init());
    }, this.goToProject = function(a, b) {
        if ("home" === FLD.PageType.type) {
            var c = b.getAttribute("data-number"), d = $('[data-home-project="' + c + '"]').find(".wrap");
            return $("html, body").animate({
                scrollTop: d.offset().top - FLD.Resize.BrowserHeight / 2 + d.outerHeight() / 2
            }, 500), $(".nav--home-projects .js--active").removeClass("js--active"), $(b).addClass("js--active"), 
            a.preventDefault();
        }
    }, this.changePaginationLink = function(a) {
        $(".nav--home-projects .js--active").removeClass("js--active"), $(".nav--home-projects a").eq(a - 1).addClass("js--active");
    }, this.init = function() {
        for (var b = 0; b <= this.numberOfProjects - 1; b++) a.checkForOverlap(b);
    }, this.animate = null, this.startAnimation = function() {
        this.animate = window.requestAnimationFrame(a.startAnimation), a.init();
    }, this.cancelAnimation = function() {
        window.cancelAnimationFrame(a.animate);
    }, this.init(), Modernizr.touch || ($(window).on("scroll", FLD.Throttle.debounce(function() {
        a.startAnimation();
    }, 200, !0)), $(window).on("scroll", FLD.Throttle.debounce(function() {
        a.cancelAnimation();
    }, 200, !1))), $(document).on("click", '[data-js="scroll-to-home-project"]', function(b) {
        a.goToProject(b, this);
    });
}

$(".inputfile").on("change", function(a, b, c) {
    var d = this.value.replace(/C:\\fakepath\\/i, "");
    $("#user_cv_name").text(d);
}), $(window).load(function() {
    $("#main-nav").removeClass("shadow"), $(window).scrollTop() <= 10 && $("#main-nav").removeClass("sticky-header");
}), $(window).load(function() {
    $(window).scroll(function() {
        var a = $(window).scrollTop();
        $(window).height();
        a >= 10 ? $("#main-nav").addClass("sticky-header") : $("#main-nav").removeClass("sticky-header"), 
        a >= 10 ? $(".mobile-nav").addClass("sticky-toggle") : $(".mobile-nav").removeClass("sticky-toggle"), 
        a >= 380 ? $(".about-nav-wrap").addClass("stick-fixed") : $(".about-nav-wrap").removeClass("stick-fixed");
    });
}), $("#main-nav ul.navbar-right>li>ul").parent().addClass("dropdown"), $("#main-nav ul.navbar-right li ul ul").before('<span class="arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></span>'), 
$("#main-nav ul.navbar-right>li.full-menu .arrow").remove(), $("#main-nav>nav>ul").addClass("main-list"), 
$("body").prepend('<div class="mobile-menu"></div>'), $("body").append('<div class="site-overlay"></div>'), 
$(".main-list").clone().appendTo(".mobile-menu"), $(".mobile-menu ul").removeClass("nav navbar-nav navbar-right"), 
$(".mobile-menu ul.main-list > li").find("ul").before('<span class="dropdown"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></div>'), 
$("#main-nav").after('<div class="mobile-nav"><div><span class="stroke_1"> </span><span class="stroke_2"> </span><span class="stroke_3"> </span></div></div>'), 
$(".mobile-nav").click(function() {
    $(".mobile-nav").toggleClass("open");
}), $(".site-overlay").click(function() {
    $(".mobile-nav").removeClass("open");
}), $(".dropdown").click(function(a) {
    $(this).toggleClass("open"), $(this).next("ul").slideToggle();
}), $(document).ready(function(a) {
    var b = !0;
    $(".mobile-nav").click(function() {
        $(".mobile-menu").toggleClass("show"), $(".site-overlay").toggleClass("overlay-show"), 
        b = !1;
    }), $(".mobile-menu").click(function() {
        b = !1;
    }), $("html,.mobile-menu>ul li a,.site-overlay").click(function() {
        b && ($(".mobile-menu").removeClass("show"), $(".site-overlay").removeClass("overlay-show")), 
        b = !0;
    });
}), $(".heroSlider").owlCarousel({
    items: 1,
    loop: !0,
    autoplay: !0,
    autoplayTimeout: 7e3,
    nav: !1,
    autoplayHoverPause: !0
}), $(".deskslider").owlCarousel({
    items: 1,
    dots: !1,
    nav: !0,
    navText: [ "<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>" ]
}), $(".rating-slider").owlCarousel({
    items: 1,
    loop: !0,
    autoplay: !0,
    autoplayTimeout: 7e3,
    margin: 10,
    nav: !1,
    autoplayHoverPause: !0
}), $(function() {
    SyntaxHighlighter.all();
}), $(window).load(function() {
    $("#carousel").flexslider({
        animation: "slide",
        controlNav: !1,
        animationLoop: !0,
        itemWidth: 50,
        itemMargin: 0,
        asNavFor: "#slider"
    }), $("#slider").flexslider({
        animation: "slide",
        controlNav: !1,
        animationLoop: !1,
        sync: "#carousel"
    });
}), $(".view-less span").click(function(a) {
    a.preventDefault(), $(".hidden-content").slideToggle(), $(".view-less").toggleClass("less"), 
    "View Less" === $.trim($(this).text()) ? $(this).text("View More") : $(this).text("View Less"), 
    $("html, body").animate({
        scrollTop: $(".hidden-content").offset().top + $("window").height()
    }, 500);
});

var FLD = FLD || {};

FLD.Document = $(document), FLD.Window = $(window), $(function() {
    FLD.PageType = new PageType(), FLD.Throttle = new Throttle(), FLD.Resize = new Resize(), 
    FLD.HomeProjects = new HomeProjects();
}), $(document).ready(function() {
    Cookies.get("popup") || setTimeout(function() {
        $("#womens-day").modal();
    }, 600), $("#womens-day").on("shown.bs.modal", function() {
        Cookies.set("popup", "valid", {
            expires: 3,
            path: "/"
        });
    });
});