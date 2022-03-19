import { createSlice } from '@reduxjs/toolkit';

export const itemManagerSlice = createSlice({
    name: 'itemManagerSlice',
    initialState: {
        itemList: [],
        totalQuantity: 0,
        currentItemIndex: 0
    },
    reducers: {
        createItem (state,action) {
            const newItem = action.payload;

            if (newItem.id !== undefined)
            {
                const existingItem = state.itemList.find(item => item.id === newItem.id);

                if(!existingItem)
                {
                return {
                    ...state,
                    itemList: [
                        ...state.itemList,{
                                address: newItem.address,
                                id: newItem.id,
                                itemState: newItem.itemState,
                                priceInWei: newItem.priceInWei
                            } 
                    ]
                    }
                }
            }
            else
            {
                return state;
            }
        },

        initializeItemIndex (state,action) 
        {
            state.currentItemIndex = action.payload;
        },

        // Use Item Index to get all items
        synchItemList (state,action) 
        {
            let items = action.payload;

            if (items.length > 0)
            {
                for( let item in items)
                {
                    const existingItem = state.itemList.find(existingItem => existingItem.id === item.id)

                    if (!existingItem)
                    {
                        return {
                            ...state,
                            itemList:[
                                ...items
                            ],
                            totalQuantity: items.length
                        };
                    }
                    else
                    {
                        return state
                    }
                }
                
            }
            else
            {
                return state;
            }
        },

        
        // Find item by ID
        findItem(state, action) {},

        // Trigger payment
        triggerPayment() {},

        // Trigger delivery
        triggerDelivery() {},
    }
});

export const  {
    createItem, 
    synchItemList, 
    initializeItemIndex, 
    findItem, 
    triggerPayment, 
    triggerDelivery
} = itemManagerSlice.actions;

export default itemManagerSlice;