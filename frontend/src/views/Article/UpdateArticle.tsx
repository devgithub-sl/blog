import { ReactNode } from "react";
import { Article } from "./ReadArticle";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";

// Standalone Imports
import axios from "axios";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import UpdateForm from "../../components/UpdateForm";

const DataTable = ({ onSelect }: { onSelect: (data: Article) => void }) => {
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
                                <Button onClick={() => onSelect(row)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const UpdateArticle = (): ReactNode => {
    const [selectedData, setSelectedData] = useState<Article | null>(null);

    const handleSelect = (data: Article) => {
        setSelectedData(data);
    };

    return (
        <>
            <NavBar />
            <DataTable onSelect={handleSelect} />
            {selectedData && <UpdateForm selectedData={selectedData} />}
            <Footer />
        </>
    );
};

export default UpdateArticle;
