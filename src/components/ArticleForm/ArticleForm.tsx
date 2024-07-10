import React, { FC, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, TextareaAutosize } from '@mui/material';
import { addArticle, editArticle} from "../../redux/articles/articlesThunks";
import { Article } from "../../redux/articles/articlesSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
import { tagOptions } from "../../constants";
import { InputGroup, Form } from "./ArticleForm.styles";

interface ArticleFormProps {
    article?: Article;
}  

const initialFormData: Article = {
    id: 0,
    title: "",
    content: "",
    dateCreated: "",
    tags: [],
};

const ArticleForm:FC<ArticleFormProps> = ({article}) => {

    const [formData, setFormData] = useState<Article>(initialFormData)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleTagsChange = (selectedOptions: { value: string; label: string; }[]) => {
        console.log('Selected Options:', selectedOptions);
        const tags = selectedOptions.map(option => option.value);
        setFormData({
            ...formData,
            tags: tags
        });
    }

    const submitArticle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString( "en-US", { year: 'numeric', month: 'long', day: 'numeric' });
        const newArticle: Article = {
            ...formData,
            dateCreated: currentDate
        };

        if (formData.id === 0) {
            newArticle.id = Date.now();
            dispatch(addArticle(newArticle));
        } else {
            dispatch(editArticle(newArticle));
        }
        setFormData(initialFormData);
        navigate("/");
    }

    useEffect(() => {
        if (article) {
            setFormData(article);
        }
    }, [article]);

    return (
        <Form onSubmit={submitArticle}>
            <InputGroup>
                <label>Title</label>
                <TextField 
                    variant="outlined" 
                    name="title" 
                    onChange={handleInput} 
                    value={formData?.title} />
            </InputGroup>
            <InputGroup>
                <label>Description</label>
                <TextareaAutosize 
                    name="content" 
                    minRows={3} 
                    onChange={handleInput} 
                    value={formData?.content} />
            </InputGroup>
            <InputGroup>
                <label>Tags</label>
                <CreatableSelect
                    isMulti
                    onChange={() => handleTagsChange}
                    options={tagOptions}
                    value={formData.tags.map(tag => ({ value: tag, label: tag }))}
                />
            </InputGroup>
            <Button type="submit" variant="contained">Publish</Button>
        </Form>
    );
}

export default ArticleForm;