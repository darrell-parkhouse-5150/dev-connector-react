import React, { useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) =>  {
    const [text, setText] = useState('')

    return (
        <div class='post-form'>
            <div className='bg-primary p'>
                <h3>leave a comment</h3>    
            </div>
            <form
                className='form my-1'
                onSubmit={e => {
                    e.preventDefault();
                    addComment(postId, { text });
                    setText('')
                }}
            >
                <textarea
                    name='text'
                    cols='30'
                    rows="5"
                    placeholder='comment on the post'
                    value={text}
                    onChange={e => setText(e.target.value)}
                ></textarea>
                <button className='btn btn-dark my-1'>coment</button>
            </form>        
        </div>
    )
}

CommentForm.propTypes = {
    addComment: propTypes.func.pos
}

export default connect(null, { addComment })(CommentForm)