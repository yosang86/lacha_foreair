/* script, css*/
//var domain = "https://tour.hcclab.com";
document.write('<link rel="stylesheet" type="text/css" href="'+hcc_r_domain+'/pc/css/headFooter_webtour.css" />');
//document.write('<script type="text/javascript" src="'+hcc_r_domain+'/smart/js/jquery/jquery-ui.min.js"></script>');
//document.write('<script type="text/javascript" src="'+domain+'/smart/js/swiper.min.js"></script>');
//document.write('<script type="text/javascript" src="'+domain+'/smart/js/fo-mc-ui.js"></script>');
//document.write('<script type="text/javascript" src="'+domain+'/smart/js/jquery.mobile.custom.js"></script>');
//document.write('<script type="text/javascript" src="'+domain+'/smart/js/common.js"></script>');
//document.write('<script type="text/javascript" src="'+domain+'/smart/js/swiper.js"></script>');

/* header */
//document.write('<body class="sub">');
document.write('<header>');
document.write('<div id="header" class="clearfix">');
document.write('	<h1><a href="' + hcc_r_domain + '"><img src="' + hcc_r_domain +'/pc/images/common/h1_logo.png" alt="HCC"></a></h1>');
document.write('		<ul class="util">');
document.write('			<li><a href="' + hcc_r_domain +'/mypage/MyPageInfo.do">나의정보</a></li>');
document.write('			<li><a href="' + hcc_r_domain +'/cs/CscMain.do">고객센터</a></li>');
document.write('		</ul>');
document.write('</div>');
document.write('</header>');

jQuery(document).ready(function(){
	setLeftArea();
});

function setLeftArea() {
	jQuery("#hccBnnerL").html('<img src="' + hcc_r_domain + '/pc/images/webtour_info.png" />');
	jQuery("#hccBnnerL").show();
};
