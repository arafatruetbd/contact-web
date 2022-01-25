import React, { useReducer } from 'react';
import { Formik } from 'formik';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import * as Yup from 'yup';
import API from '../api';

const phoneRegExp = /^(?:\+88|88)?(01[3-9]\d{8})$/

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone Required!'),
});


const ContactForm = ({ userData, isFormOpen, setIsFormOpen, getContactData }) => {

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {

    Object.keys(values).forEach((key) => {
      if (!values[key] || values.length < 1) {
        delete values[key];
      }
    });

    try {
      if (userData) {
        await API.updateContact(values, userData.id);
      } else {
        await API.addContactForm(values);
      }
      setIsFormOpen(false);
      getContactData();
      resetForm();
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  return (
    <div>
      <Modal isOpen={isFormOpen} toggle={() => setIsFormOpen(!isFormOpen)} size="lg" centered>
        <ModalHeader>Contact Form</ModalHeader>
        <div className="page-content">
          <Formik
            initialValues={{
              name: userData?.name || '',
              phone: userData?.phone || ''
            }}
            // validationSchema={ContactFormSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <div className="shipping-address mt-0">
                    <div className="row">
                      <div className="col">
                        <div className="form-group same-as">
                          <div className="form-group">
                            <label htmlFor="nameOffice">Name *</label>
                            <input
                              type="text"
                              className={`form-control${touched.name && errors.name ? ' is-invalid' : ''}`}
                              id="nameOffice"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            {errors.name && touched.name ? (
                              <h6 className="text-danger text-capitalize">{errors.name}</h6>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="officePhone">Phone *</label>
                          <input
                            type="text"
                            className={`form-control${touched.phone && errors.phone ? ' is-invalid' : ''}`}
                            id="phone"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                          />
                          {errors.phone && touched.phone ? (
                            <h6 className="text-danger text-capitalize">{errors.phone}</h6>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => setIsFormOpen(!isFormOpen)}>Cancel</Button>
                  <Button style={{ background: '#3DABDE' }} type="submit">Save Changes</Button>{' '}
                </ModalFooter>
              </form>
            )
            }
          </Formik>
        </div>
      </Modal>
    </div >
  )
}

export default ContactForm;