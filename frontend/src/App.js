import Menu from './containers/Menu/Menu';
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getResultData, postDataA } from './redux/usedTime/actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const initvalues = {
    userNameA: '',
    heightA: ''
  };
  const notifyS = () => toast.success('Success');

  const redirect = (isSuccess) => {
    isSuccess && notifyS() && dispatch(getResultData());
  };
  const { result, isLoadingResult, isErrorResult, isLoading, isError, key } = useSelector(
    (state) => state.usedTime
  );
  const formik = useFormik({
    initialValues: initvalues,
    onSubmit: (values) => {
      const newProfileData = {
        userName: values.userNameA,
        height: values.heightA
      };
      dispatch(postDataA(newProfileData, redirect));
    }
  });

  console.log('result', result);
  return (
    <>
      <ToastContainer />
      <div className="header">
        <Menu />
      </div>
      <div className="section">
        <form onSubmit={formik.handleSubmit}>
          <div className="userNameA">
            <h5>userName</h5>
            <input
              value={formik.values.userNameA}
              onChange={formik.handleChange}
              name="userNameA"
              placeholder="userNameA"
            />
          </div>
          <div className="userNameA">
            <h5>Height</h5>
            <input
              value={formik.values.heightA}
              onChange={formik.handleChange}
              name="heightA"
              placeholder="heightA"
            />
          </div>
          <Button variant="success" className="modal-buton-ok" data-testid="btnOK" type="submit">
            OK
          </Button>
        </form>

        {!isLoadingResult && !isErrorResult && !isLoading && !isError && key && (
          <div>
            <div>{result?.userName}</div>
            <div>{result?.weight}</div>
            <div>{result?.height}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
