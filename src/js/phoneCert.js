import $ from "jquery";
import * as common from "./common";

export const callKmcert = (obj) => {
    $("#cellNo").val("");
    $("#kmcertLayer").find(".pop-cont").html(`<iframe id="kmcert" name="kmcert" style="width: 100%; height: 100%;"></iframe>`);
    cmnFullLayerPopup(obj, 'kmcertLayer');

    if($("#svcMgmtNum").val() != "") {
        $("#formKmcert").find("#dbCheckType").val("svcMgmtNum");
    }
    // $("#formKmcert").find("#urlCode").val(`${kmcertUrlCode}`);
    // $("#formKmcert").attr("action", `${kmcertDomain}/kmcert/s_KmCertView.do`);
    $("#formKmcert").find("#urlCode").val(``);
    $("#formKmcert").attr("action", ``);
    $("#formKmcert").submit();
}
export const cmnFullLayerPopup = (element, targetId) => {
    var $open_btn = $(element);
    var $el = $("#" + targetId);

    $("body").append($("<div id='dimmd-layer'></div>"));
    $el.attr("tabindex", "0").fadeIn().focus();
    $el.css("z-index", "101");

    $el.find('.full-pop-close').click(function(){
        $("#dimmd-layer").remove();
        $el.fadeOut().removeAttr("tabindex");
        $el.css("z-index", "20");
        $open_btn.focus();
        return false;
    });
};

