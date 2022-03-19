import { styled } from '@mui/material/styles';
import {TextField}  from "@mui/material";

const CustomInput = styled((props) =>( <TextField  {...props} />))({
    '& label.Mui-focused': {
      color: 'white'
    }});

export default CustomInput;