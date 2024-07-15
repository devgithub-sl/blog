import { ReactNode } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


const ArticleForm = (): ReactNode => {
    const catergories = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
    ];
    
    // each time we create the form we put the date with it also
    return (
        <>  
            <h1>Create New Article</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >   
                <TextField id="outlined-basic" label="Name" variant="outlined" />
                <br/>
                <TextField
                        id="outlined-multiline-static"
                        label="Content"
                        multiline
                        rows={4}
                    />
                    <br/>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Catergory"
                    helperText="Please select your catergory"
                    >
                    {catergories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br/>
                <Button 
                    variant="outlined"
                    component={Link}
                    to="/articles"
                    style={{ padding: '0 10px' ,margin: '20px', fontSize: '1.5rem' }}
                    >
                    Submit
                </Button>
            </Box>
        </>
    );
};

export default ArticleForm;