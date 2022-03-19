import React, {useEffect} from "react";

import {
    Typography,
    Grid
} from "@mui/material";

function ItemListComponent({itemList, getItems})
{
    useEffect(() =>
    {
        getItems();
    },[])
    
    if(itemList !== [])
    {
        return (
            <>
            <Grid container sx={{
                border: '1px solid white',
                borderRadius: '5px',
                padding: '4px',
                marginTop: '10px',
                color: 'black',
                backgroundColor: "#c8effa"
                }} >
            {
                itemList && itemList.map((item, i, itemList) =>
                {

                    return (        
                        <Grid container key={item.id} sx={{
                            borderBottom: '1px solid gray',
                        }} > 
                            <Grid item xs={6} key={item.id}>
                                <Typography variant="body1" gutterBottom>
                                    Address: {item.address}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body1" gutterBottom>
                                    Item ID: {item.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body1" gutterBottom>
                                    Price: {item.priceInWei}
                                </Typography>
                            </Grid>
    
                                <Grid item xs={2} >
                                    <Typography variant="body1" gutterBottom>
                                        State: {item.itemState === '0'? 'Created': item.itemState === '1'? 'Payed': 'Delivered'}

                                    </Typography>
                                </Grid> 

                                
                        </Grid>
                    )
                })
            }
            </Grid>
            </>
        )
    }
    else
    {
        return <div>No items!</div>
    }
}


export default ItemListComponent;