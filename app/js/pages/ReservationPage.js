/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'app',
    'config',
    'jquery',
    'moment',
    'models/Reservation',
    'models/EventOccurrence',
    'react-backbone'
], function(
    _,
    React,
    app,
    config,
    $,
    moment,
    ReservationModel,
    EventOccurrenceModel,
    rbbMixin
) {

    var Listing = React.createClass({displayName: 'Listing',

        mixins: [rbbMixin],
        updateOnProps: {
            model: 'model',
            eventOccurrenceModel: 'model'
         },

        componentWillMount: function() {
            this.startUpdater();
        },

        componentWillUnmount: function() {
            this.stopUpdater();
        },


        getDefaultProps: function(options) {
            var self = this;
            var eventOccurrenceModel = _.find(app.data.eventOccurrences.models, function(occ) {
                return occ.get('id') == self.props.model.get('eventOccurrenceId');
            });
 
            if (!eventOccurrenceModel) {
                eventOccurrenceModel = new EventOccurrenceModel({eventId: null});
                if (!this.props.model.get('eventOccurrenceId')) {
                    this.listenTo(this.props.model, 'change', function() {
                        // This wont get called if we come here from the search page - why?
                        this._getEventOccurrenceModel();
                    }, this);
                }
                else {
                    eventOccurrenceModel.id = this.props.model.get('eventOccurrenceId');
                    eventOccurrenceModel.fetch();
                }
            }

            return {eventOccurrenceModel: eventOccurrenceModel};
        },

        _getEventOccurrenceModel: function getEventOccurrenceModel() {
            this.props.eventOccurrenceModel.id = this.props.model.get('eventOccurrenceId');
            this.props.eventOccurrenceModel.fetch();
        },

        redeemReservation: function() {
            this.props.model.set({'status':'REDEEMED'});
            this.props.model.save();
            console.log("Redeemed reservation");
        },

        undoRedemption: function() {
            this.props.model.set({'status':'RESERVED'});
            this.props.model.save();
            console.log("Cancelled redemption");
        },

        cancelReservation: function() {
            if (confirm('Are you sure you want to delete this reservation?')) {
                this.props.model.destroy();
                app.navigate('');
            }
        },

        gotoOccurrence: function() {
            app.router.jumpToOccurrence(this.props.eventOccurrenceModel);
        },
        
        render: function() {
            var reservationStatus = this.props.model.get('status');
            var reservationStatusDescription;
            var reserverDescription = "";
            var sellerDescription = "";
            var buttons = [];

            switch (reservationStatus) {
                case "RESERVED":
                    reservationStatusDescription = 'Reservation is valid, waiting for redemption';
                    buttons.push(React.DOM.button( {className:"button", className:"redeemButton", onClick:this.redeemReservation}, "Redeem reservation"));
                    buttons.push(React.DOM.button( {className:"button", className:"cancelButton", onClick:this.cancelReservation}, "Delete reservation"));
                    break;

                case "REDEEMED":
                    reservationStatusDescription = 'Reservation redeemed';
                    buttons.push(React.DOM.button( {className:"button", onClick:this.undoRedemption}, "Undo redemption"));
                    break;
                case "CANCELLED":
                    reservationStatusDescription = 'Reservation cancelled';
                    break;

                case "EXPIRED":
                    reservationStatusDescription = 'Reservation expired';
                    break
            }

            if (this.props.model.get('reserver')) {
                reserverDescription = " / " + this.props.model.get('reserver');
            } else {
                sellerDescription = "This item was sold by " + this.props.model.get('seller');
            }

            return React.DOM.div( {className:"reservation-page"}, 
                React.DOM.h4( {className:"location"}, "Reservation"),
                React.DOM.h3( {className:"title link", onClick:this.gotoOccurrence}, 
                    this.props.eventOccurrenceModel.get('eventName'),
                    moment(this.props.eventOccurrenceModel.get('startTime')).format(' DD.MM.YY HH:mm')
                ),
                React.DOM.h3( {className:"id"}, 
                    "Reservation ID: ", this.props.model.get('id'),reserverDescription
                ),

                React.DOM.h3(null, sellerDescription),
                React.DOM.p(null, reservationStatusDescription),

                React.DOM.div( {className:"buttons clearfix"}, buttons)
            )
        },

        startUpdater: function() {
            var that = this;
            this.updater = setInterval(function() {
                that.updateReservations();
            }, config.pollInterval);
        },

        stopUpdater: function() {
            clearInterval(this.updater);
        },

        updateReservations: function() {
            this.props.model.fetch();
        }

    });
    return Listing;
});
