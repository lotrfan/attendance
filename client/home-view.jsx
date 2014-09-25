/** @jsx React.DOM */

var React = require('react');

var CourseList = require('./course-list.jsx');

/**
 * Home view
 */
var HomeView = React.createClass({
    propTypes: {
        handleNav: React.PropTypes.func.isRequired,
        navigateTo: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div>
            <CourseList
                handleNav={this.props.handleNav}
                navigateTo={this.props.navigateTo} />
        </div>;
    }
});

module.exports = HomeView;
