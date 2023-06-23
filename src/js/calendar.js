import $ from "jquery";
import * as common from "./common";

export let selectedInput = null;

export const create_calendar_layer_Pop = (inputId) => {
    // selectedInput.current = inputId
    selectedInput = inputId

    $(".react-datepicker__aria-live").css("display", "none");

    $("body").append($("<div id='dimmd-layer'></div>"));
    // $("#dimmd-layer").attr("tabindex", "0").fadeIn().focus();
    var $el = $("#calendar-pop");
    $el.attr("tabindex", "0").fadeIn().focus();

    var $elWidth = $el.outerWidth(),
        $elHeight = $el.outerHeight(),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: - $elHeight / 2,
            marginLeft: - $elWidth / 2,
        })
    } else {
        $el.css({top: 0, left: 0});
    }

    $el.find('.pop-close').click(function(){
        $el.fadeOut().removeAttr("tabindex");
        $("#dimmd-layer").remove();
        // $("#dimmd-layer").removeAttr("tabindex").fadeOut();
        // $("#calendar-pop").remove();
        return false;
    });
};

export const formatDate = (date, num) => {
    var today = date != null ? date : new Date();
    var year = today.getFullYear();
    var month = num != null ? today.getMonth() - num : today.getMonth();
    var day = today.getDate();
    var strtDtm = new Date(year, month, day);
    strtDtm = common.dateFormat(strtDtm);

    return strtDtm;
}

export const onChange = (date) => {
    // $(selectedInput.current).val(formatDate(date));
    $(selectedInput).val(formatDate(date));
    $("#calendar-pop .pop-close").click();
}