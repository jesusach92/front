import React from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Catalog = ({ idSupplie }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    alert("Envio");
  };
  const handleFile = (e) => {
    const [FILE] = e.target.files;
    setFile(FILE);
  };
  const deleteFile = (e)=>{
    console.log(e.target);
    setFile("");

  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)} className="mt-5 ">
      <Form.Group>
        <Form.Control
          required
          type="file"
          ref={}
          accept=".pdf,.docx"
          onChange={(e) => handleFile(e)}
        />

        {file ? (
          <Row className="mt-3">
            <Col xl={11}>
              <Form.Label>{file.name}</Form.Label>
            </Col>
            <Col>
              <Button
              onClick={e=>deleteFile(e)}>
                <DeleteForeverIcon></DeleteForeverIcon>
              </Button>
            </Col>
          </Row>
        ) : (
          <></>
        )}

        <Button type="submit" className="mt-2">
          Enviar
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Catalog;
