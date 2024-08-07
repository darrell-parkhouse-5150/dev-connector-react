import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../actions/post';

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

CommentItem.propTypes = {
    postId: propTypes.string.isRequired,
    comment: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    deleteComment: propTypes.func.isRequired
}

const mapStateToProps = (state) => {
    auth: state.auth
}

export default connect(mapStateToProps, { deleteComment })(CommentItem);