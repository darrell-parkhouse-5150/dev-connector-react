import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../actions/post';

/**
 * Functional component for rendering a single comment item.
 * 
 * @param {string} postId - The ID of the post the comment belongs to.
 * @param {object} comment - The comment object containing _id, text, name, avatar, user, and date.
 * @param {object} auth - The authentication object.
 * @param {function} deleteComment - Function to delete a comment.
 * @returns {JSX.Element} JSX element representing the comment item.
 */
const CommentItem = ({
    postId,
    coment: { _id, text, anme, avatar, user, date },
    auth,
    deleteComment
})  => (
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img className='round-img' src={avatar} alt='' />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p className='my-1'>{text}</p>
            <p className='post-date'>posted on { formatDate(date)}</p>
            {
                !auth.loading && user === auth.user._id && (
                    <button
                        onClick={() => deleteComment(postId, _id)}
                        type='button'
                        className='btn btn-danger'
                    >
                        <i className='fas fa-times' />
                    </button>
                )
            }
        </div>
    </div>
)

/**
 * Defines the prop types for the CommentItem component.
 * 
 * @param {string} postId - The ID of the post associated with the comment.
 * @param {object} comment - The comment object containing _id, text, name, avatar, user, and date.
 * @param {object} auth - The authentication object.
 * @param {function} deleteComment - The function to delete a comment.
 */

CommentItem.propTypes = {
    postId: propTypes.string.isRequired,
    comment: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    deleteComment: propTypes.func.isRequired
}

/**
 * Maps the 'auth' state from the Redux store to the 'auth' prop.
 * 
 * @param {Object} state - The Redux store state object.
 * @returns {Object} An object containing the 'auth' state.
 */
const mapStateToProps = (state) => {
    auth: state.auth
}

export default connect(mapStateToProps, { deleteComment })(CommentItem);