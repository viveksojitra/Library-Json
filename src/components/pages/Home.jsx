/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

// Data Table
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { bookDeleteAsync, bookFetchAsync, bookGetAsync } from "../../services/actions/bookAction";

function Home() {

    const { books } = useSelector(state => state.bookReducer);

    let key = 0;


    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    // Update Handle
    const handleUpdate = (id) => {

        dispatch(bookFetchAsync(id))
        navigateTo(`/updateBook/${id}`);
    }

    // Delete Handle
    const handleDelete = (id) => {

        dispatch(bookDeleteAsync(id));
    }


    useEffect(() => {
        dispatch(bookGetAsync());
    }, [])

    if (!books) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Table */}
            <div className="table-wrapper boxshadow pt-2">
                <section className="tableFixHead">
                    <Table className="table" striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Published</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td className="capitalise">{row.title}</td>
                                        <td className="capitalise">{row.author}</td>
                                        <td className="capitalise">{row.genre}</td>
                                        <td className="capatalise">{row.publicationYear}</td>
                                        <td className="d-flex justify-content-center flex-nowrap align-content-center align-items-center my-auto gap-2">
                                            {/* Button Update */}
                                            <Button className="btn btn-update" onClick={() => handleUpdate(row.id)}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>

                                            {/* Button - Delete */}
                                            <Button className="btn btn-delete">
                                                <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(row.id)} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </section>
            </div>
        </div>
    )
}

export default React.memo(Home);