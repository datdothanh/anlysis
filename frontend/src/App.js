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
  const { result, key } = useSelector((state) => state.usedTime);
  const formik = useFormik({
    initialValues: initvalues,
    onSubmit: (values) => {
      console.log('values', values);
      dispatch(postDataA(redirect));
    }
  });
  var num = result?.w_1 * formik.values.heightA + result?.w_0;
  num = num.toFixed(1);
  return (
    <>
      <ToastContainer />
      <div className="header">
        <Menu />
      </div>
      <div className="section">
        <form onSubmit={formik.handleSubmit}>
          <div className="userNameA">
            <h5>Username</h5>
            <input
              value={formik.values.userNameA}
              onChange={formik.handleChange}
              name="userNameA"
              placeholder="Name"
            />
          </div>
          <div className="userNameA">
            <h5>Height</h5>
            <input
              value={formik.values.heightA}
              onChange={formik.handleChange}
              name="heightA"
              placeholder="Height"
            />
          </div>
          {key && (
            <div>
              Cân nặng dự đoán là: <span>{num}</span>
            </div>
          )}
          <Button variant="success" className="modal-buton-ok" data-testid="btnOK" type="submit">
            OK
          </Button>
        </form>
      </div>
    </>
  );
}

export default App;
