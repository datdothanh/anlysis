import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postData, putData } from '../../redux/class/actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalTableClass = ({ show, setShow, typeModal, positonEdit, classData, setTypeModal }) => {
  const initvalues = {
    classNameI: ''
  };
  const [initData, setInitData] = useState(initvalues);
  const notifyS = () => toast.success('Success');
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeModal === 'Edit') {
      const data = classData[positonEdit];
      setInitData({
        classNameI: data.classNameI
      });
    }
  }, [positonEdit, classData, typeModal]);

  const onHide = () => {
    setTypeModal('');
    setInitData(initvalues);
    setShow(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initData,
    validationSchema: Yup.object({
      classNameI: Yup.string()
        .required('Required!')
        .min(1, 'Mininum 1 characters')
        .max(255, 'Maximum 255 characters')
    }),
    onSubmit: (values) => {
      const newProfileData = {
        className: values.classNameI
      };
      if (typeModal === 'Add') {
        dispatch(postData(newProfileData));
        values.classNameI = '';
      }
      if (typeModal === 'Edit') {
        const _id = classData[positonEdit]._id;
        const newProfileDataE = { ...newProfileData, _id };
        dispatch(putData([newProfileDataE, positonEdit]));
      }
      onHide();
      notifyS();
    }
  });

  return (
    <div className="modalShowTable">
      <ToastContainer />
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="modal-custom-table"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header>
          <Modal.Title>{typeModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-contain">
              <div className="modal-item">
                <div className="modal-text-title">Class Name</div>
                <input
                  className={
                    formik.errors.classNameI && formik.touched.classNameI
                      ? 'modal-text-input error-input'
                      : 'modal-text-input'
                  }
                  value={formik.values.classNameI}
                  onChange={formik.handleChange}
                  placeholder="CLass Name"
                  data-testid="classNameI"
                  name="classNameI"
                />
                {formik.touched.classNameI && formik.errors.classNameI && (
                  <p>{formik.errors.classNameI}</p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end modal-buton">
              <Button variant="secondary" data-testid="btnCancel" onClick={onHide}>
                Cancel
              </Button>
              <Button
                variant="success"
                className="modal-buton-ok"
                data-testid="btnOK"
                type="submit">
                OK
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalTableClass;
