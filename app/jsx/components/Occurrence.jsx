/** @jsx React.DOM */

define([
    'react',
    'moment',
    'react-backbone'
], function(
    React,
    moment,
    rbbMixin
) {
    var Occurrence = React.createClass({

        mixins: [rbbMixin],
        updateOnProps: { 'model': 'model' },

        duration: function() {
            var startMoment = moment(this.props.model.get('startTime'));
            var endMoment = moment(this.props.model.get('endTime'));
            return moment.utc(endMoment.diff(startMoment)).format('HH:mm');
        },

        render: function() {
            return (<div className={"occurrence"}>
                <ul className={"info"}>
                    <li>Date {moment(this.props.model.get('startTime')).format('YYYY-MM-DD HH:mm')}</li>
                    <li>Price {this.props.model.get('price')}</li>
                    <li>Length {this.duration()}</li>
                    <li>Description {this.props.model.get('description')}</li>
                </ul>
                <p className={"status"}>
                    {this.props.model.get('reservedPlaces')} + {this.props.model.get('totalPlaces')} / {this.props.model.get('soldPlaces')}
                </p>
            </div>);
        }
    });
    return Occurrence;
});
