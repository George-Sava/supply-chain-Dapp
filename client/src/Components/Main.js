import React, {useCallback, useEffect, useState} from "react";
import {
    Container,
} from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import {synchItemList, setIsOwner, initializeItemIndex} from '../redux-slicers/itemManagerSlice';
import OwnerComponent from './OwnerComponent';
import GuestComponent from './GuestComponent';
import  {ToastContainer}  from 'react-toastify';

const Main = ({ drizzle, drizzleState }) =>
{
    const itemIndex = useSelector((state) => state.itemManagerSlice.currentItemIndex);
    const isOwner = useSelector((state) => state.itemManagerSlice.isOwner);
    const itemManagerContract = drizzle.contracts.ItemManager;
    const [balance, setBalance] = useState('0');
    const dispatch = useDispatch();
    
    const getItemIndexKey = useCallback(async () =>
    {
        await itemManagerContract.methods.itemIndex().call()
            .then((res) =>{
                    let index = parseInt(res)
                    dispatch(initializeItemIndex(index))
            });
    },[drizzleState]);

    const getAcountBalance = async() =>
    {
        if(drizzleState)
        {    
            let acBalance = await drizzle.web3.eth.getBalance(drizzleState.accounts[0])
            setBalance(acBalance)
        }
    }

    const getItems = useCallback(async () => 
    {
        let auxArr = [];

        for(let i = 0; i < itemIndex; i++)
        {
            await itemManagerContract.methods.items(i).call()
            .then((res)=>
            {   

                auxArr.push({
                    index: i,
                    address: res._item,
                    id: res._itemID,
                    priceInWei: res._itemPrice,
                    itemState: res._itemState
                })
            })
        }

        dispatch(synchItemList(auxArr));
    },[itemIndex])

    const checkOwner =async () => 
    {
        itemManagerContract.methods.isOwner().call()
            .then((res) =>{
                dispatch(setIsOwner(res))
            })
    }

    useEffect(() =>
    {
        checkOwner();
        getItemIndexKey()
        getAcountBalance();
    },[isOwner])

    return(
        <Container fluid="true" maxWidth="100%">
            <ToastContainer />
            {isOwner?<OwnerComponent drizzle={drizzle} drizzleState={drizzleState} getItems={getItems} balance={balance}/>: <GuestComponent drizzle={drizzle} drizzleState={drizzleState} getItems={getItems} balance={balance} getAcountBalance={getAcountBalance}/>}
        </Container>
    );
}

export default Main;