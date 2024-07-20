import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "../views/Article/ReadArticle";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";

const UpdateForm = ({ selectedData }: { selectedData: Article }): ReactNode => {
    const [name, setName] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [date, setDate] = useState<string>("");
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

    useEffect(() => {
        if (selectedData) {
            setName(selectedData.name);
            setContent(selectedData.content);
            setCategory(selectedData.category);
            setDate(new Date(selectedData.date).toISOString().split("T")[0]);
        }
    }, [selectedData]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!name || !content || !category || !date) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4000/articles/${selectedData._id}`, {
                name,
                content,
                category,
                date
            });
            console.log(response.data);
            setSuccess("Article updated successfully");
            navigate('/read_article');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || 'There was an error updating the article');
            } else {
                setError('There was an error updating the article');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '35ch' },
                width: "40rem"
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
                sx={{ width: "35rem" }}
            />
            <br />
            <TextField
                id="content"
                label="Content"
                multiline
                rows={4}
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                sx={{ width: "35rem" }}
            />
            <br />
            <TextField
                id="category"
                select
                label="Select Category"
                helperText="Please select your category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                sx={{ width: "35rem" }}
            >
                {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <br />
            <TextField
                id="date"
                label="Date"
                type="date"
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                sx={{ width: "35rem" }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <br />
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
    );
};

export default UpdateForm;
