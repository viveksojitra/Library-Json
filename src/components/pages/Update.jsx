/* eslint-disable react-refresh/only-export-components */
// Update Form
import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { bookFetchAsync, bookUpdateAsync } from "../../services/actions/bookAction";

function Update() {
    const { id } = useParams();
    const { book } = useSelector(state => state.bookReducer);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    // Input State
    const [input, setInput] = useState(book || {
        id: '',
        title: '',
        author: '',
        genre: '',
        publicationYear: '',
    });

    // Check Submit
    const [isSubmit, setIsSubmit] = useState(false);

    // Input Handle
    const handleInput = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    // Submit Handle
    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(bookUpdateAsync(input));
        navigateTo('/');

        setIsSubmit(true);

        setInput({
            id: '',
            title: '',
            author: '',
            genre: '',
            publicationYear: '',
        });
    };

    useEffect(() => {
        if (id) {
            dispatch(bookFetchAsync(id));
        }
    }, [id, dispatch]);

    // Set Input State
    useEffect(() => {
        if (book) {
            setInput(book);
        }
    }, [book]);

    // Navigate on submit
    useEffect(() => {
        if (isSubmit) {
            navigateTo('/');
        }
    }, [isSubmit, navigateTo]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Form */}
            <Container className="pt-5">
                <section className="pb-5 position-static" >
                    <Form className='form-wrapper boxshadow' onSubmit={handleSubmit}>
                        <Form.Control className="input" type="text" name='id' value={input.id} onChange={handleInput} hidden />

                        {/* title */}
                        <h1 className="title">Update Book</h1>

                        {/* row-1 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Book Title</Form.Label>
                            <Form.Control className="input capitalise" type="text" name='title' value={input.title} placeholder='Book Title' onChange={handleInput} />
                        </Form.Group>

                        {/* row-2 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Author</Form.Label>
                            <Form.Control className="input capitalise" type="text" name='author' value={input.author} placeholder='Author' onChange={handleInput} />
                        </Form.Group>

                        {/* row-3 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Genre</Form.Label>
                            <Form.Control className="input capitalise" type="text" name='genre' value={input.genre} placeholder='Genre' onChange={handleInput} />
                        </Form.Group>

                        {/* row-4 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Published</Form.Label>
                            <Form.Control className="input" type="number" name='publicationYear' value={input.publicationYear} placeholder='Year of Published' onChange={handleInput} />
                        </Form.Group>

                        {/* submit */}
                        <Button className="btn-submit d-flex mt-4 mx-auto" type="submit">
                            UPDATE
                        </Button>
                    </Form>
                </section>
            </Container>
        </>
    );
}

export default React.memo(Update);
