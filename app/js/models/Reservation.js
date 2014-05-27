define([
    'underscore',
    'backbone',
    'config'
], function (
    _,
    Backbone,
    config
) {

    return Backbone.Model.extend({
        occurrenceId: null,

        url: function() {
            var tempUrl = config.baseUrl;
            tempUrl += !_.isNull(this.occurrenceId) ? '/Occurrence/' + this.occurrenceId : '';
            tempUrl += '/Reservation/' + (!_.isUndefined(this.id) ? this.id : '');
            return tempUrl;
        }
    });

});
