import React, {useEffect} from "react";
import {
    Typography
} from "@mui/material";
import {useSelector} from 'react-redux';

function ItemsCountComponent ({ getItems}) 
{
    const itemCount = useSelector((state) => state.itemManagerSlice.totalQuantity);

    useEffect(() =>
    {
        getItems()
    },[getItems])

    return(
        <>
            <Typography component="h5">
                Items:{itemCount }
            </Typography>
        </>
    )
}

export default ItemsCountComponent;