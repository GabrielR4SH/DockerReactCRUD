import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Table,NavbarBrand, Navbar, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';
import logo from './img/logo_red.png';
import axios from "axios";

function App(){

  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(true);
  const toggle = () => setModal(!modal);

  const [incidents, setIncidents] = useState([]); 
  const [modalFields, setModalFields] = useState({}); 

  //Rota do BackEnd
  useEffect(() => {
    axios.get('http://localhost:8000/api/all').then(({ data }) => {
      getIncidents();
    });
  }, []);

  

  //Read
  function getIncidents() {
    axios.get('http://localhost:8000/api/all').then(function (response) {
      console.log('getIncidents', response.data);
      setIncidents(response.data);
    });
  }

  //Create
  function insertItem() {
    console.log('insertItem');
    toggle(true);
    setModalFields({
      id:'',
      title:'',
      type:'',
      description:'',
      criticality:'',
      status:''
    });
  }

  //Edit
  function editItem(id) {
    console.log('editItem', id);
    const item = incidents.find(incident => incident.id === id);
    toggle(true);
    setModalFields(item);
  }

  //Delete
  function deleteItem(id) {
    console.log('deleteItem', id);
    axios.post(`http://localhost:8000/api/delete/${id}`).then(function (response) {
      console.log('deleteItem', 'response', response);

      const updatedListOfIncidents = [].concat(incidents);
      const updatedItemIndex = updatedListOfIncidents.findIndex(incident => incident.id === id);
      updatedListOfIncidents.splice(updatedItemIndex, 1);
      setIncidents(updatedListOfIncidents);
    });
  }

  function saveModal() {
    
    if (modalFields.id) {
      saveModalAsUpdate();
    } else {
      saveModalAsInsert();
    }
  }

  function saveModalAsInsert() {
    axios.post(`http://localhost:8000/api/create`, modalFields).then(function (response) {
      console.log('saveModal', 'response', response);
      toggle(false);

      modalFields.id = response.data.id;

      const newListOfIncidents = [].concat(incidents);
      newListOfIncidents.push(modalFields);
      setIncidents(newListOfIncidents);
    });
  }

  function saveModalAsUpdate() {
    axios.post(`http://localhost:8000/api/update/${modalFields.id}`, modalFields).then(function (response) {
        console.log('saveModal', 'response', response);
        toggle(false);

        const updatedListOfIncidents = [].concat(incidents);
        const updatedItemIndex = updatedListOfIncidents.findIndex(incident => incident.id === modalFields.id);
        updatedListOfIncidents[updatedItemIndex] = modalFields;
        setIncidents(updatedListOfIncidents);
      });
  }

  function onModalChange(fieldName, value) {
    const newValue = {};
    newValue[fieldName] = value;

    const item = Object.assign({}, modalFields, newValue);
    setModalFields(item);
  }

  //
return(
    <div>
      <div>
        <Navbar color="secondary" >
          <NavbarBrand >
            <img src={logo} className="logo" />
          </NavbarBrand>
        </Navbar>
      </div>
      <div className='container'>
        <div className='fundo'>
          <div className='row'>
            <div className='col-12 col-md-3'>
              <button className='btn btn-primary' onClick={() => insertItem()}>Inserir novo incidente</button>
            </div>
          </div>
          <br />
          <Table striped>
        <thead>
            <tr>
                <th>
                    Nº
                </th>
                <th>
                    Titulo
                </th>
                <th>
                    Descrição
                </th>
                <th>
                    Criticidade
                </th>
                <th>
                    Tipo
                </th>
                <th>
                    Status
                </th>
                <th>
                    Ações
                </th>
            </tr>
        </thead>
        <tbody>
            
          {incidents.map((index, key) =>
              <tr key={key} >
                  <td>{index.id}</td>
                  <td>{index.title}</td>
                  <td>{index.description}</td>
                  <td>{index.criticality}</td>
                  <td>{index.type}</td>
                  <td>{index.status}</td>
                  <td>
                    <button className='btn btn-info' id='edit' onClick={() => editItem(index.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg></button>
                    <button className='btn btn-danger' id='delete' onClick={() => deleteItem(index.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg></button>
                    </td>
                </tr>
            )}
        </tbody>

      </Table>
      <Modal
    isOpen={modal}
    toggle={toggle}
    backdrop={backdrop}
    keyboard={keyboard}
    id='create'
  >
  
    <ModalHeader toggle={toggle}>{ modalFields.id ? 'Editar incidente' : 'Inserir novo incidente' }</ModalHeader>
    <ModalBody>
      
    <div className='row'>
        <div className='col-12'>
          <input className='form-control' type='text' placeholder='Titulo' name='title' value={modalFields.title} onChange={(e)=> onModalChange("title", e.target.value)}/>
        </div>
    </div>
          
      <br />

      <div className='row'>
        <div className='col-4'>
        <div className='form-group'>
        <label class="custom-control-label" for="stats">Status:</label>
          <select class="custom-select mr-sm-2" id="stats"className='form-control' name='status' value={modalFields.status} onChange={(e)=> onModalChange("status", e.target.value)}>
            <option value=""></option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        </div>

        <div className='col-4'>
        <div className='form-group'>
        <label class="custom-control-label" for="critc">Criticidade:</label>
          <select class="custom-select mr-sm-2" id="critc" className='form-control' name='criticality' value={modalFields.criticality} onChange={(e)=> onModalChange("criticality", e.target.value)}>
            <option value=""></option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>
        </div>

        <div className='col-4'>
        <div className='form-group'>
        <label class="custom-control-label" for="selectType">Tipo:</label>
          <select class="custom-select mr-sm-2" id= "selectType"className='form-control' name='type' value={modalFields.type} onChange={(e)=> onModalChange("type", e.target.value)}>
            <option value=""></option>
            <option value="Incidente">Incidente</option>
            <option value="Alarme">Alarme</option>
          </select>
          </div>
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-12'>
          <div className='form-group'>
            <label class="custom-control-label" for="areatexto">Descrição:</label>
            <textarea class="form-control rounded-0" id="areatexto" rows="3" name='description' onChange={(e)=> onModalChange("description", e.target.value)}>{modalFields.description}</textarea>
          </div>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={() => saveModal()}>
        Gravar
      </Button>{' '}
    </ModalFooter>
  
  </Modal>
        </div>
      </div>
    </div>
)
}

export default App;


