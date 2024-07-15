import { FormEvent, ReactNode, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ArticleForm = (): ReactNode => {
    const [name, setName] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const categories = [
        { value: 'tech', label: 'Computer Science' },
        { value: 'bio', label: 'Biological Science' },
        { value: 'medicine', label: 'Medical Science' },
        { value: 'politics', label: 'Political Science' },
    ];

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!name || !content || !category) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/articles", {
                name,
                content,
                category
            });
            console.log(response.data);
            setSuccess("Article created successfully");
            navigate('/articles');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || 'There was an error creating the article');
            } else {
                setError('There was an error creating the article');
            }
        } finally {
            setLoading(false);
        }
    };

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
                onSubmit={handleSubmit}
            >   
                <TextField 
                    id="name"
                    label="Name" 
                    variant="outlined" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br/>
                <TextField
                    id="content"
                    label="Content"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <br/>
                <TextField
                    id="category"
                    select
                    label="Select Category"
                    helperText="Please select your category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br/>
                <Button 
                    variant="outlined"
                    type="submit"
                    style={{ padding: '0 10px', margin: '20px', fontSize: '1.5rem' }}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </Box>
        </>
    );
};

export default ArticleForm;
