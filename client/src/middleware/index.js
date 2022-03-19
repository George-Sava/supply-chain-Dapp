import {  EventActions } from '@drizzle/store'

import { toast } from 'react-toastify'

 const contractEventNotifier = store => next => action => {
    if (action.type === EventActions.EVENT_FIRED) {
      const contract = action.name
      const contractEvent = action.event.event
      const itemState = action.event.returnValues._itemState ? action.event.returnValues._itemState === '0' ? 'Created': action.event.returnValues._itemState === '1' ? 'Payed' : 'Delivered': undefined
      let display = ''

      if(itemState)
      {
        display = `${contract}(${contractEvent}): ${itemState}`
      }
      else
      {
        display = `${contract}(${contractEvent})`
      }
      
  
      toast.success(display, { position: toast.POSITION.TOP_RIGHT })
    }
    return next(action)
  }

export default contractEventNotifier;

