import React, { useEffect, useState } from "react"
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function CrudTable() {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setmodalType] = useState("")
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const formattedData = res.data.map((user) => ({
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          location: `${user.address.city},${user.address.street}`,

        }));
        setData(formattedData);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleShow = (type, item = null) => {
    setmodalType(type);
    setSelectedItem(item)
    setShowModal(true);
  };

const handleDelete = (id)=>{
 setData(data.filter((item) => item.id !==id));
}

const handleSave = ()=>{
  if (modalType == "edit"){
    setData(
      data.map((d)=> (d.id === selectedItem.id ? selectedItem : d))
    );
  } else if (modalType === "create") {
    setData([...data, {...selectedItem,id:Date.now()}]);
  }
  handleClose();
};

const handleClose =()=>{
  setShowModal(false);
  setSelectedItem(null);
};



  return (
    <div className="container mt-4">
      <h2 className="mb-3">Table View</h2>
      <button className="btn btn-primary mb-3"
        onClick={() => handleShow("create", { name: "", phone: "", email: "", location: "" })}
      >
        Create Crud
      </button>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Location</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item)=> (
            <tr key= {item.id}>
              <td className="text-primary">{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.location}</td>
              <td>
                <button className="btn btn-warning btn-sm"
                onClick={()=>handleShow("view",item)}
              >
                View
              </button>
              </td>
                         <td>
                <button className="btn btn-warning btn-sm"
                onClick={()=>handleShow("edit",{...item})}
              >
                Edit
              </button>
              </td>
                         <td>
                <button className="btn btn-warning btn-sm"
                onClick={()=>handleDelete(item.id)}
              >
              Delete
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "view" && "View Entry"}
            {modalType === "edit" && "Edit Entry"}
            {modalType === "create" && "Create Entry"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "view" && selectedItem && (
            <div>
              <p><strong>Name:</strong> {selectedItem.name}</p>
              <p><strong>Phone:</strong> {selectedItem.phone}</p>
              <p><strong>Email:</strong> {selectedItem.email}</p>
              <p><strong>Location:</strong> {selectedItem.location}</p>
            </div>
          )}
          {(modalType === "edit" || modalType === "create") && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.name || ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.phone || ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, phone: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedItem?.email || ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.location || ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, location: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {(modalType === "edit" || modalType === "create") && (
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )

}