/*
    Message plugin for Bootstrap
    Copyright (c) 2014 John Rummell (jrummell.com)
    Licensed under the GPL license (http://www.gnu.org/licenses/gpl.html)
    Version: _VERSION_
*/

//
// create closure
//
(function (jQuery)
{
    //
    // plugin methods
    //
    var methods = {
        init: function (options)
        {
            options = jQuery.extend({}, jQuery.fn.message.defaults, options);

            return this.each(function ()
            {
                var $this = jQuery(this);
                var data = $this.data("message");

                // only initialize once
                if (!data)
                {
                    // use given message or inner html
                    var messageText = options.message;
                    if (messageText == null || messageText == "")
                    {
                        messageText = $this.html();
                    }

                    // info or error?
                    var messageClass = options.type == "info" ? "alert-success" : "alert-danger";
                    var iconClass = options.type == "info" ? "glyphicon-info-sign" : "glyphicon-exclamation-sign";

                    // build message html
                    var messageHtml = "<div class='message-container'>";
                    messageHtml += "<div class='alert " + messageClass + " alert-dismissible' >";
                    messageHtml += "<div class='row'>";
                    messageHtml += "<div class='col-md-1'><span class='glyphicon pull-left " + iconClass + "' aria-hidden='true'></span></div>";
                    messageHtml += "<div class='col-md-11 message-text'>";
                    if (options.dismiss)
                    {
                        messageHtml += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
                    }
                    messageHtml += "<p>" + messageText;
                    messageHtml += "</p>";
                    messageHtml += "</div></div></div></div>";

                    // set html and show the message
                    $this.html(messageHtml);

                    if (options.autoShow)
                    {
                        $this.show();
                    }

                    // save options
                    $this.data("message", options);
                }
            });
        },
        options: function (options)
        {
            return this.each(function ()
            {
                var $this = jQuery(this);
                var currentOptions = $this.data("message") || {};
                options = jQuery.extend({}, currentOptions, options);
                $this.message("destroy").message("init", options);
            });
        },
        show: function ()
        {
            jQuery(this).show();
        },
        hide: function ()
        {
            jQuery(this).hide();
        },
        destroy: function ()
        {
            return this.each(function ()
            {
                var $this = jQuery(this);
                var data = $this.data("message");

                jQuery(".message-container", $this).remove();
                $this.html(data.message).css("display:none");
                $this.removeData("message");
            });
        }
    };

    jQuery.fn.message = function (method)
    {
        if (methods[method])
        {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof (method) === 'object' || !method)
        {
            return methods.init.apply(this, arguments);
        }
        else
        {
            jQuery.error("Method " + method + " does not exist on jQuery.message");
        }
    };

    //
    // plugin defaults
    //
    jQuery.fn.message.defaults = {
        message: "", // leave blank to use element html
        type: "info", // info or error
        dismiss: true, // append 'Click to dismiss' to message and hide on click
        autoShow: true // show on initialize
    };
})(jQuery);