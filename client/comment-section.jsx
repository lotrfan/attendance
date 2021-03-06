/** @jsx React.DOM */

var React = require('react/addons');
var $ = require('jquery');
var moment = require('moment');

var baseUrl = require('../baseurl');

/**
 * Comments and comment form for given section
 */
var CommentSection = React.createClass({
    propTypes: {
        sectionId: React.PropTypes.number.isRequired
    },

    getInitialState: function() {
        return {
            loading: true,
            comments: [],
            commentText: '',
            disabled: false
        };
    },

    componentDidMount: function() {
        var id = this.props.sectionId;
        var url = baseUrl + '/api/sections/' + id + '/comments';
        $.get(url, function(data) {
            this.setState({
                loading: false,
                comments: data.comments
            });
        }.bind(this));
    },

    handleCommentTextChange: function(e) {
        this.setState({commentText: e.target.value});
    },

    handleSubmit: function() {
        if (!this.state.commentText) {
            return false;
        }
        this.setState({disabled: true});

        var id = this.props.sectionId;
        $.ajax({
            type: 'POST',
            url: baseUrl + '/api/sections/' + id + '/comments',
            data: {text: this.state.commentText}
        })
        .done(function(result) {
            console.log(result);
            var newComments = React.addons.update(
                this.state.comments,
                {$push: [result]}
            );
            this.setState({
                commentText: '',
                comments: newComments,
                disabled: false
            });
        }.bind(this));

        return false;
    },

    render: function() {
        if (this.state.loading) {
            return <div>
                <h2>Comments</h2>
                Loading...
            </div>;
        }

        var comments = this.state.comments.map(function(comment) {
            var time = moment(comment.createdAt).calendar();

            // TODO(klwang3): Remove inline styling
            return <div key={comment.id} style={{paddingBottom: '20px'}}>
                <div style={{paddingBottom: '5px'}}>
                    <strong>{comment.user.name}</strong> ({comment.user.netid})
                    {' '}
                    <span style={{color: '#aaa'}}>{time}</span>
                </div>
                <div>{comment.text}</div>
            </div>;
        });

        return <div className="row">
            <div className="col-md-6">
                <h2>Comments</h2>
                {comments}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            value={this.state.commentText}
                            onChange={this.handleCommentTextChange}
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-default"
                            value="Post"
                            disabled={this.state.disabled} />
                    </div>
                </form>
            </div>
        </div>;
    }
});

module.exports = CommentSection;
