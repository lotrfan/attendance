/** @jsx React.DOM */

var React = require('react/addons');
var $ = require('jquery');

var baseUrl = require('../baseurl');

/**
 * Page header
 */
var Header = React.createClass({
    propTypes: {
        handleNav: React.PropTypes.func.isRequired,
        navigateTo: React.PropTypes.func.isRequired,
        user: React.PropTypes.object,
        currentRoute: React.PropTypes.string.isRequired,
        logout: React.PropTypes.func.isRequired
    },

    handleLogout: function() {
        $.ajax({
            type: 'DELETE',
            url: baseUrl + '/api/session'
        }).done(function() {
            this.props.logout();
        }.bind(this));
        return false;
    },

    render: function() {
        var userNavItem;
        if (this.props.user) {
            userNavItem = <NavItem
                currentRoute={this.props.currentRoute}
                href={baseUrl + '/logout'}
                handleNav={this.handleLogout}>
                Logout {this.props.user.netid}
            </NavItem>;
        } else {
            userNavItem = <NavItem
                routeName="login"
                currentRoute={this.props.currentRoute}
                href={baseUrl + '/login'}
                handleNav={this.handleLogout}>
                Login
            </NavItem>;
        }

        return <nav
            className="navbar navbar-default navbar-static-top"
            role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <a
                        className="navbar-brand"
                        href={baseUrl + '/'}
                        onClick={this.props.handleNav}>
                        Attendance
                    </a>
                </div>
                <ul className="nav navbar-nav">
                    <NavItem
                        routeName="home"
                        currentRoute={this.props.currentRoute}
                        href={baseUrl + '/'}
                        handleNav={this.props.handleNav}>
                        Home
                    </NavItem>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    {userNavItem}
                </ul>
            </div>
        </nav>;
    }
});

var NavItem = React.createClass({
    propTypes: {
        routeName: React.PropTypes.string,
        currentRoute: React.PropTypes.string.isRequired,
        href: React.PropTypes.string.isRequired,
        handleNav: React.PropTypes.func.isRequired
    },

    render: function() {
        var routeName = this.props.routeName;
        var currentRoute = this.props.currentRoute;
        var classes = React.addons.classSet({
            'active': this.props.routeName === this.props.currentRoute
        });
        return <li className={classes}>
            <a href={this.props.href} onClick={this.props.handleNav}>
                {this.props.children}
            </a>
        </li>;
    }
});

module.exports = Header;
