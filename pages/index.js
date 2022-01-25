import React, { useEffect, useState } from 'react';
import { Button, Table, Input, Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactForm from '../component/ContactForm';
import API from '../api';


export default function Home() {
  //States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [contactData, setContactData] = useState();
  const [editUserData, setEditUserData] = useState();
  const [searchText, setSearchText] = useState('');

  //Function
  const getContactData = async () => {
    const result = await API.getContactData();
    if (result.data) {
      setContactData(result.data);
    }
  }

  //Hooks
  useEffect(async () => {
    try {
      getContactData();
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(async () => {
    try {
      if (searchText) {
        const searchResult = await API.getContactDataBySearch(searchText);
        if (searchResult.data) {
          setContactData(searchResult.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchText])


  //Function
  const handleContactForm = () => {
    setIsFormOpen(!isFormOpen);
  }

  const handleContactDelete = async (id) => {
    try {
      console.log(id);
      await API.deleteContact(id);
      getContactData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditContact = (user) => {
    setEditUserData(user);
    setIsFormOpen(true);
  }

  const handleAddContact = () => {
    setIsFormOpen(true);
    setEditUserData();
  }

  //JSX
  return (
    <div className="container">
      <h1 className="text-center m-3">Contact Book</h1>
      <div className="m-3">
        <Button color="primary" onClick={() => handleAddContact()}>Add New Contact</Button>
      </div>
      <Card body>
        <div>
          <Input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>
                  #
              </th>
                <th>
                  First Name
              </th>
                <th>
                  Phone Number
              </th>
                <th>
                  Edit
              </th>
                <th>
                  Delete
              </th>
              </tr>
            </thead>
            <tbody>
              {contactData?.map((user, index) => {
                return (
                  <>
                    <tr key={user.id}>
                      <th scope="row">
                        {index + 1}
                      </th>
                      <td>
                        {user.name}
                      </td>
                      <td>
                        {user.phone}
                      </td>
                      <td>
                        <Button onClick={() => handleEditContact(user)}>Edit</Button>
                      </td>
                      <td>
                        <Button color="danger" onClick={() => handleContactDelete(user.id)}>Delete</Button>
                      </td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </Table>
        </div>
      </Card>
      {isFormOpen &&
        <ContactForm
          setIsFormOpen={setIsFormOpen}
          isFormOpen={isFormOpen}
          getContactData={getContactData}
          userData={editUserData}
        />
      }
    </div>
  )
}
