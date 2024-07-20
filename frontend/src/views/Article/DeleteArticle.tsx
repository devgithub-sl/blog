import { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Article } from "./ReadArticle";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

// Standalone imports
import axios from "axios";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const DataTable = ({ onDelete }: { onDelete: (id: string) => void }) => {
    const [data, setData] = useState<Article[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/articles");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: Article) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.content}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Button onClick={() => onDelete(row._id)} color="secondary">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const DeleteArticle = (): ReactNode => {
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:4000/articles/${id}`);
            alert("Article deleted successfully");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting article", error);
            alert("There was an error deleting the article");
        }
    };

    return (
        <>
            <NavBar />
            <DataTable onDelete={handleDelete} />
            <Footer />
        </>
    );
};

export default DeleteArticle;
