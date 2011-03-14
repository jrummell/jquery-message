/// <reference path="jquery.min-vsdoc.js" />

//
// create closure
//
(function (jQuery)
{
    //
    // plugin definition
    //
    jQuery.fn.message = function (options)
    {
        options = jQuery.extend({}, jQuery.fn.message.defaults, options);

        return this.each(function ()
        {
            var $this = jQuery(this);

            // use given message or inner html
            var messageText = options.message;
            if (messageText == null || messageText == "")
            {
                messageText = $this.html();
            }

            // info or error?
            var messageClass = options.type == "info" ? "ui-state-highlight" : "ui-state-error";
            var iconClass = options.type == "info" ? "ui-icon-info" : "ui-icon-alert";

            // build message html
            var messageHtml = "<div class=\"ui-widget\">";
            messageHtml += "<div class=\"" + messageClass + " ui-corner-all\" style=\"padding: 0 .7em;\">";
            messageHtml += "<p><span class=\"ui-icon " + iconClass + "\" style=\"float:left; margin-right: .3em;\"></span>";
            messageHtml += messageText;
            if (options.dismiss)
            {
                messageHtml += " <span class='message-dismiss'>Click to dismiss.</span>";
            }
            messageHtml += "</p></div></div>";

            if (options.dismiss)
            {
                // hide messages on click
                $this.click(function ()
                {
                    $(this).hide('normal');
                });
            }

            // set html and show the message
            $this.html(messageHtml).show();
        });
    };

    //
    // plugin defaults
    //
    jQuery.fn.message.defaults = {
        message: "", // leave blank to use element html
        type: "info", // info or error
        dismiss: true // append 'Click to dismiss' to message and hide on click
    };
})(jQuery);