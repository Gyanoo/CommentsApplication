import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function CommentsView() {
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            let response = await fetch("http://127.0.0.1:4000/allComments");
            let jsonResponse = await response.json();
            setAllComments(jsonResponse);
        };
        fetchComments();
    }, []);

    return (
        <div className="container" style={{ width: "50vw", minWidth: "300px" }}>
            <h1 className="my-4">Comments</h1>
            <Link to="/create">
                <Button variant="success">Add new comment</Button>
            </Link>
            <div>
                {console.log(allComments)}
                {allComments !== undefined && allComments.length !== 0 ? (
                    allComments.map((comment) => {
                        return (
                            <Card className="mt-4" key={comment.date}>
                                <Card.Body>
                                    <Card.Title>{comment.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {new Date(
                                            comment.date
                                        ).toLocaleDateString() + " at " + comment.date.split("T")[1].split(".")[0]}
                                    </Card.Subtitle>
                                    <Card.Text>{comment.comment}</Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })
                ) : (
                    <div>There are no comments yet!</div>
                )}
            </div>
        </div>
    );
}
