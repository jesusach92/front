import React, { useRef } from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import { FILES } from "../../const/Const";
import Swal from "sweetalert2";
import { Icon } from "@material-ui/core";

const Catalog = ({ idSupplie }) => {
  const [file, setFile] = useState(null);
  const imageRef = useRef();
  const [flag, setFlag] = useState(false)

  const handleSubmit = async (e) => {
	e.preventDefault();
	const catalog = new FormData();
	catalog.append("supplie", idSupplie);
	catalog.append("catalogo", file);
	try {
	  const { data, status } = await axios.post(`${FILES}/`, catalog, {
		headers: { "Content-Type": "multipart/form-data" },
	  });
	  Swal.fire({title:"Exito",
	  icon:"success",
	  text:data.message,
	timer:2000})
	setFlag(true);
	} catch (error) {
	  alert(error.response);
	  console.log(error.response);
	}
  };

  const deleteFile = (e) => {
	imageRef.current.value = "";
	setFile(null);
  };

  return (
	<Form onSubmit={(e) => handleSubmit(e)} className="mt-5 ">
	  <Form.Group>
		<Form.Control
		disabled={flag}
		  required
		  type="file"
		  ref={imageRef}
		  accept=".pdf,.docx"
		  onChange={(e) => setFile(e.target.files[0])}
		/>

		{file ? (
		  <Row className="mt-3">
			<Col xl={11}>
			  <Form.Label>{file.name}</Form.Label>
			</Col>
			<Col>
			  <Button disabled={flag} onClick={(e) => deleteFile(e)}>
				<DeleteForeverIcon />
			  </Button>
			</Col>
		  </Row>
		) : (
		  <></>
		)}
		<Button disabled={flag} type="submit" className="mt-2">
		  Enviar
		</Button>
	  </Form.Group>
	</Form>
  );
};

export default Catalog;
