import moment from 'moment';
import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Message = forwardRef(({ message }, ref) => {
  // redux
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isUser = user?.uid === message.senderUid;

  const photoURL = message?.photoURL;
  return (
    <div className={'d-flex ' + (isUser ? 'justify-content-start' : 'justify-content-end')}>
      <div ref={ref} className={'p-2 text-white m-2 ' + (isUser ? 'message__isUser bg-primary shadow-sm' : 'message__isNotUser bg-secondary shadow-sm')}>{message?.message}
        <div className='message__time'>
          {moment(message?.timestamp?.seconds * 1000).format('MMMM Do YYYY, h:mm a')}
        </div>
      </div>
      {isUser ? null :
        <img className='message__senderImage me-1 mt-4 mt-md-3' src={photoURL} alt={message?.senderName + " photo"} />
      }
    </div>

  )
})

export default Message