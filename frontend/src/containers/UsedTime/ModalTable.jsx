import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postData, putData } from '../../redux/usedTime/actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalTable = ({
  show,
  setShow,
  typeModal,
  positonEdit,
  usedTimeData,
  setTypeModal,
  classData
}) => {
  const initvalues = {
    userNameI: '',
    heightI: '',
    weightI: '',
    idClassI: '62f2aaba1630b1ec7b0f595e'
  };
  const [initData, setInitData] = useState(initvalues);
  const notifyS = () => toast.success('Success');
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeModal === 'Edit') {
      const data = usedTimeData[positonEdit];
      setInitData({
        userNameI: data.userName,
        heightI: data.height,
        weightI: data.weight,
        idClassI: data.class[0]?._id
      });
    }
  }, [positonEdit, usedTimeData, typeModal]);

  const onHide = () => {
    setTypeModal('');
    setInitData(initvalues);
    setShow(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initData,
    validationSchema: Yup.object({
      userNameI: Yup.string()
        .required('Required!')
        .min(1, 'Mininum 1 characters')
        .max(255, 'Maximum 255 characters'),
      heightI: Yup.number().required('Required!'),
      weightI: Yup.number().required('Required')
    }),
    onSubmit: (values) => {
      const newProfileData = {
        userName: values.userNameI,
        height: values.heightI,
        weight: values.weightI,
        idClass: values.idClassI
      };

      if (typeModal === 'Add') {
        dispatch(postData(newProfileData));
        values.userNameI = '';
        values.heightI = '';
        values.weightI = '';
        values.idClassI = '';
      }
      if (typeModal === 'Edit') {
        const _id = usedTimeData[positonEdit]._id;
        const newProfileDataE = { ...newProfileData, _id };
        dispatch(putData([newProfileDataE, positonEdit]));
      }
      onHide();
      notifyS();
      window.location.reload();
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
                <div className="modal-text-title">User Name</div>
                <input
                  className={
                    formik.errors.userNameI && formik.touched.userNameI
                      ? 'modal-text-input error-input'
                      : 'modal-text-input'
                  }
                  value={formik.values.userNameI}
                  onChange={formik.handleChange}
                  placeholder="UserName"
                  data-testid="UserNameI"
                  name="userNameI"
                />
                {formik.touched.userNameI && formik.errors.userNameI && (
                  <p>{formik.errors.userNameI}</p>
                )}
              </div>
              <div className="modal-item">
                <div className="modal-text-title">Id Class</div>
                <select
                  value={formik.values.idClassI}
                  onChange={formik.handleChange}
                  name="idClassI">
                  <option>Please select</option>
                  {classData?.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.className}
                    </option>
                  ))}
                </select>
                {/* <input
                  value={formik.values.idClassI}
                  onChange={formik.handleChange}
                  name="idClassI"
                /> */}
              </div>
            </div>
            <div className="modal-contain">
              <div className="modal-item">
                <div className="modal-text-title">Height</div>
                <input
                  className={
                    formik.errors.heightI && formik.touched.heightI
                      ? 'modal-text-input error-input'
                      : 'modal-text-input'
                  }
                  value={formik.values.heightI}
                  onChange={formik.handleChange}
                  placeholder="0"
                  data-testid="YouTubeI"
                  name="heightI"
                />
                {formik.touched.heightI && formik.errors.heightI && <p>{formik.errors.heightI}</p>}
              </div>
              <div className="modal-item">
                <div className="modal-text-title">Weight</div>
                <input
                  className={
                    formik.errors.weightI && formik.touched.weightI
                      ? 'modal-text-input error-input'
                      : 'modal-text-input'
                  }
                  value={formik.values.weightI}
                  onChange={formik.handleChange}
                  placeholder="0"
                  data-testid="YouTubeI"
                  name="weightI"
                />
                {formik.touched.weightI && formik.errors.weightI && <p>{formik.errors.weightI}</p>}
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

export default ModalTable;
